import React, {Component} from 'react';
import Joi from "joi-browser";
import firebase from "firebase/app";
import config from "./../config";
import './Signup.css'
import TopNavigation from '../TopNavigation/TopNavigation'
import rozcarlogo from '../Images/rozcarlogo.png'
import image2 from '../Images/image2.jpg'

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


      <link href="node_modules/@coreui/icons/css/coreui-icons.min.css" rel="stylesheet"/>
      <link href="node_modules/flag-icon-css/css/flag-icon.min.css" rel="stylesheet"/>
      <link href="node_modules/font-awesome/css/font-awesome.min.css" rel="stylesheet"/>
      <link href="node_modules/simple-line-icons/css/simple-line-icons.css" rel="stylesheet"/>
      <link href="css/style.css" rel="stylesheet"/>
      <link href="vendors/pace-progress/css/pace.min.css" rel="stylesheet"/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

    
      {/* <div className="container">
        
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
            <div className="col-12">
                <div className = "container" >
                    <h1 style={{ "textAlign": "center" }}>SignUp!</h1>
                    <div className="row">
                        <div className="col-3">
                            <img src={image2} width="250"></img>
                        </div>
                        <div className="col-9">
                        <div className="row">   
                            <div className="col-md-6 col-lg-6 mt-3">
                                <input type="text" className="form-control" placeholder = "username"></input>
                            </div>
                        </div>

                    <div className="row">   
                        <div className="col-md-6 col-lg-6 mt-3">
                            <input type="password" className="form-control" placeholder = "password"></input>
                        </div>
                    </div>

                    <div className="row">   
                        <div className="col-md-6 col-lg-6 mt-3">
                            <input type="password" className="form-control" placeholder = "confirm Password"></input>
                        </div>
                    </div>

                    <div className="row">   
                        <div className="col-md-6 col-lg-6 mt-3">
                            <input type="email" className="form-control" placeholder = "email"></input>
                        </div>
                    </div>

                    <div className="row">   
                        <div className="col-md-6 col-lg-6 mt-3">
                            <input type="number" className="form-control" placeholder = "phone number"></input>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6 mt-3">
                        <button className="btn btn-primary float-right ">Signup</button>
                    </div>

                </div>
                </div>
                </div>
            </div>


        <div >
            <div className="col-12">
            <div className="container">
                
                </div>
            </div>
        <div className = "row no-gutter" style={{"margin":"0","padding":"5px 0"}}>
              
              
        </div>
          

        </div>
      </div> */}
    <div className ="app flex-row align-items-center">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mx-4">
            <div className="card-body p-4">
              <h1>Register</h1>
              <p className="text-muted">Create your account</p>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-user"></i>
                  </span>
                </div>
                <input className="form-control" type="text" placeholder="Username"/>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-envelope"></i>
                  </span>
                    
                </div>
                <input className="form-control" type="text" placeholder="Email"/>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-lock"></i>
                  </span>
                </div>
                <input className="form-control" type="password" placeholder="Password"/>
              </div>
              <div className="input-group mb-4">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-lock"></i>
                  </span>
                </div>
                <input className="form-control" type="password" placeholder="Repeat password"/>
              </div>
              <button className="btn btn-block btn-success" type="button">Create Account</button>
            </div>
            <div className="card-footer p-4">
              <div className="row">
                <div className="col-6">
                  <button className="btn btn-block btn-facebook" type="button">
                    <span>facebook</span>
                  </button>
                </div>
                <div className="col-6">
                  <button className="btn btn-block btn-twitter" type="button">
                    <span>twitter</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>





      </div>
    );
  }
}

export default Signup;