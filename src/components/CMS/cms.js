import React, { Component } from "react";
// eslint-disable-next-line
import { Redirect } from "react-router-dom";
import firebase from "firebase/app";
import { Modal } from 'react-bootstrap';
import './cms.css'

class CMS extends Component{
    constructor(){
        super();  
    }

    render(){
        return (
            <div className="contentheader">
                Content Management System
                <label> - Image Slider Changes</label>
                <label> - Who we are?</label>
                <input type="text" placeholder="Text Change"></input>
                <label>Why Buy it?</label>
                <input type="text" placeholder="Text Change"></input>
                <label>Why Rozcar ?</label>
                <select type="select" className="form-control" 
                            defaultValue="Why Rozcar Tabs" >
                                <option value="timesaving">Time Saving</option>
                                <option value="Economical">Economical</option>
                                <option value="safenserve">Safe and Serve</option>
                                <option value="inapphazard">In App Hazard</option>
                                <option value="airconditiona;">Air Condotional</option>
                                <option value="nofeevacation">No Fee for Vacation</option>
                                <option value="nopeak">No Peak/Suge</option>
                                <option value="automatedmatch">Automated Matching process</option>
                                <option value="effectivecommunication">Effective Communication</option>
                                <option value="regularannoucment">Regular Announcement</option>
                                <option value="erm">ERM</option>
                                <option value="easypayments">Easy Payments</option>
                            </select>
                <label> - Package Management Changes</label>

            </div>
        )
    }


}
export default CMS 