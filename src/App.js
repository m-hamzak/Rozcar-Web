import React, { Component } from "react";
import './App.css';
import { Switch, Route } from "react-router-dom";
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
import UserList from './components/UsersList/UserList';
import CustomerProfile from './components/UserCompleteData/usercompletedata'
import LandingPage from './LandingPage/LandingPage'
import TopNavigation from './TopNavigation/TopNavigation'
import Vendors from './components/VendorsCaptainsCars/Vendors'
import Captains from './components/VendorsCaptainsCars/Captains'
import Cars from './components/VendorsCaptainsCars/Car'
import VendorsCaptainCar from './components/VendorsCaptainsCars/VendorsCarsAndCaptain'
import CaptainProfile from './components/VendorsCaptainsCars/CaptainProfile'


import Trans from './components/Trans/Trans'

class App extends Component {
  render() {
    return (
    <div>

      <React.Fragment>
        <Switch>
          <Route path="/admin/userlist/profile/:id" component ={CustomerProfile}></Route>
          <AppRoute NavBar={NavBar} name="UserList" path="/admin/userlist" component={UserList} />
          <AppRoute NavBar={NavBar} name="register" path="/admin/register" component={MainForm} />
          <AppRoute NavBar={NavBar} name="map" path="/admin/map" component={MapInfo} />
          <AppRoute NavBar={NavBar} name="transcription" path="/admin/Transcription" component={Transcription} />
          <AppRoute NavBar={NavBar} name="vendorscarscaptains" path="/admin/vendors/:id" component={VendorsCaptainCar} />
          <AppRoute NavBar={NavBar} name="vendors" path="/admin/vendors" component={Vendors} />
          <AppRoute NavBar={NavBar} name="Captains" path="/admin/captains/:id" component={CaptainProfile} />
          <AppRoute NavBar={NavBar} name="Captains" path="/admin/captains" component={Captains} />
          <AppRoute NavBar={NavBar} name="Cars" path="/admin/cars" component={Cars} />
          <AppRoute NavBar={NavBar} name="login" path="/admin/login" component={Login} /> 
           <AppRoute NavBar={NavBar} name="trans" path="/admin/trans" component={Transcription} />
           <AppRoute NavBar={NavBar} name = "transGroup" path="/admin/transGroup/:id" component={Trans}/> 
          
           <AppRoute NavBar={NavBar} name="logout" path="/admin/logout" component={Logout} />
          <AppRoute NavBar={NavBar} name="group" path="/admin/group/:id" component={GroupDetail} />
          <AppRoute NavBar={NavBar} name="user" path="/admin/user/:id" component={User} />
          <AppRoute NavBar={NavBar} name="admin" path="/admin" component={Landing} />
           <Route name = "LandingPage" path = "/" component = {LandingPage}/>
          {/* <AppRoute NavBar={NavBar} name="client" path="/" component={ClientPage} /> */}
          
        </Switch>
       </React.Fragment>    
      <div className="App">
      
      
    </div> 
    </div>
    );
  }
}

export default App;
