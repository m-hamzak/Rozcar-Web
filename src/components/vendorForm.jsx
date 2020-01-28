import React from "react";
import Joi from "joi-browser";
import Form from "./form";
// eslint-disable-next-line
import firebase from "firebase/app";
import "firebase/storage";
import "../index.css";
// eslint-disable-next-line
import config from "./../config";

class VendorForm extends Form {
  state = {
    data: {
      name: "",
      phone: "",
      alternatePhone: "",
      cnicNo: "",
      cnicFront: "",
      cnicBack: "",
      iban: "",
      email: "",
      password: ""
    },

    errors: {},
    errorMessage: "",
    submitted: false,
    loading: false
  };

  vendor = {};

  //reference for the first file
  setRef1 = ref => {
    this.file = ref;
  };

  //reference for the second file
  setRef2 = ref => {
    this.file2 = ref;
  };

  //Schema for validation through joi-browser 
  schema = {
    name: Joi.string().regex(/^[A-Za-z ]+$/),
    phone: Joi.string()
      .regex(/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/)
      .required()
      .label("Phone No"),
    alternatePhone: Joi.string()
      .regex(/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/)
      .label("Alternate Phone"),
    cnicNo: Joi.string()
      .regex(/^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/)
      .required()
      .label("CNIC No"),
    cnicFront: Joi.required().label("CNIC Front Snapshot"),
    cnicBack: Joi.required().label("CNIC Back Snapshot"),
    iban: Joi.string()
      .regex(
        /^([A-Z]{2}[ -]?[0-9]{2})(?=(?:[ -]?[A-Z0-9]){9,30}$)((?:[ -]?[A-Z0-9]{3,5}){2,7})([ -]?[A-Z0-9]{1,3})?$/
      )
      .required()
      .label("IBAN No"),
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: Joi.string()
      .alphanum()
      .required()
      .label("Password")
  };

  //Called after the handleSubmit function in the Form component
  doSubmit = async () => {
    this.setState({ errorMessage: "" });
    //creating user's account
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
    const file = this.file.files[0];
    const file2 = this.file2.files[0];
    const image1 = storageRef.child(this.file.files[0].name);
    const image2 = storageRef.child(this.file2.files[0].name);
    let front = "";
    let back = "";
    this.setState({ loading: true });
    //store images in firebase storage bucket
    await image1
      .put(file)
      .then(snapshot => {
        image1.getDownloadURL().then(url => {
          front = url;
        });
      })
      .catch(err => {
        this.setState({ errorMessage: err.serverResponse.message, loading: false });
      });

    image2
      .put(file2)
      .then(snapshot => {
        image2.getDownloadURL().then(url => {
          back = url;
          if (this.state.errorMessage === "") {
            const vendorId = firebase.auth().currentUser.uid;
            this.props.saveVendor(this.state.data, front, back, vendorId);
            this.setState({
              data: {
                name: "",
                phone: "",
                alternatePhone: "",
                cnicNo: "",
                cnicFront: "",
                cnicBack: "",
                iban: "",
                email: "",
                password: ""
              },
              submitted: true,
              errorMessage: "",
              loading: false
            });
            console.log("submitted vendor");
          }
        });
      })
      .catch(err => {
        this.setState({ errorMessage: err.serverResponse.message, loading: false });
      });
  };

  selectDisplay = () => {
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
              <h4> Vendor Submitted Successfully! </h4>
            </div>
          )}

          <h1>Vendor Registration</h1>
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
                    Name cannot have numbers or special characters.
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
                    Phone No must be a valid number.{" "}
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
                  name="cnicFront"
                  id="cnicFront"
                  required
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
                  name="cnicBack"
                  id="cnicBack"
                  placeholder=""
                  required
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
                <label htmlFor="iban">IBAN No:</label>
                <input
                  type="text"
                  name="iban"
                  id="iban"
                  placeholder="PK36 SCBL 0000 0011 2345 6702"
                  value={data.iban}
                  onChange={this.handleChange}
                  className="form-control"
                />
                {errors.iban && (
                  <div className="alert alert-danger">
                    This should be a valid IBAN No.
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

              <div className="col-6 pt-5">
                {this.renderButton("Register Vendor")}
              </div>
            </div>
            <button
              onClick={this.props.onClickCaptian}
              className="btn btn-sm btn-info mr-2 ml-3 float-left"
            >
              {this.props.capText}
            </button>

            <button
              onClick={this.props.onClickCar}
              className="btn btn-sm btn-info float-left"
            >
              {this.props.carText}
            </button>
          </form>
        </div>
      );
    } else {
      return (
        <div id="spinner" className="text-center">
          <div className="spinner-border">
            <span className="sr-only">Loading...</span>
          </div>
        </div>)
    }

  }


  render() {
    return (
      <div>
        {this.selectDisplay()}
      </div>
    );
  }
}

export default VendorForm;
