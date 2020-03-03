import React, {Component} from 'react';
import Joi from "joi-browser";
import firebase from "firebase/app";
import config from "./../config";
import TopNavigation from '../TopNavigation/TopNavigation'
import image2 from '../Images/image2.jpg'


class LogIn extends Component {
  state = {
    data: {
      username: "",
      password: ""
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
    this.props.history.push('/admin');
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

        <h1 style={{ "textAlign": "center" }}>Login!</h1>
        <div style={{ "width": "30%", "margin": "25px auto" }}>
          <form onSubmit={this.handleSubmit}>
            <div>
              <img src = {image2} id = "logoRozcar"  className="w3-image w3-right w3-hide-small" width="200" height="100"></img>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="username"
                id="username"
                value={data.username}
                onChange={this.handleChange}
                className="form-control"
                placeholder="Username" />

              {errors.username && (
                <div className="alert alert-danger">
                  Username must be a string.
                </div>
              )}

            </div>


            <div className="form-group">
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

            <div className="form-group">
              <button className="btn btn-lg btn-primary btn-block">Login!</button>
            </div>

          </form>

        </div>
      </div> */}


    <link href="node_modules/@coreui/icons/css/coreui-icons.min.css" rel="stylesheet"/>
    <link href="node_modules/flag-icon-css/css/flag-icon.min.css" rel="stylesheet"/>
    <link href="node_modules/font-awesome/css/font-awesome.min.css" rel="stylesheet"/>
    <link href="node_modules/simple-line-icons/css/simple-line-icons.css" rel="stylesheet"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

    <body className="app flex-row align-items-center">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card-group">
            <div className="card p-4">
              <div className="card-body">
                <h1>Login</h1>
                <p className="text-muted">Sign In to your account</p>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-user"></i>
                    </span>
                  </div>
                  <input className="form-control" type="text" placeholder="Username"/>
                </div>
                <div className="input-group mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-lock"></i>
                    </span>
                  </div>
                  <input className="form-control" type="password" placeholder="Password"/>
                </div>
                <div className="row">
                  <div className="col-6">
                    <button className="btn btn-primary px-4" type="button">Login</button>
                  </div>
                  <div className="col-6 text-right">
                    <button className="btn btn-link px-0" type="button">Forgot password?</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card text-white bg-primary py-5 d-md-down-none">
              <div className="card-body text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <button className="btn btn-primary active mt-3" type="button">Register Now!</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    
  </body>

      </div>
    );
  }
}

export default LogIn;