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
            <div className="container">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <h3>User Complete Data</h3>

                <div className="col-12">
                    <div className="row">
                        <div className="col-md-2 col-lg-2 mt-3">
                            <h6>First Name: </h6>        
                        </div>
                        <div className="col-md-4 col-lg-4 mt-3">
                            <input type="text" className="form-control" 
                            defaultValue={this.state.User !== null ? this.state.User["Name"]: null} ></input>
                        </div>

                        <div className="col-md-2 col-lg-2 mt-3">
                            <h6>Last Name: </h6>        
                        </div>
                        <div className="col-md-4 col-lg-4 mt-3">
                            <input type="text" className="form-control" 
                            defaultValue={this.state.User !== null ? this.state.User["LastName"]: null} ></input>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-2 col-lg-2 mt-3">
                            <h6>Email: </h6>        
                        </div>
                        <div className="col-md-4 col-lg-4 mt-3">
                            <input type="text" className="form-control" 
                            defaultValue={this.state.User !== null ? this.state.User["Email"]: null}></input>
                        </div>

                        <div className="col-md-2 col-lg-2 mt-3">
                            <h6>Gender: </h6>        
                        </div>
                        <div className="col-md-4 col-lg-4 mt-3">
                            <input type="text" className="form-control" 
                            defaultValue={this.state.User !== null ? this.state.User["Gender"]: null}></input>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-md-2 col-lg-2 mt-3">
                            <h6>Phone Number: </h6>        
                        </div>
                        <div className="col-md-4 col-lg-4 mt-3">
                            <input type="text" className="form-control" 
                            defaultValue={this.state.User !== null ? this.state.User["Phone"]: null} ></input>
                        </div>

                        <div className="col-md-2 col-lg-2 mt-3">
                            <h6>Member Number: </h6>        
                        </div>
                        <div className="col-md-4 col-lg-4 mt-3">
                            <input type="text" className="form-control" 
                            defaultValue={this.state.User !== null ? this.state.User["MemberNo"]: null} ></input>
                        </div>
                    </div>

                    


                    <div className="row">
                        <div className="col-md-2 col-lg-2 mt-3">
                            <h6>Occupation: </h6>        
                        </div>
                        <div className="col-md-4 col-lg-4 mt-3">
                            <input type="text" className="form-control" 
                            defaultValue={this.state.User !== null ? this.state.User["Occupation"]: null}></input>
                        </div>

                        <div className="col-md-2 col-lg-2 mt-3">
                            <h6>Institute Name: </h6>        
                        </div>
                        <div className="col-md-4 col-lg-4 mt-3">
                            <input type="text" className="form-control"
                            defaultValue={this.state.User !== null ? this.state.User["InstituteName"]: null} ></input>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-md-2 col-lg-2 mt-3">
                            <h6>Office Address: </h6>        
                        </div>
                        <div className="col-md-4 col-lg-4 mt-3">
                            <input type="text" className="form-control" 
                            defaultValue={this.state.User !== null ? this.state.User["OfficeAddress"]: null} ></input>
                        </div>

                        <div className="col-md-2 col-lg-2 mt-3">
                            <h6>Residential Address: </h6>        
                        </div>
                        <div className="col-md-4 col-lg-4 mt-3">
                            <input type="text" className="form-control" 
                            defaultValue={this.state.User !== null ? this.state.User["ResidentialAddress"]: null} ></input>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-md-2 col-lg-2 mt-3">
                            <h6>Group ID: </h6>        
                        </div>
                        <div className="col-md-4 col-lg-4 mt-3">
                            <input type="text" className="form-control" 
                            defaultValue={this.state.User !== null ? this.state.User["GroupID"]: null} ></input>
                        </div>

                        <div className="col-md-2 col-lg-2 mt-3">
                            <h6>Drop Area: </h6>        
                        </div>
                        <div className="col-md-4 col-lg-4 mt-3">
                            <input type="text" className="form-control" 
                            defaultValue={this.state.User !== null ? this.state.User["DropArea"]: null} ></input>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-md-2 col-lg-2 mt-3">
                            <h6>Drop Leader: </h6>        
                        </div>
                        <div className="col-md-4 col-lg-4 mt-3">
                            <input type="text" className="form-control" 
                            defaultValue={this.state.User !== null ? this.state.User["DropLeader"]: null} ></input>
                        </div>

                        <div className="col-md-2 col-lg-2 mt-3">
                            <h6>Date: </h6>        
                        </div>
                        <div className="col-md-4 col-lg-4 mt-3">
                            <input type="text" className="form-control" 
                            defaultValue={this.state.User !== null ? this.state.User["Date"]: null} readOnly></input>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-2 col-lg-2 mt-3">
                            <h6>Starting Date: </h6>        
                        </div>
                        <div className="col-md-4 col-lg-4 mt-3">
                            <input type="text" className="form-control" 
                            defaultValue={this.state.User !== null ? this.state.User["StartingDate"]: null} ></input>
                        </div>

                        <div className="col-md-2 col-lg-2 mt-3">
                            <h6>Time: </h6>        
                        </div>
                        <div className="col-md-4 col-lg-4 mt-3">
                            <input type="text" className="form-control" 
                            defaultValue={this.state.User !== null ? this.state.User["Time"]: null} ></input>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-2 col-lg-2 mt-3">
                            <h6>Form One: </h6>   
                        </div>
                        <div className="col-md-4 col-lg-4 mt-3">
                            <select type="select" className="form-control" 
                            defaultValue={this.state.User !== null ? this.state.User["FormOne"]: null} >
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>

                        <div className="col-md-2 col-lg-2 mt-3">
                            <h6>Form Two: </h6>   
                        </div>
                        <div className="col-md-4 col-lg-4 mt-3">
                            <select type="select" className="form-control" 
                            defaultValue={this.state.User !== null ? this.state.User["FormTwo"]: null} >
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-2 col-lg-2 mt-3">
                            <h6>Form Three: </h6>   
                        </div>
                        <div className="col-md-4 col-lg-4 mt-3">
                            <select type="select" className="form-control" 
                            defaultValue={this.state.User !== null ? this.state.User["FormThree"]: null} >
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>

                        <div className="col-md-2 col-lg-2 mt-3">
                            <h6>Leader: </h6>   
                        </div>
                        <div className="col-md-4 col-lg-4 mt-3">
                            <select type="select" className="form-control" 
                            defaultValue={this.state.User !== null ? this.state.User["LeaderBool"]: null} >
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-2 col-lg-2 mt-3">
                            <h6>Package: </h6>   
                        </div>
                        <div className="col-md-4 col-lg-4 mt-3">
                            <select type="select" className="form-control" 
                            defaultValue={this.state.User !== null ? this.state.User["Package"]: null} >
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>

                        <div className="col-md-2 col-lg-2 mt-3">
                            <h6>Pick Area: </h6>   
                        </div>
                        <div className="col-md-4 col-lg-4 mt-3">
                            <select type="select" className="form-control" 
                            defaultValue={this.state.User !== null ? this.state.User["PickArea"]: null} >
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>

                    </div>


                    <div className="row">
                        <div className="col-md-2 col-lg-2 mt-3">
                            <h6>Pick Leader: </h6>   
                        </div>
                        <div className="col-md-4 col-lg-4 mt-3">
                            <select type="select" className="form-control" 
                            defaultValue={this.state.User !== null ? this.state.User["PickLeader"]: null} >
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>

                        <div className="col-md-2 col-lg-2 mt-3">
                            <h6>Reject: </h6>   
                        </div>
                        <div className="col-md-4 col-lg-4 mt-3">
                            <select type="select" className="form-control" 
                            defaultValue={this.state.User !== null ? this.state.User["Reject"]: null} >
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-md-2 col-lg-2 mt-3">
                            <h6>Reject Message: </h6>   
                        </div>
                        <div className="col-md-4 col-lg-4 mt-3">
                            <select type="select" className="form-control" 
                            defaultValue={this.state.User !== null ? this.state.User["PickLeader"]: null} >
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>

                        <div className="col-md-2 col-lg-2 mt-3">
                            <h6>Transcribed: </h6>   
                        </div>
                        <div className="col-md-4 col-lg-4 mt-3">
                            <select type="select" className="form-control" 
                            defaultValue={this.state.User !== null ? this.state.User["Reject"]: null} >
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
                    </div>
                    


                    <div className="row">
                        <div className="col-md-12 col-lg-12 mt-3">
                            <button type="button" className="btn btn-primary float-right ml-2">Update</button>
                            <button type="button" className="btn btn-danger float-right"><i className="fa fa-ban mr-2"></i>Block</button>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
        )
    };
}

export default UserCompleteData