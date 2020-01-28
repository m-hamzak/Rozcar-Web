import React from 'react';
import Form from "./form";
import Joi from "joi-browser";
// eslint-disable-next-line
import firebase from "firebase/app";
// eslint-disable-next-line
import config from "./../config";


class FilterForm extends Form {
  state = {
    data: {
      fromDate: "",
      toDate: ""
    },
    errors: {}
  }

  doSubmit = async () => {
    //console.log(this.state.data);
    let filtered = await firebase.database().ref("Driver2/Vendor").once("value");
    let splitTo = this.state.data.toDate.split("-");
    let splitFrom = this.state.data.fromDate.split("-");
    let fromDate = new Date(splitFrom[0], splitFrom[1], splitFrom[2]);
    let toDate = new Date(splitTo[0], splitTo[1], splitTo[2]);
    let vendors = [];
    filtered.forEach(vendor => {
      //console.log(vendor.val());
      if (this.state.data.toDate === "" && this.state.data.fromDate === "")
        vendors.push({ ID: vendor.ID, IDback: vendor.ref.path.pieces_[2], name: vendor.val().name, phone: vendor.val().phone, email: vendor.val().email });

      if (vendor.val().regDate) {
        let splitDate = vendor.val().regDate.split("-");
        let venDate = new Date(splitDate[2], splitDate[1], splitDate[0]);

        if (venDate >= fromDate && venDate <= toDate) {
          vendors.push({ ID: vendor.ID, IDback: vendor.ref.path.pieces_[2], name: vendor.val().name, phone: vendor.val().phone, email: vendor.val().email });
        }

      }
    });

    if (vendors.length !== 0)
      this.props.filter(vendors);
  }

  schema = {
    fromDate: Joi
      .required()
      .label("Start Date"),
    toDate: Joi
      .required()
      .label("End Date")
  };


  render() {
    return (

      <div className="row" style={{ width: "35%", margin: "25px auto" }}>
        <form onSubmit={this.handleSubmit} className="form-horizontal">
          <div className="input-group">
            <input
              type="date"
              name="fromDate"
              id="fromDate"
              placeholder=""
              value={this.state.data.fromDate}
              onChange={this.handleChange}
              className="form-control"
            />

            <input
              type="date"
              name="toDate"
              id="toDate"
              placeholder="DD-MM-YYYY"
              value={this.state.data.toDate}
              onChange={this.handleChange}
              className="form-control ml-1"
            />

            <input
              type="submit"
              value="Filter"
              className="btn btn-primary ml-2"
              id="button"
            />

          </div>

          {(this.state.errors.toDate || this.state.errors.fromDate) && (
            <p className="alert alert-danger">
              Date format should be DD-MM-YYYY.
              </p>
          )}

        </form>
      </div>
    );
  }
}

export default FilterForm;