import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import { Button, Modal } from "react-bootstrap";
import firebase from "firebase/app";
import "firebase/auth";
import "../index.css"
// eslint-disable-next-line
import config from "./../config";

class CaptianForm extends Form {
  state = {
    isSubstitute : false,
    data: {
      name: "",
      cnicNo: "",
      phone: "",
      alternatePhone: "",
      cnicFront: "",
      cnicBack: "",
      dlFront: "",
      dlBack: "",
      profilePicture: "",
      email: "",
      vendorEmail: "",
      password: ""
    },

    errors: {},
    errorMessage: "",
    submitted: false,
    loading: false
  };

  setRef1 = ref => {
    this.file = ref;
  };

  setRef2 = ref => {
    this.file2 = ref;
  };

  setRef3 = ref => {
    this.file3 = ref;
  };

  setRef4 = ref => {
    this.file4 = ref;
  };

  setRef5 = ref => {
    this.file5 = ref;
  };

  schema = {
    name: Joi.string()
      .regex(/^[A-Za-z ]+$/)
      .required()
      .label("Name"),
    cnicNo: Joi.string()
      .regex(/^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/)
      .required()
      .label("CNIC No"),
    phone: Joi.string()
      .regex(/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/)
      .required()
      .label("Phone No"),
    alternatePhone: Joi.string()
      .regex(/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/)
      .label("Alternate Phone No"),
    cnicFront: Joi.required().label("CNIC Front Snapshot"),
    cnicBack: Joi.required().label("CNIC Back Snapshot"),
    dlFront: Joi.required().label("DL Front Snapshot"),
    dlBack: Joi.required().label("DL Back Snapshot"),
    profilePicture: Joi.required().label("Profile Picture"),
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: Joi.string()
      .alphanum()
      .required()
      .label("Password"),
    vendorEmail: Joi.string()
      .email()
      .required()
      .label("Vendor Email")
  };

  forsubstituteField = (e) =>{
    e.preventDefault();
    this.setState({
      isSubstitute : !this.state.isSubstitute
    })

  }

  doSubmit = async () => {
    //server logic
    this.setState({ errorMessage: "" });
    let vendorID = "";

    const vendors = await firebase.database().ref("Driver2/Vendor").orderByChild("email")
      .equalTo(this.state.data.vendorEmail)
      .once("value");

    vendors.forEach(vendor => {
      vendorID = vendor.ref.path.pieces_[2];
    });


    if (!vendorID) {
      this.setState({ errorMessage: "Vendor doesn't exist.", loading: false });
      //console.log("Vendor doesn't exist");
      return;
    }

    await firebase
      .auth()
      .createUserWithEmailAndPassword(
        this.state.data.email,
        this.state.data.password
      )
      .catch(err => {
        this.setState({ errorMessage: err.message, loading: false });
        return;
      });

    const storageRef = firebase.storage().ref();
    let files = [];
    files.push(this.file.files[0]);
    files.push(this.file2.files[0]);
    files.push(this.file3.files[0]);
    files.push(this.file4.files[0]);
    files.push(this.file5.files[0]);

    let images = [];
    images.push(storageRef.child(this.file.files[0].name));
    images.push(storageRef.child(this.file2.files[0].name));
    images.push(storageRef.child(this.file3.files[0].name));
    images.push(storageRef.child(this.file4.files[0].name));
    images.push(storageRef.child(this.file5.files[0].name));

    this.setState({ loading: true });
    //let data = {...this.state.data};
    const imgs = {
      cnicFront: "",
      cnicBack: "",
      dlFront: "",
      dlBack: "",
      profilePicture: ""
    };
    await images[0]
      .put(files[0])
      .then(snapshot => {
        images[0].getDownloadURL().then(url => {
          imgs.cnicFront = url;
        });
      })
      .catch(err => {
        this.setState({ errorMessage: err.serverResponse.message, loading: false });
      });

    await images[1]
      .put(files[1])
      .then(snapshot => {
        images[1].getDownloadURL().then(url => {
          imgs.cnicBack = url;
        });
      })
      .catch(err => {
        this.setState({ errorMessage: err.serverResponse.message, loading: false });
      });

    await images[2]
      .put(files[2])
      .then(snapshot => {
        images[2].getDownloadURL().then(url => {
          imgs.dlFront = url;
        });
      })
      .catch(err => {
        this.setState({ errorMessage: err.serverResponse.message, loading: false });
      });

    await images[3]
      .put(files[3])
      .then(snapshot => {
        images[3].getDownloadURL().then(url => {
          imgs.dlBack = url;
        });
      })
      .catch(err => {
        this.setState({ errorMessage: err.serverResponse.message, loading: false });
      });

    images[4]
      .put(files[4])
      .then(snapshot => {
        images[4].getDownloadURL().then(url => {
          imgs.profilePicture = url;
          console.log("HERE");
          if (this.state.errorMessage === "") {
            const captianid = firebase.auth().currentUser.uid;
            this.props.saveCaptian(this.state.data, imgs, captianid, vendorID,this.state.isSubstitute);
            this.setState({
              data: {
                name: "",
                cnicNo: "",
                phone: "",
                alternatePhone: "",
                cnicFront: "",
                cnicBack: "",
                dlFront: "",
                dlBack: "",
                profilePicture: "",
                email: "",
                vendorEmail: "",
                password: ""
              },
              submitted: true,
              errorMessage: "",
              loading: false
            });
          }
        });
      })
      .catch(err => {
        this.setState({ errorMessage: err.serverResponse.message, loading: false });
      });
  };

  selectModalBody = () => {
    const { data, errors } = this.state;

    if (!this.state.loading) {
      return (
        <div>
          {this.state.errorMessage && (
            <div className="alert alert-warning" role="alert">
              <h4> {this.state.errorMessage} </h4>
            </div>
          )}

          {this.state.submitted && (
            <div className="alert alert-info" role="alert">
              <h4> Captain Submitted Successfully! </h4>
            </div>
          )}
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="input-group pb-3">
              <div className="col-6">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name as per CNIC"
                  value={data.name}
                  onChange={this.handleChange}
                  className="form-control"
                />
                {errors.name && (
                  <div className="alert alert-danger">
                    Name cannot contain numbers or special characters.
            </div>
                )}
              </div>

              <div className="col-6">
                <label htmlFor="phone">Phone No:</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="+921111111111"
                  value={data.phone}
                  onChange={this.handleChange}
                  className="form-control"
                />
                {errors.phone && (
                  <div className="alert alert-danger">
                    This should be a valid phone no.
            </div>
                )}
              </div>
            </div>

            <div className="input-group pb-3">
              <div className="col-6">
                <label htmlFor="alternatePhone">Alternate Phone No:</label>
                <input
                  type="text"
                  name="alternatePhone"
                  id="alternatePhone"
                  placeholder="+921111111111"
                  value={data.alternatePhone}
                  onChange={this.handleChange}
                  className="form-control"
                />
                {errors.alternatePhone && (
                  <div className="alert alert-danger">
                    Phone No must be a valid number.{" "}
                  </div>
                )}
              </div>

              <div className="col-6">
                <label htmlFor="cnicNo">CNIC No:</label>
                <input
                  type="text"
                  name="cnicNo"
                  id="cnicNo"
                  placeholder="11111-1111111-1"
                  value={data.cnicNo}
                  onChange={this.handleChange}
                  className="form-control"
                />
                {errors.cnicNo && (
                  <div className="alert alert-danger">
                    This should be a valid CNIC No.
            </div>
                )}
              </div>
            </div>

            <div className="input-group pb-3">
              <div className="col-6">
                <label htmlFor="cnicFront">CNIC Front Snapshot:</label>
                <input
                  type="file"
                  required
                  name="cnicFront"
                  id="cnicFront"
                  placeholder="CNIC front snapshot"
                  value={data.cnicFront}
                  onChange={this.handleChange}
                  ref={this.setRef1}
                  className="form-control fileInputs"
                />
                {errors.cnicFront && (
                  <div className="alert alert-danger">{errors.cnicFront}</div>
                )}
              </div>

              <div className="col-6">
                <label htmlFor="cnicBack">CNIC Back Snapshot:</label>
                <input
                  type="file"
                  required
                  name="cnicBack"
                  id="cnicBack"
                  placeholder=""
                  value={data.cnicBack}
                  onChange={this.handleChange}
                  ref={this.setRef2}
                  className="form-control fileInputs"
                />
                {errors.cnicBack && (
                  <div className="alert alert-danger">{errors.cnicBack}</div>
                )}
              </div>
            </div>

            <div className="input-group pb-3">
              <div className="col-6">
                <label htmlFor="dlFront">DL Front Snapshot:</label>
                <input
                  type="file"
                  required
                  name="dlFront"
                  id="dlFront"
                  placeholder="DL front snapshot"
                  value={data.dlFront}
                  onChange={this.handleChange}
                  ref={this.setRef3}
                  className="form-control fileInputs"
                />
                {errors.dlFront && (
                  <div className="alert alert-danger">{errors.dlFront}</div>
                )}
              </div>

              <div className="col-6">
                <label htmlFor="dlBack">DL Back Snapshot:</label>
                <input
                  type="file"
                  name="dlBack"
                  id="dlBack"
                  required
                  placeholder=""
                  value={data.dlBack}
                  onChange={this.handleChange}
                  ref={this.setRef4}
                  className="form-control fileInputs"
                />
                {errors.dlBack && (
                  <div className="alert alert-danger">{errors.dlBack}</div>
                )}
              </div>
            </div>

            <div className="input-group pb-3">
              <div className="col-6">
                <label htmlFor="profilePicture">Profile Picture</label>
                <input
                  type="file"
                  required
                  name="profilePicture"
                  id="profilePicture"
                  placeholder="Profile Picture"
                  value={data.profilePicture}
                  onChange={this.handleChange}
                  ref={this.setRef5}
                  className="form-control fileInputs"
                />
                {errors.profilePicture && (
                  <div className="alert alert-danger">
                    {errors.profilePicture}
                  </div>
                )}
              </div>

              <div className="col-6">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                  value={data.email}
                  onChange={this.handleChange}
                  className="form-control"
                />
                {errors.email && (
                  <div className="alert alert-danger">{errors.email}</div>
                )}
              </div>
            </div>

            <div className="input-group pb-3">
              <div className="col-6">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={this.handleChange}
                  className="form-control"
                />
                {errors.password && (
                  <div className="alert alert-danger">{errors.password}</div>
                )}
              </div>

              <div className="col-6">
                <label htmlFor="vendorEmail">Vendor Email:</label>
                
                <input
                  type="text"
                  name="vendorEmail"
                  id="vendorEmail"
                  placeholder="name@company.com"
                  value={data.vendorEmail}
                  onChange={this.handleChange}
                  className="form-control"
                />
                {errors.vendorEmail && (
                  <div className="alert alert-danger">{errors.vendorEmail}</div>
                )}
                <input type="checkbox" id="substitute" onChange={(e) => this.forsubstituteField(e)} />  Substitute Field
              </div>
                
              <div className="input-group pb-3">
                <div className="col-6 pt-4">
                  {this.renderButton("Register Captian")}
                </div>
              </div>
            </div>
          </form>
        </div>);
    } else {
      return (
        <div className="text-center">
          <div className="spinner-border">
            <span className="sr-only">Loading...</span>
          </div>
        </div>)
    }
  }

  render() {
    const { captianBtn, onClickCaptian } = this.props;

    return (
      <Modal show={captianBtn} onHide={onClickCaptian}>
        <Modal.Header closeButton>
          <Modal.Title>Captain Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.selectModalBody()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClickCaptian}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CaptianForm;
