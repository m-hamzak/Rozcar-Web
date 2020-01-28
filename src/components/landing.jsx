import React from "react";
import "../main.css";

const Landing = () => {
  return (
    <React.Fragment>
      <div id="landing-header">
        <h1>Welcome to Rozcar!</h1>
        <hr className="hr" />
        <a href="/admin/register" className="btn btn-lg btn-success">
          Register Now!
        </a>
      </div>

      <ul className="slideshow">
        <li />
        <li />
        <li />
        <li />
        <li />
      </ul>
    </React.Fragment>
  );
};

export default Landing;
