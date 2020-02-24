import React from "react";
import { NavLink, Link } from "react-router-dom";
import "../index.css";

const NavBar = ({ routeData }) => {
  let isAdmin;
  if (routeData.path.indexOf("admin") === -1) {
    isAdmin = false;
  } else {
    isAdmin = true;
  }

  if (localStorage.getItem("token")) {
    return (
      <nav
        id="nav-Zindex"
        className="navbar navbar-expand-lg navbar-light bg-light"
      >
        <Link className="navbar-brand" to={isAdmin ? "/admin" : "/"}>
          Rozcar
      </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/map">
                Map
            </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/register">
                Register
            </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/Transcription">
                Transcription
            </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/vendors">
                Vendors
            </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/userlist">
                CustomersList
            </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/logout">
                Logout
            </NavLink>
            </li>






            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/Trans">
                Trans
              </NavLink>
            </li>
            

          </ul>
        </div>
      </nav>
    );
  } else {
    return (
      <nav
        id="nav-Zindex"
        className="navbar navbar-expand-lg navbar-light bg-light"
      >
        <Link className="navbar-brand" to={isAdmin ? "/admin" : "/"}>
          Rozcar
      </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              {isAdmin &&
                <NavLink className="nav-link" to="/admin/login">
                  Login
            </NavLink>
              }
            </li>
          </ul>
        </div>
      </nav>
    );
  }

};

export default NavBar;
