import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import ScheduleModal from './ScheduleModal'
import TimeDist from './TimeDist';
import firebase from "firebase/app";

class Trans extends Component{

    state = {
        showInfoTable: false,
        UsersProfile : [],
        PickUpLocation : [],
        DropOffLocation : [],
        PickUpSchedule : [],
        DropOffSchedule : [],
    }

    componentWillMount(){
        var UserInfo = []
        console.log("adsa","Adsad")
        const userRef = firebase.database().ref("User2/UserInfo");
        userRef.orderByChild("GroupID")
        .equalTo(this.props.match.params.id)
        .once("value", snap =>{
            //   console.log("Snap",snap.val())
            snap.forEach(function name(doc) {
            //    console.log("adsdasd",doc.val())
                    UserInfo.push(doc.val())
            })
            this.setState({
                UsersProfile : UserInfo
            })
            this.getAllPickUpLocation(UserInfo);
            this.getAllDropOffLocation(UserInfo);
            this.getAllPickUpSchedule(UserInfo);
            this.getAllDropOffSchedule(UserInfo);
        })
    }

    CheckForRendering = () => {
        if(this.state.UsersProfile.length <= 0){
            return false
        }else if(this.state.PickUpLocation.length <= 0){
            return false
        }else if(this.state.DropOffLocation.length <= 0){
            return false
        }else if(this.state.PickUpSchedule.length <= 0){
            return false
        }else if(this.state.DropOffSchedule.length <= 0){
            return false
        }
        return true
    }

    getAllPickUpLocation(UserProfile){
        var pickuplocationarray = [];
        const PickupLocation = firebase.database().ref("User2/PickLocation")
        for(let i = 0; i < UserProfile.length; i++){
            PickupLocation.child(UserProfile[i].UserID)
            .once("value",snap => {
                pickuplocationarray.push(snap.val())
                if(i === UserProfile.length - 1){
                    console.log("ll")
                    this.setState({
                        PickUpLocation : pickuplocationarray
                    })
                }
            })
        }
    }
    getAllDropOffLocation(UserProfile){
        var dropofflocationarray = [];
        const DropupLocation = firebase.database().ref("User2/DropLocation")
        for(let i = 0; i < UserProfile.length; i++){
            DropupLocation.child(UserProfile[i].UserID)
            .once("value",snap => {
                dropofflocationarray.push(snap.val())
                if(i === UserProfile.length - 1){
                    console.log("kk")
                    this.setState({
                        DropOffLocation : dropofflocationarray
                    })
                }
            })
        }
    }
    getAllPickUpSchedule(UserProfile){
        var pickUpSchedulearray = [];
        const PickUpSchedule = firebase.database().ref("User2/PickDays")
        for(let i = 0; i < UserProfile.length; i++){
            PickUpSchedule.child(UserProfile[i].UserID)
            .once("value",snap => {
                pickUpSchedulearray.push(snap.val())
                if(i === UserProfile.length - 1){
                    console.log("jjj")
                    this.setState({
                        PickUpSchedule : pickUpSchedulearray
                    })
                }
            })
            
        }
    }
    getAllDropOffSchedule(UserProfile){
        var DropOffSchedulearray = [];
        const DropOffSchedule = firebase.database().ref("User2/DropDays")
        for(let i = 0; i < UserProfile.length; i++){
            DropOffSchedule.child(UserProfile[i].UserID)
            .once("value",snap => {
                console.log("DropOffSchedule",snap.val())
                DropOffSchedulearray.push(snap.val())
                if(i === UserProfile.length - 1){
                    console.log("iii")
                    this.setState({
                        DropOffSchedule : DropOffSchedulearray
                    })
                }
            })
            
        }
    }

    ShowInforTable = (UserInfo) => {
        var table = [];
      //  console.log("0th Position",UserInfo[0].Name)
        for(let i = 0; i < UserInfo.length; i++){
            table.push(
                <tr key={i}> 
                    <th>{UserInfo[i].Name + UserInfo[i].LastName}</th>
                    <th>{UserInfo[i].ResidentialAddress}</th>
                    <th>{UserInfo[i].OfficeAddress}</th>
                </tr>
            )
        }
        return table
    }

    toggleSchedule = () => {
        this.setState({ showInfoTable: !this.state.showInfoTable });
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-lg-12 mt-5">
                        <h1>Group Detail {this.props.match.params.id}</h1>
                        <button type="button" className="btn btn-primary">Lock Group</button>    
                        {this.state.showInfoTable && <ScheduleModal show={this.state.showInfoTable} 
                        toggleSchedule={this.toggleSchedule} 
                        PickSchedule={this.state.PickUpSchedule} 
                        DropSchedule={this.state.DropOffSchedule} 
                        GroupID={this.props.match.params.id}
                        UsersProfiles = {this.state.UsersProfile}/>}
                        <button onClick={this.toggleSchedule} className="btn btn-secondary ml-2">Show Schedule</button>
                           

                            <div className="row">
                                <div className="col-md-12 col-lg-12">
                                    <div className="row">
                                        <div className="col-md-12 col-lg-12">
                                            <table className="table table-bordered mt-4 text-center">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Pickup Location</th>
                                                    <th>Dropoff Location</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    this.ShowInforTable(this.state.UsersProfile)
                                                }
                                            </tbody>
                                            </table>
                                            
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 col-lg-12">
                                            {/* <NavLink to="/admin/transRoute"><button type="button" className="btn btn-primary float-right mt-2">Set Route</button></NavLink>  */}
                                            {
                                                this.CheckForRendering() ? <TimeDist UserProfile={this.state.UsersProfile}
                                                                                                PickUpSchedule={this.state.PickUpSchedule}
                                                                                                DropOffSchedul={this.state.DropOffSchedule}
                                                                                                PickupLocation={this.state.PickUpLocation}
                                                                                                DropOffLocation={this.state.DropOffLocation}/> : null
                                            }
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Trans);