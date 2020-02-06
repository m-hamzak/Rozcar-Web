import React, { Component } from "react";
import VendorForm from "./vendorForm";
import CaptianForm from "./captianForm";
import CarForm from "./carForm";
import "../index.css";
import { Redirect } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

class MainForm extends Component {
  state = {
    captianBtn: false,
    captianText: "Add Captian",
    carBtn: false,
    carText: "Add Car"
  };


  //Function to toggle the modal for the captain form
  handleClickCaptian = () => {
    const capbtn = !this.state.captianBtn;
    this.setState({ captianBtn: capbtn });
    const captext = this.state.captianBtn ? "Add Captian" : "Minimize Captian";
    this.setState({ captianText: captext });
  };

  //Function to toggle the modal for the car form
  handleClickCar = () => {
    const carbtn = !this.state.carBtn;
    this.setState({ carBtn: carbtn });
    const cartext = this.state.carBtn ? "Add Car" : "Minimize Car";
    this.setState({ carText: cartext });
  };

  //Called after submitting the carform
  saveCar = async (car, runningPage, vendorID) => {
    let Car = { ...car };
    Car.runningPage = runningPage;

    let carids = await firebase.database().ref(`Driver2/Car/${vendorID}`).once("value");
    let i = 1;
    carids.forEach(carDB => {
      i++;
    });
    let today = new Date();
    Car.regDate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    Car.belongTo = "none";
    Car.taken = false;
    delete Car.vendorEmail;
    await firebase.database().ref("Driver2/Car/").child(vendorID).child(i).set(Car);
  };

  //Called after submitting the captain form
  saveCaptian = async (captain, imgs, capid, vendorID,isSubstitute) => {
    //console.log(captain, imgs, capid, vendorID)
    let Captain = { ...captain };
    Captain.cnicFront = imgs.cnicFront;
    Captain.cnicBack = imgs.cnicBack;
    Captain.dlFront = imgs.dlFront;
    Captain.dlBack = imgs.dlBack;
    Captain.profilePicture = imgs.profilePicture;
    Captain.vendorID = vendorID;
    delete Captain.password;
    delete Captain.vendorEmail
    let capids = await firebase.database().ref(`Driver2/Vendor/${Captain.vendorID}/captainids`).once("value");
    let i = 1;
    capids.forEach(cap => {
      i++;
    });

    let uniqueID = await firebase.database().ref("Driver2/UniqueID/Captain").once("value");

    if (uniqueID.val().Number + 1 > 99999)
      return;

    let ID = this.constructID(uniqueID);
    Captain.ID = ID;

    let today = new Date();
    Captain.regDate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

    await firebase.database().ref("Driver2/UniqueID/Captain").child("Number").set(uniqueID.val().Number + 1);
    if(isSubstitute === true){
      await firebase.database().ref("Driver2/Substitute/").child(capid).set(Captain);
    }else{
    await firebase.database().ref("Driver2/Captain/").child(capid).set(Captain);
    }
    
    await firebase.database().ref(`Driver2/Vendor/${Captain.vendorID}`).child("captainids").child(i).set(capid);
  };

  //Called after submitting the vendorform
  saveVendor = async (vendor, front, back, vendorid) => {
    let vendorData = { ...vendor };
    vendorData.cnicFront = front;
    vendorData.cnicBack = back;
    delete vendorData.password;
    let today = new Date();
    vendorData.regDate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

    let uniqueID = await firebase.database().ref("Driver2/UniqueID/Vendor").once("value");

    if (uniqueID.val().Number + 1 > 99999)
      return;

    let ID = this.constructID();

    await firebase.database().ref("Driver2/UniqueID/Captain").child("Number").set(uniqueID.val().Number + 1);

    vendorData.ID = ID;
    await firebase
      .database()
      .ref("/Driver2")
      .child("Vendor")
      .child(vendorid)
      .set(vendorData);
    //console.log("DATA SAVED");
  };


  constructID = (IDref) => {
    let ID = (IDref.val().Number + 1).toString();
    if (ID.length === 1) {
      return `${IDref.val().String}0000${ID}`;
    }

    if (ID.length === 2) {
      return `${IDref.val().String}000${ID}`;
    }

    if (ID.length === 3) {
      return `${IDref.val().String}00${ID}`;
    }

    if (ID.length === 4) {
      return `${IDref.val().String}0${ID}`;
    }
    return `${IDref.val().String}${ID}`
  }


  checkAuth = () => {

    if (localStorage.getItem("token")) {
      return (<div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-8">
            <VendorForm
              onClickCaptian={this.handleClickCaptian}
              onClickCar={this.handleClickCar}
              carText={this.state.carText}
              capText={this.state.captianText}
              saveVendor={this.saveVendor}
            />

            <div className="mt-5">
              {this.state.captianBtn && (
                <CaptianForm
                  saveCaptian={this.saveCaptian}
                  onClickCaptian={this.handleClickCaptian}
                  captianBtn={this.state.captianBtn}
                />
              )}
            </div>

            <div className="mt-5">
              {this.state.carBtn && (
                <CarForm
                  saveCar={this.saveCar}
                  onClickCar={this.handleClickCar}
                  carBtn={this.state.carBtn}
                />
              )}
            </div>
          </div>
        </div>
      </div>)
    } else {
      return <Redirect to='/admin/login' />
    }
  }

  render() {
    return (
      <div>
        {this.checkAuth()}
      </div>
    );
  }
}

export default MainForm;
