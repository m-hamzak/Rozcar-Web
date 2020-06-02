import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router, Switch, HashRouter } from 'react-router-dom';
import AppRoute from '../src/AppRoute/AppRoute'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import { BrowserRouter} from "react-router-dom";
import TopNavigation from "./TopNavigation/TopNavigation";
import LandingPage from "./LandingPage/LandingPage";
import LogIn from "./LoginSignUpPages/Login";



const Routing = (
  <HashRouter>
      <div id= 'routing-container'>
        <Switch>
        {/* <AppRoute NavBar={LandingPageHeader} exact name="LandingPage" path="/LandingPage" component={LandingPage}/> */}
          <AppRoute NavBar={TopNavigation} exact name="companylist" path="/companylist" component={LandingPage}/>
          <AppRoute NavBar={TopNavigation} exact name="companylist" path="/register" component={LogIn}/> 
        </Switch>

        {/* This is a header of HR just for testing purpose, Jab upper wala kaam ho jaye to te delete krdena.  */}
        {/* <Switch>
        <AppRoute NavBar={HRHeader} path='/' exact component={HR1}/>
        </Switch> */}

      </div>
  </HashRouter>
)


ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);