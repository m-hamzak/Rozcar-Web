import React, { Component } from "react";
import Table from "./table";
import { Button, Modal } from "react-bootstrap";
// eslint-disable-next-line
import config from "./../config";
import firebase from "firebase/app";
import "firebase/database";

class InfoTable extends Component {
  columns = [
    { label: "Name", path: "MemberName" },
    { label: "Mon", path: "mon" },
    { label: "Tue", path: "tue" },
    { label: "Wed", path: "wed" },
    { label: "Thrs", path: "thrs" },
    { label: "Fri", path: "fri" },
    { label: "Sat", path: "sat" },
    { label: "Sun", path: "sun" }
  ];

  locationInfo = [];
  state = {
    data: [],
    timeType: "Drop"
  };

  componentDidMount = () => {
    this.readData("PickUp");
  };

  readData = async (callFunc) => {
    let data = [];
    let timeType = callFunc || this.state.timeType;
    let pickDays;
    let pickRef, dropRef;
    
    console.log("HERE info table");
    if(this.props.timeLineInfo)
      return;

    if (this.props.verified || this.props.TDverified) {
      pickRef = "NewPickDays";
      dropRef = "NewDropDays";
    } else {
      pickRef = "PickDays";
      dropRef = "DropDays";
    }

    if (timeType === "PickUp") {
      pickDays = firebase.database().ref(`User2/${pickRef}`);
    } else {
      pickDays = firebase.database().ref(`User2/${dropRef}`);
    }

    let picksnap = {};
    for (const user of this.props.users) {
      picksnap = await pickDays
        .child(user.ID)
        .once("value");

      data.push({
        MemberName: user.Name,
        mon: picksnap.val().Monday,
        tue: picksnap.val().Tuesday,
        wed: picksnap.val().Wednesday,
        thrs: picksnap.val().thursday,
        fri: picksnap.val().Friday,
        sat: picksnap.val().Saturday,
        sun: picksnap.val().Sunday
      });
    }
    this.setState({ data: data });
  }


  onModalClick = () => {
    this.props.toggleSchedule();
  }

  handleTimeType = () => {
    let timeType = this.state.timeType;

    if (timeType === "PickUp") {
      timeType = "Drop";
    } else {
      timeType = "PickUp";
    }

    this.setState({ timeType });
    this.readData();
  }

  selecttimeType = () => {
    if (this.state.timeType === "PickUp") {
      return "Drop";
    } else {
      return "PickUp";
    }
  }

  render() {
    return (
      <div className="container">
        <Modal show={this.props.show} onHide={this.onModalClick}>
          <Modal.Header closeButton>
            <Modal.Title>
            {!this.props.timeLineInfo && <span> {this.selecttimeType()} Schedule for {this.props.users[0].GroupID} </span>}
            
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            
            {this.props.timeLineInfo && <h4> Group {this.props.users[0].GroupID} Transcribed Sucessfully! </h4>}

            {this.props.TDverified && (
              <div className="alert alert-info" role="alert">
                <h4> Group Verified Successfully! </h4>
              </div>
            )}

            {!this.props.timeLineInfo && <Table data={this.state.data} columns={this.columns} />
            }
          </Modal.Body>

          <Modal.Footer>
            { !this.props.timeLineInfo && <Button variant="primary" onClick={this.handleTimeType}>
              Show {this.state.timeType} Time
            </Button>}

            <Button variant="secondary" onClick={this.onModalClick}>
              Close
            </Button>
          </Modal.Footer>

        </Modal>
      </div>);
  }
}

export default InfoTable;