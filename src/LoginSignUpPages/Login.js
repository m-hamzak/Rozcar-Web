import React, {Component} from 'react';
import Joi from "joi-browser";
import firebase from "firebase/app";
import config from "./../config";
import TopNavigation from '../TopNavigation/TopNavigation'


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

        <h1 style={{ "textAlign": "center" }}>Login!</h1>
        <div style={{ "width": "30%", "margin": "25px auto" }}>
          <form onSubmit={this.handleSubmit}>

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
      </div>
      </div>
    );
  }
}

export default LogIn;