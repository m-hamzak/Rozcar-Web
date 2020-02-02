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
            TableFlag : false
        }
    }

    componentDidMount(){
        var array = []
        var CustomerArray = []
        firebase
        .database()
        .ref("User2/UserInfo")
        .orderByKey()
        .once('value', snap => {
            snap.forEach(child => {
                array.push(child.val()["Name"],
                child.val()["Email"],
                child.val()["Phone"],
                child.val()["GroupID"],
                child.val()["Package"],
                child.val()["ResidentialAddress"],
                child.val()["OfficeAddress"],
                child.val()["UserID"]);
                CustomerArray.push(array);
                array = []
            })
            console.log(CustomerArray);
            this.setState({
                CustomerList : CustomerArray,
                TableFlag : true
            });
        });
    }

    render(){
        return(
            <div>
                <h1>User List Pages</h1>
                {
                    this.state.TableFlag ? <Tbl data={this.state.CustomerList}>

                    </Tbl> : null
                }
                
            </div>
        )
    };
}

export default UserListComponent;