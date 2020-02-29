import React, { Component } from "react";
// eslint-disable-next-line
import { Redirect } from "react-router-dom";
import firebase from "firebase/app";

class CaptanProfiles extends Component{
    constructor(){
        super();
        this.state = {
            captain : null
        }   
    }

    componentDidMount(){
        firebase
        .database()
        .ref("Driver2/Captain")
        .child(this.props.match.params.id)
        .once('value', snap => {
            this.setState({
                captain : snap.val()
            })
            console.log("User",snap.val()["email"])
        });
    }

    render(){
        return(
            <div>
                <h3>Captain Details</h3>
                {
                    this.state.captain !== null ?  "Email : " + this.state.captain["email"]: null
                }
                
            </div>
        )
    };

}

export default CaptanProfiles