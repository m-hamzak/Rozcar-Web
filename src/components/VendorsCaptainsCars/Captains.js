import React, { Component } from "react";
// eslint-disable-next-line
import { Redirect } from "react-router-dom";
import firebase from "firebase/app";
import CaptainTable from "./CaptainTable";

class CaptainsList extends Component{
    constructor(){
        super();
        this.state = {
            CaptainList : [],
            IDCaptian : [],
        }
    }

    componentWillMount(){
        var captain = []
        var captainList = []
        var arrayID = []
        var ID = []
        firebase
        .database()
        .ref("Driver2/Captain")
        .once('value', snap => {
            snap.forEach(child => {
                captain.push(child.val()["ID"],
                child.val()["name"],
                child.val()["email"],
                child.val()["phone"],
                child.val()["currentcar"])
                arrayID.push(child.key,child.val()["vendorID"])
                captainList.push(captain);
                ID.push(arrayID)
                captain = []
                arrayID = []
            })
            console.log(ID,captainList)
            this.setState({
                IDCaptian : ID,
                CaptainList : captainList,
            });
        })
    }

    render(){
        return(
            <div>
                <h2>Captains List</h2>
                {
                    this.state.CaptainList.length > 0 ? <CaptainTable data={this.state.CaptainList}
                                                                    IDdata={this.state.IDCaptian}>

                    </CaptainTable> : null
                }
                
            </div>
        )
    };
}

export default CaptainsList