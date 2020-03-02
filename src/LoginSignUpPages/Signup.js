import React, {Component} from 'react';
import Joi from "joi-browser";
import firebase from "firebase/app";
import config from "./../config";
import './Signup.css'
import TopNavigation from '../TopNavigation/TopNavigation'
import rozcarlogo from '../Images/rozcarlogo.png'

class Signup extends Component {
  state = {
    data: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      phoneNumber: ""
    },
    errors: {},
    errorMessage: "",
    submitted: false
  }


  schema = {
    username: Joi.string()
      .regex(/^[A-Za-z ]+$/)
      .required()
      .label("Username"),
    password: Joi.string()
      .alphanum()
      .required()
      .label("Password")
  };


  doSubmit = async () => {
    let adminSearch;
    let userFlag = false;
    let passFlag = false;

    adminSearch = await firebase.database().ref("Admin")
      .orderByChild('username')
      .equalTo(this.state.data.username)
      .once('value');

    adminSearch.forEach((snapshot) => {
      userFlag = true;
      let admin = snapshot.val();
      if (admin.password === this.state.data.password) {
        passFlag = true;
        //console.log("Success");
      }
    });

    if (!userFlag) {
      this.setState({ errorMessage: "User doesn't exist." });
      return;
    }

    if (!passFlag) {
      this.setState({ errorMessage: `The password for ${this.state.data.username} is incorrect.` });
      return;
    }
    let token = this.generateId();
    localStorage.setItem("token", token)
    this.setState({
      data: {
        username: "",
        password: ""
      },
      errors: {},
      errorMessage: "",
      submitted: true
    });
    
  }



  generateId = () => {
    var arr = new Uint8Array(40 / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec => ('0' + dec.toString(16)).substr(-2)).join('')
  }



  render() {
    const { data, errors } = this.state;
    return (
      <div>

      
      <TopNavigation/>
      <div className="container">
        
        {this.state.errorMessage && (
          <div style={{ "width": "30%", "margin": "25px auto" }} className="alert alert-warning" role="alert">
            <h4> {this.state.errorMessage} </h4>
          </div>
        )}

        {this.state.submitted && (
          <div style={{ "width": "30%", "margin": "25px auto" }} className="alert alert-info" role="alert">
            <h4> Login Successfull! </h4>
          </div>
        )}

        <h1 style={{ "textAlign": "center" }}>SignUp!</h1>
        <div style={{ "width": "30%", "margin": "25px auto" }}>
          <form onSubmit={this.handleSubmit}>

            

            

            
            <div className="row">   
                    <div className="col-md-8 col-lg-12 mt-3">
                        <input type="text" className="form-control" placeholder = "username"></input>
                    </div>
            </div>

            <div className="row">   
                    <div className="col-md-8 col-lg-12 mt-3">
                        <input type="text" className="form-control" placeholder = "password"></input>
                    </div>
            </div>

            <div className="row">   
                    <div className="col-md-8 col-lg-12 mt-3">
                        <input type="text" className="form-control" placeholder = "Confirm Password"></input>
                    </div>
            </div>

            <div className="row">   
                    <div className="col-md-8 col-lg-12 mt-3">
                        <input type="text" className="form-control" placeholder = "Phone Number"></input>
                    </div>
            </div>

            <div className="form-group">
              <button id = "margin-btn" className="btn btn-lg btn-primary btn-block">SignUp</button>
            </div>

          </form>

        </div>
      </div>
      </div>
    );
  }
}

export default Signup;