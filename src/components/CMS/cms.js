import React, { Component } from "react";
// eslint-disable-next-line
import { Redirect } from "react-router-dom";
import firebase from "firebase/app";
import { Modal } from 'react-bootstrap';

class CMS extends Component{
    constructor(){
        super();  
    }

    render(){
        return (
            <div>
                Content Management System
                <label> - Image Slider Changes</label>
                <label> - Who we are? Changes</label>
                <label> - Why Rozcar Content Changes</label>
                <label> - Package Management Changes</label>
            </div>
        )
    }


}
export default CMS 