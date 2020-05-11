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
import Packages from "./Packages/Packages";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);