import React, { Component } from "react";
// eslint-disable-next-line
import { Redirect } from "react-router-dom";
import firebase from "firebase/app";
import CaptainTable from './CaptainTable'
import CarTable from './CarTable'

class VendorDetails extends Component{
    constructor(){
        super();
        this.state = {
            vendor : null,
            AllCaptains : [],
            AllCaptainsID : [],
            AllCars : [],
        }   
    }

    componentDidMount(){
        firebase
        .database()
        .ref("Driver2/Vendor")
        .child(this.props.match.params.id)
        .once('value', snap => {
            this.setState({
                vendor : snap.val()
            })
            console.log("User",snap.val()["email"])
        });
        var captain = []
        var captainList = []
        var arrayID = []
        var ID = []
        firebase
        .database()
        .ref("Driver2/Captain")
        .orderByChild("vendorID")
        .equalTo(this.props.match.params.id)
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
                AllCaptainsID : ID,
                AllCaptains : captainList,
            });
            console.log("User",snap.val()["email"])
        });

        var Cars = []
        var CarsList = []
        firebase.database()
        .ref("Driver2/Car")
        .child(this.props.match.params.id)
        .once('value', snap => {
            snap.forEach(child => {
                Cars.push(child.val()["regNo"],
                child.val()["color"],
                child.val()["model"],
                child.val()["modelCar"],
                child.val()["belongTo"],
                child.val()["cc"],
                child.val()["make"],
                child.val()["kind"],
                child.val()["runningPage"],
                child.val()["taken"],
                child.val()["RegisteredBy"],
                child.key,
                this.props.match.params.id)
                CarsList.push(Cars);
                Cars = []

            })
            this.setState({
                AllCars : CarsList
            })
        })
    }

    showDetail = () => {
        var layout = []
        layout.push(
            <div key={"0"}>
                
                <label for="ID">{"ID : " + this.state.vendor["ID"]}</label>
                <br/>
                <label for="email">{"Email : " + this.state.vendor["email"]}</label>
                <br/>
                <label for="Name">{"Name : " + this.state.vendor["name"]}</label>
                <br/>
                <label for="num">{"Phone Number : " + this.state.vendor["phone"]}</label>
                <br/>
                <label for="altnum">{"Alternate phone Number : " + this.state.vendor["alternatePhone"]}</label>
                <br/>
                <label for="iban">{"IBAN Number : " + this.state.vendor["iban"]}</label>
                <br/>
                <label for="cnin">{"CNIC Number : " + this.state.vendor["cnicNo"]}</label>
                <br/>
                <label for="regDate">{"Registration Date : " + this.state.vendor["regDate"]}</label>
                <br/>
                <label for="regBy">{"Registered By : " + this.state.vendor["Registered By"]}</label>
            
                
            </div>
        )
        return layout
    }


    render(){
        return(
            <div>
                <h3>Vendor Detail with Cars and Captains</h3>
                {
                    this.state.vendor !== null ? this.showDetail() : null
                }
                <h3>Captains of this Vendor</h3>
                {
                    this.state.AllCaptains.length > 0 ? <CaptainTable data={this.state.AllCaptains}
                                                                    IDdata={this.state.AllCaptainsID}>

                    </CaptainTable> : null
                }
                <h3>Cars of this Vendor</h3>
                {
                    this.state.AllCars.length > 0 ? <CarTable data={this.state.AllCars}>

                    </CarTable> : null
                }
                
            </div>
        )
    };
}

export default VendorDetails