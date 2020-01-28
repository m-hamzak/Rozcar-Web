import React, { Component } from "react";
// eslint-disable-next-line
import config from "./../config";
// eslint-disable-next-line
import firebase from "firebase/app";
import "../index.css";
import { Redirect } from "react-router-dom";
import { CSVLink } from "react-csv";

class User extends Component {
  state = {
    buttonText: "Block",
    user: {},
    csvData: []
  };

  componentDidMount = () => {
    let user;
    let csvData = [];
    if (this.props.location.state)
      user = this.props.location.state.user;

    if (user.profilePic) {
      csvData = [
        ["CaptainID", "VendorID", "CNIC", "PhoneNumber", "Email"],
        [user.ID, user.venID, user.cnic, user.phone, user.email]
      ];
    } else {
      csvData = [
        ["VendorID", "CNIC", "PhoneNumber", "Email", "Iban"],
        [user.ID, user.cnic, user.phone, user.email, user.iban]
      ];
    }
    this.setState({ user, csvData });
  };

  handleBtnClick = () => {
    let buttonText = this.state.buttonText;
    if (buttonText === "Block") {
      buttonText = "UnBlock";
    }
    else {
      buttonText = "Block";
    }
    this.setState({ buttonText });
  }


  checkAuth = () => {
    if (localStorage.getItem("token")) {
      const { user, csvData } = this.state;
      return (
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4">

              <h1>User Profile</h1>
              <div className="card text-white bg-dark border-primary mb-2 clickable">
                <div className="card-body">

                  {user.profilePic && <div id="profile-container" ><img src={user.profilePic} alt="Profile" /></div>}
                  {user.venID && <button onClick={this.handleBtnClick} className="btn btn-sm btn-danger float-right">{this.state.buttonText}</button>}

                  <p>{user.ID}</p>
                  {user.venID && <p>{user.venID}</p>}
                  <p>{user.cnic}</p>
                  <p>{user.name}</p>
                  {user.iban && <p>{user.iban}</p>}
                  <p>{user.phone}</p>
                  <p>{user.email}</p>
                  <CSVLink className="btn btn-primary" data={csvData}>Download CSV</CSVLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to='/admin/login' />
    }
  }

  render() {

    return (<div>
      {this.checkAuth()}
    </div>);
  }

}

export default User;
