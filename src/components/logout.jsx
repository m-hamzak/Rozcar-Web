import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class Logout extends Component {
  state = {
    loggedOut: false
  }

  componentDidMount = () => {
    localStorage.removeItem("token");
    this.setState({ loggedOut: true });
  }

  render() {
    if (this.state.loggedOut === true) {
      return (<Redirect to="/admin/login"></Redirect>);
    } else {
      return (
        <div className="container">
          <div className="alert alert-info mt-5" role="alert">
            <h4> You have been Successfully logged out! </h4>
          </div>
        </div>
      );
    }
  }
}

export default Logout;