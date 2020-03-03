import React, {Component} from 'react'
import './TopNavigation.css'
import rozcarlogo from '../Images/rozcarlogo.png'
import Dropdown from 'react-bootstrap/Dropdown'


class TopNavigation extends Component {
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
                        <div>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Dropdown Button
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <label>hi</label>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </div>   
                    </div> 
                    <div>
                        
                    </div>
                    
                    
                </nav>
            </div>
        );
    }
}

export default TopNavigation;