import React, { Component } from "react";
// eslint-disable-next-line
import config from "./../config";
// eslint-disable-next-line
import firebase from "firebase/app";
import TimeLine from "./timeLine";
import TimeDistance from "./timeDistanceForm";
import "../index.css";
import InfoTable from './InfoTable';
import Table from "./table";
import { Redirect } from "react-router-dom";


class GroupDetail extends Component {

  columns = [
    { label: "Name", path: "Name" },
    { label: "PickUp Location", path: "ResidentialAddress" },
    { label: "Dropoff Location", path: "OfficeAddress" },
    { label: "Phone No", path: "Phone" },
    { label: "Email", path: "Email" }
  ];


  state = {
    users: [],
    lockBtnText: "Lock Group",
    showInfoTable: false,
    verified: false,
    TDverified: false,
    radioBtn: {
      up: true,
      down: false
    },
    timeLineInfo: false
  };


  radioChange = (value) => {
    console.log("HERE");
    let radioBtn = { ...this.state.radioBtn };
    if (value === "up") {
      radioBtn.up = true;
      radioBtn.down = false;
    } else {
      radioBtn.up = false;
      radioBtn.down = true;
    }
    this.setState({ radioBtn });
  }


  componentDidMount = async () => {
    let verified = false;
    if (this.props.location.state)
      verified = this.props.location.state.verified;

    const userRef = firebase.database().ref("User2/UserInfo");
    let users = [];
    let lockBtnText = "";
    //read user details of users in the current group from firebase
    const Users = await userRef
      .orderByChild("GroupID")
      .equalTo(this.props.match.params.id)
      .once("value");

    //add each user to the users array in the state  
    Users.forEach(user => {
      let temp = { ...user.val() };
      temp.ID = user.ref.path.pieces_[2];
      users.push(temp);
    });

    if (!verified) {
      const groups = await firebase.database().ref("User2/IDsList").orderByChild("ID")
        .equalTo(this.props.match.params.id)
        .once("value");

      groups.forEach(group => {
        lockBtnText = group.isLocked ? "Locked" : "Lock Group";
      });
    }

    this.setState({ users, lockBtnText, verified });
  };


  handleLock = async () => {
    //get the group with the current group ID
    const groups = await firebase.database().ref("User2/IDsList").orderByChild("ID")
      .equalTo(this.props.match.params.id)
      .once("value");

    //set islocked to true  
    groups.forEach(group => {
      firebase.database().ref(`User2/IDsList/${group.ref.path.pieces_[2]}`).child("isLocked").set(true);
    });

    let lockBtnText = "Locked";
    this.setState({ lockBtnText });
  }


  async componentWillUnmount() {
    if (!this.state.verified) {
      const groups = await firebase.database().ref("User2/IDsList").orderByChild("ID")
        .equalTo(this.props.match.params.id)
        .once("value");

      //set islocked to false  
      groups.forEach(group => {
        firebase.database().ref(`User2/IDsList/${group.ref.path.pieces_[2]}`).child("isLocked").set(false);
      });
    }
  }


  toggleSchedule = () => {
    this.setState({ showInfoTable: !this.state.showInfoTable, TDverified: false, timeLineInfo: false });
  }

  openTimeLineInfo = () => {
    this.setState({ timeLineInfo: true, showInfoTable: true  });
  }

  openDTverified = () => {
    this.setState({ TDverified: true, showInfoTable: true });
  }


  checkAuth = () => {

    if (localStorage.getItem("token")) {
      if (this.state.verified) {
        return (<div className="container">
          {this.state.showInfoTable && <InfoTable users={this.state.users} show={this.state.showInfoTable} toggleSchedule={this.toggleSchedule} verified={this.state.verified} />}

          <h1 className="mt-1">Group Detail {this.props.match.params.id}</h1>

          <Table data={this.state.users} columns={this.columns} />

          <button onClick={this.toggleSchedule} className="btn btn-secondary mt-2 float-right">Show Schedule</button>
        </div>);
      }
      else {
        return (
          <div className="container">
            {this.state.showInfoTable && <InfoTable users={this.state.users} show={this.state.showInfoTable} toggleSchedule={this.toggleSchedule} verified={this.state.verified} TDverified={this.state.TDverified} timeLineInfo={this.state.timeLineInfo} />}

            <h1 className="mt-1">Group Detail {this.props.match.params.id}</h1> <button className="btn btn-primary" onClick={this.handleLock}>
              {this.state.lockBtnText}</button>

            <button onClick={this.toggleSchedule} className="btn btn-secondary ml-2">Show Schedule</button>
            <div className="row">
              <div className="col-md-6 col-lg-6">
                <div className="row">
                  <div className="col-md-12 col-lg-12">
                    <table className="table table-bordered mt-4">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Pickup Location</th>
                          <th>Dropoff Location</th>
                        </tr>
                      </thead>

                      <tbody>
                        {this.state.users.map(user => (
                          <tr key={user.Name}>
                            <td>
                              {user.Name} {user.LastName}
                            </td>
                            <td>{user.ResidentialAddress}</td>
                            <td>{user.OfficeAddress}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 col-lg-12 mt-5">
                    <div className="card">
                      <div className="card-body"><TimeDistance flag={this.state.radioBtn} users={this.state.users} groupID={this.props.match.params.id} openDTverified={this.openDTverified} /></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-6 mb-5 mt-4">
                <TimeLine radioChange={this.radioChange} radioBtn={this.state.radioBtn} openTimeLineInfo={this.openTimeLineInfo} users={this.state.users} />
              </div>
            </div>
          </div>
        );
      }
    } else {
      return <Redirect to='/admin/login' />
    }
  }

  render() {

    return (<div>
      {this.checkAuth()}
    </div>);
  }
}

export default GroupDetail;
