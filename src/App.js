import React, { Component } from "react";
import { Switch } from "react-router-dom";
import AppRoute from "./components/appRoute";
import NavBar from "./components/navbar";
import MainForm from "./components/mainForm";
import Transcription from "./components/transcription";
import MapInfo from "./components/mapInfo";
import GroupDetail from "./components/groupDetail";
import Landing from "./components/landing";
import Login from "./components/login";
import Logout from "./components/logout";
import VendorEquity from "./components/vendorEquity";
import User from "./components/user";
import ClientPage from "./components/ClientPage";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <AppRoute NavBar={NavBar} name="register" path="/admin/register" component={MainForm} />
          <AppRoute NavBar={NavBar} name="map" path="/admin/map" component={MapInfo} />
          <AppRoute NavBar={NavBar} name="transcription" path="/admin/Transcription" component={Transcription} />
          <AppRoute NavBar={NavBar} name="vendors" path="/admin/vendors" component={VendorEquity} />
          <AppRoute NavBar={NavBar} name="login" path="/admin/login" component={Login} />
          <AppRoute NavBar={NavBar} name="logout" path="/admin/logout" component={Logout} />
          <AppRoute NavBar={NavBar} name="group" path="/admin/group/:id" component={GroupDetail} />
          <AppRoute NavBar={NavBar} name="user" path="/admin/user/:id" component={User} />
          <AppRoute NavBar={NavBar} name="admin" path="/admin" component={Landing} />
          <AppRoute NavBar={NavBar} name="client" path="/" component={ClientPage} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;