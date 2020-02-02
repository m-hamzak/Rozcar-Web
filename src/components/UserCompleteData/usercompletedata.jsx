import React, { Component } from "react";
// eslint-disable-next-line
import { Redirect } from "react-router-dom";
import firebase from "firebase/app";

class UserCompleteData extends Component{
    constructor(){
        super();
        this.state = {
            User : null
        }   
    }

    componentDidMount(){
        firebase
        .database()
        .ref("User2/UserInfo")
        .child(this.props.match.params.id)
        .on('value', snap => {
            this.setState({
                User : snap.val()
            })
            console.log("User",snap.val()["Email"])
        });
    }


    render(){
        return(
            <div>
                <h1>User Complete Data</h1>
                {
                    (this.state.User !== null) ? "Email : " + this.state.User["Email"] : null
                }
                
            </div>
        )
    };
}

export default UserCompleteData