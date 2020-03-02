import React, { Component } from "react";
// eslint-disable-next-line
import { Redirect } from "react-router-dom";
import firebase from "firebase/app";
import Tbl from './Tbl'

class UserListComponent extends Component{
    constructor(){
        super();
        this.state = {
            CustomerList : [],
            IDCustomerList : [],
            TableFlag : false
        }
    }

    componentDidMount(){
        var array = []
        var CustomerArray = []
        var arrayID = []
        var ID = []
        firebase
        .database()
        .ref("User2/UserInfo")
        .once('value', snap => {
            snap.forEach(child => {
                array.push(child.val()["Name"],
                child.val()["Email"],
                child.val()["Phone"],
                child.val()["GroupID"],
                child.val()["Package"],
                child.val()["ResidentialAddress"],
                child.val()["OfficeAddress"]);
                arrayID.push(child.val()["UserID"])
                CustomerArray.push(array);
                ID.push(arrayID)
                array = []
                arrayID = []
            })
            console.log(CustomerArray);
            this.setState({
                IDCustomerList : ID,
                CustomerList : CustomerArray,
                TableFlag : true,
                
            });
        });
    }

    render(){
        return(
            <div>
                <h2>User List</h2>
                {
                    this.state.TableFlag ? <Tbl data={this.state.CustomerList}
                                                IDdata={this.state.IDCustomerList}>

                    </Tbl> : null
                }
                
            </div>
        )
    };
}

export default UserListComponent;