import React, { Component } from "react";
// eslint-disable-next-line
import { Redirect } from "react-router-dom";
import firebase from "firebase/app";
import Vendortable from "./Vendortable";

class Vendors extends Component{
    constructor(){
        super();
        this.state = {
            VendorsList : [],
            VendorsID : [],
        }
    }

    componentWillMount(){
        var vendor = []
        var vendorlist = []
        var arrayID = []
        var ID = []
        firebase.database()
        .ref()
        .child("Driver2/Vendor")
        .once('value', snap => {
            snap.forEach(child => {
                vendor.push(child.val()["ID"],
                child.val()["name"],
                child.val()["email"],
                child.val()["phone"],
                child.val()["cnicNo"],
                child.val()["iban"]);
                arrayID.push(child.key)
                vendorlist.push(vendor);
                ID.push(arrayID)
                vendor = []
                arrayID = []
            })
            console.log("Vendors",vendorlist)
            console.log("ID",ID)
            this.setState({
                VendorsID : ID,
                VendorsList : vendorlist,
            });
        })

    }

    OpenList = (whereTo) =>{
        this.props.history.push(whereTo)
    }

    render(){
        return(
            <div>
                <h2>Vendors List</h2>
                <button type="button" onClick={(e) => this.OpenList("/admin/captains")}>Captain List</button>
                <br/>
                <button type="button" onClick={(e) => this.OpenList("/admin/cars")}>Cars List</button>
                {
                    this.state.VendorsList.length > 0 ? <Vendortable data={this.state.VendorsList}
                                                                    IDdata={this.state.VendorsID}>

                    </Vendortable> : null
                }
                
            </div>
        )
    };

}

export default Vendors