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
            </div>
        )
    }


}
export default CMS 