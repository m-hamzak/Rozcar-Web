import React, {Component} from 'react'
import './TopNavigation.css'
import rozcarlogo from '../Images/rozcarlogo.png'
import Dropdown from 'react-bootstrap/Dropdown'


class TopNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
        
        }
    }
   
    render() {
        return(
            <div>
               <link rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <nav >
                    
                    
                    <div className = "navbar">
                        <div>
                            <img src = {rozcarlogo} id = "logoRozcar"  className="w3-image w3-right w3-hide-small" width="70" height="100"></img>
                        </div>
                        <a > Home</a>
                        <a > packages</a>
                        <a > Our Story</a>
                        <a >Contact</a>
                        <a > Lets talk!</a>  
                        <div class="dropdown">
                        <button className="dropbtn">Dropdown 
                            <i className="fa fa-caret-down"></i>
                        </button>
                            <div className="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                            </div>
                        </div>  
                    </div>
                    
                    
                    
                </nav>
            </div>
        );
    }
}

export default TopNavigation;