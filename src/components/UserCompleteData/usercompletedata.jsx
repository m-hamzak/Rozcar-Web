import React, { Component } from "react";
// eslint-disable-next-line
import { Redirect } from "react-router-dom";
import firebase from "firebase/app";

class UserCompleteData extends Component{
    constructor(){
        super();
        this.state = {
        }   
    }

    componentDidMount(){}

    render(){
        return(
            <div>
                <h1>User Complete Data</h1>
                {
                    this.props.match.params.id
                }
                
            </div>
        )
    };
}

export default UserCompleteData