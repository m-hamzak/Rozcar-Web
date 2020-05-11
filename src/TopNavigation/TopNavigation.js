import React, {Component} from 'react'
import './TopNavigation.css'
import rozcarlogo from '../Images/rozcarlogo.png'
import { NavLink } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown'


class TopNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
        
        }
    }
    OpenInfo = (register) => {
        this.props.history.push('/register/');
    }
   
    render() {
        return(

            <div>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"/>
                <link rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <div className = "container-fluid">
                    
                        <div className = "row">
                            <div className = "col-md-12 banner1">
                                {/* className="w3-image w3-right w3-hide-small" */}
                                <nav className = "navbar navbar-md trans shadow">
                                    <img className = "trans2 mt-4" src = {rozcarlogo} alt = "Rozcar Logo"  width="100" height="100"></img>
                                        
                                    <ul className = "nav mt-4 trans2">
                                        <li className = "nav-item trans2">
                                            <NavLink className="nav-link cool-link" to="/home">Home</NavLink>
                                        </li>
                                        <li className = "nav-item trans2" >
                                            <NavLink className="nav-link cool-link" to="/packages">Packages</NavLink>
                                        </li>
                                            <li className = "nav-item trans2" >
                                            <NavLink className="nav-link cool-link" to="/our-story">Our Story</NavLink>
                                        </li>
                                        <li className = "nav-item trans2" >
                                            <NavLink className="nav-link cool-link" to="/contact">Contact</NavLink>
                                        </li>
                                        <li className = "nav-item trans2">
                                            <NavLink className="nav-link cool-link" to="/lets-talk">Lets talk!</NavLink>              
                                        </li>
                                        <div className="vl"></div>
                                        {/* <li className = "nav-item"> */}
                                            <button type = "button" className = "header-button">REGISTER NOW</button>
                                        {/* </li> */}
                                    </ul>
                                </nav>
                                {/* <ul className = "nav-item ">
                                    <NavLink className="nav-link text-right" to="/">Become a Partner?</NavLink>              
                                </ul> */}
                            </div>   
                        </div>
                
                </div>
            </div>
        );
    }
}

export default TopNavigation;