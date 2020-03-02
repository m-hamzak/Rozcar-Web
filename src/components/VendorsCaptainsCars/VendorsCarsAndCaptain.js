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
                <div className="col-12">
                    <div className="row">
                        <div className="col-md-3 col-lg-3 mt-3">
                            <h6>ID: </h6>
                        </div>
                        <div className="col-md-6 col-lg-6 mt-3">
                            <input type="text" className="form-control" defaultValue={this.state.vendor["ID"]} readOnly></input>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 col-lg-3 mt-3">
                            <h6>Email: </h6>
                        </div>
                        <div className="col-md-6 col-lg-6 mt-3">
                            <input type="text" className="form-control" defaultValue={this.state.vendor["email"]} readOnly></input>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 col-lg-3 mt-3">
                            <h6>Full Name: </h6>
                        </div>
                        <div className="col-md-6 col-lg-6 mt-3">
                            <input type="text" className="form-control" defaultValue={this.state.vendor["name"]} ></input>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 col-lg-3 mt-3">
                            <h6>Phone Number: </h6>
                        </div>
                        <div className="col-md-6 col-lg-6 mt-3">
                            <input type="text" className="form-control" defaultValue={this.state.vendor["phone"]} ></input>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 col-lg-3 mt-3">
                            <h6>Alternate Phone Number: </h6>
                        </div>
                        <div className="col-md-6 col-lg-6 mt-3">
                            <input type="text" className="form-control" defaultValue={this.state.vendor["alternatePhone"]} ></input>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 col-lg-3 mt-3">
                            <h6>IBAN Number: </h6>
                        </div>
                        <div className="col-md-6 col-lg-6 mt-3">
                            <input type="text" className="form-control" defaultValue={this.state.vendor["iban"]} ></input>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 col-lg-3 mt-3">
                            <h6>CNIC Number: </h6>
                        </div>
                        <div className="col-md-6 col-lg-6 mt-3">
                            <input type="text" className="form-control" defaultValue={this.state.vendor["cnicNo"]} ></input>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 col-lg-3 mt-3">
                            <h6>Registration Date: </h6>
                        </div>
                        <div className="col-md-6 col-lg-6 mt-3">
                            <input type="text" className="form-control" defaultValue={this.state.vendor["regDate"]} ></input>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 col-lg-3 mt-3">
                            <h6>Registered By: </h6>
                        </div>
                        <div className="col-md-6 col-lg-6 mt-3">
                            <input type="text" className="form-control" defaultValue={this.state.vendor["Registered By"]} ></input>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-md-9 col-lg-9 mt-3">
                            <button type="button" className="btn btn-primary float-right">Update</button>
                        </div>
                    </div>


                </div>
            </div>
        )
        return layout
    }


    render(){
        return(
            <div className="container">
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