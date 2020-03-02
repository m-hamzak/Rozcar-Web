import React, {Component} from 'react'
import './TopNavigation.css'
import rozcarlogo from '../Images/rozcarlogo.png'


class TopNavigation extends Component {
    render() {
        return(
            <div>
               {/* <link rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/> */}
                <nav >
                    
                    
                    <div className = "navbar">
                    <div>
                        <img src = {rozcarlogo} id = "logoRozcar"  className="w3-image w3-right w3-hide-small" width="70" height="100"></img>
                    </div>
                        <a className="active" href="#"><i className="fa fa-fw fa-home"></i> Home</a>
                        <a href="#"><i className="fa fa-ticket"></i> packages</a>
                        <a href="#"><i className="fa fa-info-circle"></i> About</a>
                        <a href="#"><i className="fa fa-phone"></i> Contact</a>
                        <a href="#"><i className="fa fa-phone"></i> LogIn</a>
                        <a href="#"><i className="fa fa-phone"></i> Register</a>
                        
                    </div>  
                </nav>
            </div>
        );
    }
}

export default TopNavigation;