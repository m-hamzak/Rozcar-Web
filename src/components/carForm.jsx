import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import { Button, Modal } from "react-bootstrap";
import firebase from "firebase/app";
import "../index.css";
//import '../App.css'

// backgroundcolor

class CarForm extends Form {
  state = {
    data: {
      regNo: "",
      runningPage: "",
      modelCar: "",
      color: "",
      make: "",
      model: "",
      cc: "",
      kind: "",
      vendorEmail: ""
    },

    errors: {},
    errorMessage: "",
    submitted: false,
    loading: false
  };

  setRef = ref => {
    this.file = ref;
  };

  schema = {
    regNo: Joi.string()
      .regex(/^[A-Za-z ]{2,4}-[0-9]{2,4}$/)
      .required()
      .label("Registration No"),
    runningPage: Joi.required().label("Running Page"),
    modelCar: Joi.string()
      .alphanum()
      .required()
      .label("Model Car"),
    color: Joi.string()
      .regex(/^[A-Za-z ]+$/)
      .required()
      .label("Color"),
    make: Joi.string()
      .regex(/^[A-Za-z ]+$/)
      .required()
      .label("Make"),
    model: Joi.string()
      .alphanum()
      .required()
      .label("Model"),
    cc: Joi.number()
      .integer()
      .required()
      .label("CC"),
    kind: Joi.string()
      .regex(/^[A-Za-z ]+$/)
      .required()
      .label("Kind"),
    vendorEmail: Joi.string()
      .email()
      .required()
      .label("Vendor Email")
  };

  doSubmit = async () => {
    //server logic

    let vendorID = "";

    const vendors = await firebase.database().ref("Driver2/Vendor").orderByChild("email")
      .equalTo(this.state.data.vendorEmail)
      .once("value");

    vendors.forEach(vendor => {
      vendorID = vendor.ref.path.pieces_[2];
    });


    if (!vendorID) {
      this.setState({ errorMessage: "Vendor doesn't exist.", loading: false });
      console.log("Vendor doesn't exist");
      return;
    }

    const storageRef = firebase.storage().ref();
    const file = this.file.files[0];
    const image1 = storageRef.child(this.file.files[0].name);
    this.setState({ loading: true });
    let runningPage = "";

    image1.put(file).then(snapshot => {
      image1
        .getDownloadURL()
        .then(url => {
          runningPage = url;
          this.props.saveCar(this.state.data, runningPage, vendorID);
          console.log("Car submitted");
          this.setState({
            data: {
              regNo: "",
              runningPage: "",
              modelCar: "",
              color: "",
              make: "",
              model: "",
              cc: "",
              kind: "",
              vendorEmail: ""
            },
            submitted: true,
            errorMessage: "",
            loading: false
          });
        })
        .catch(err => {
          this.setState({ errorMessage: err.serverResponse.message, loading: false });
        });
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
              <h4> Car Submitted Successfully! </h4>
            </div>
          )}
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="input-group pb-3">
              <div className="col-6">
                <label htmlFor="regNo">Registration No:</label>
                <input
                  type="text"
                  name="regNo"
                  id="regNo"
                  placeholder="abc-123"
                  value={data.regNo}
                  onChange={this.handleChange}
                  className="form-control"
                />
                {errors.regNo && (
                  <div className="alert alert-danger">
                    This should be a valid car registeration number.
                  </div>
                )}
              </div>

              <div className="col-6">
                <label htmlFor="runningPage"><span>Running Page Snapshot</span></label>
                <input
                  type="file"
                  required
                  name="runningPage"
                  id="runningPage"
                  value={data.runningPage}
                  onChange={this.handleChange}
                  ref={this.setRef}
                  className="form-control fileInputs"
                />

                {errors.runningPage && (
                  <div className="alert alert-danger">{errors.runningPage}</div>
                )}
              </div>
            </div>

            <div className="input-group pb-3">
              <div className="col-6">
                <label htmlFor="modelCar">Car Model:</label>
                <input
                  type="text"
                  name="modelCar"
                  id="modelCar"
                  placeholder="Car Model"
                  value={data.modelCar}
                  onChange={this.handleChange}
                  className="form-control"
                />
                {errors.modelCar && (
                  <div className="alert alert-danger">{errors.modelCar}</div>
                )}
              </div>

              <div className="col-6">
                <label htmlFor="Color">Color:</label>
                <input
                  type="text"
                  name="color"
                  id="color"
                  placeholder="Color"
                  value={data.color}
                  onChange={this.handleChange}
                  className="form-control"
                />
                {errors.color && (
                  <div className="alert alert-danger">
                    Color should only be a string.
                  </div>
                )}
              </div>
            </div>

            <div className="input-group pb-3">
              <div className="col-6">
                <label htmlFor="make">Make:</label>
                <input
                  type="text"
                  name="make"
                  id="make"
                  placeholder="Make"
                  value={data.make}
                  onChange={this.handleChange}
                  className="form-control"
                />
                {errors.make && (
                  <div className="alert alert-danger">
                    Make should only be a string.
                  </div>
                )}
              </div>

              <div className="col-6">
                <label htmlFor="model">Model:</label>
                <input
                  type="text"
                  name="model"
                  id="model"
                  placeholder="Model"
                  value={data.model}
                  onChange={this.handleChange}
                  className="form-control"
                />
                {errors.model && (
                  <div className="alert alert-danger">{errors.model}</div>
                )}
              </div>
            </div>

            <div className="input-group pb-3">
              <div className="col-6">
                <label htmlFor="cc">CC:</label>
                <input
                  type="text"
                  name="cc"
                  id="cc"
                  placeholder="CC"
                  value={data.cc}
                  onChange={this.handleChange}
                  className="form-control"
                />
                {errors.cc && (
                  <div className="alert alert-danger">{errors.cc}</div>
                )}
              </div>

              <div className="col-6">
                <label htmlFor="kind">Kind:</label>
                <input
                  type="text"
                  name="kind"
                  id="kind"
                  placeholder="Kind"
                  value={data.kind}
                  onChange={this.handleChange}
                  className="form-control"
                />
                {errors.kind && (
                  <div className="alert alert-danger">
                    Kind should only be a string.
                  </div>
                )}
              </div>
            </div>

            <div className="input-group pb-3">
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
              </div>
              <div className="col-6 pt-4">
                {this.renderButton("Register Car")}
              </div>

            </div>
          </form>
        </div>
      );
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
    const { carBtn, onClickCar } = this.props;
    return (
      <Modal show={carBtn} onHide={onClickCar}>
        <Modal.Header closeButton>
          <Modal.Title>Car Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.selectModalBody()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClickCar}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CarForm;
