import React, { Component } from "react";
import MapContainer from "./map";
import SearchBar from "./searchBar";
import MapKeys from "./mapKeys";
// eslint-disable-next-line
import config from "./../config";
// eslint-disable-next-line
import firebase from "firebase/app";
import "firebase/database";
import { Button, Modal } from "react-bootstrap";
import isInside from "point-in-polygon";
import axios from "axios";
import NotificationForm from './notificationForm';
import { Redirect } from "react-router-dom";
import { CSVLink } from "react-csv";


class MapInfo extends Component {
  state = {
    searchQuery: "",
    //possible colors of circles and statuses
    data: [
      { color: "blue", status: "Picked Up", clicked: false },
      { color: "red", status: "Accepted", clicked: false },
      { color: "green", status: "Available", clicked: false },
      { color: "yellow", status: "Busy", clicked: false },
      { color: "purple", status: "Offline", clicked: false },
      { color: "grey", status: "All", clicked: false }
    ],
    markers: [],
    center: { lat: 0, lng: 0 },
    triangleCoords: [],
    searchedUsers: [{ name: "Search for Results.", profilePicture: "123" }],
    modalBtn: false,
    submitted: false,
    showForm: false,
    calledFrom: ""
  };


  mapClicked = (mapProps, map, clickEvent) => {
    //add the coordinates of the recently clicked marker to the trianleCoords array
    const triangleCoords = [...this.state.triangleCoords];
    triangleCoords.push({
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng()
    });
    this.setState({ triangleCoords });
  };


  handleClick = colorInfo => {
    //toggles the clicked field of the respective object in the data array for now.
    this.filterMarkers({ color: colorInfo.color, status: colorInfo.status });
    const data = [...this.state.data];
    const index = data.indexOf(colorInfo);
    data[index] = { ...data[index] };
    data[index].clicked = !data[index].clicked;
    //console.log(data[index]);
    this.setState({ data });
  };


  //check the status for a marker
  checkStatus = (status) => {
    //console.log(status);
    if (status.isBlue) {
      return "Picked Up";
    }

    if (status.isRed) {
      return "Accepted";
    }

    if (status.isGreen) {
      return "Available";
    }

    if (status.isYellow) {
      return "Busy";
    }

    if (status.isPurple) {
      return "Offline";
    }
  }

  filterMarkers = (key) => {
    const currentComp = this;
    let keyVal = `is${key.color[0].toUpperCase()}${key.color.slice(1)}`;
    const markers = [];
    const locationRef = firebase.database().ref("Driver2/Location");
    const tokenRef = firebase.database().ref("Driver2/DeviceToken");
    const captianRef = firebase.database().ref("Driver2/Captain");
    //reads the location and status of each captain
    locationRef.on("value", function (snapshot) {
      snapshot.forEach(function (snap) {
        console.log("ALLMAP VALUES")
        if (key.status === "All" || snap.val().Status[keyVal]) {
          let marker = {};
          marker.lat = snap.val().Latitude;
          marker.lng = snap.val().Longitude;

          if (snap.val().Status)
            marker.status = currentComp.checkStatus(snap.val().Status);

          //console.log(snap.val().CaptainID, snap.val().Status);

          //read token for each captain and then read info about the captain.
          console.log("key",snap.key);
          if (snap.key) {
            tokenRef
              .orderByChild("UserID")
              .equalTo(snap.key)
              .on("value", tokens => {
                tokens.forEach(token => {
                  marker.token = token.val().Token;
                });
              });

            captianRef.child(snap.key).on("value", function (capsnap) {
              marker.capname = capsnap.val().name;
              marker.capnum = capsnap.val().phone;
              marker.email = capsnap.val().email;
              marker.capID = capsnap.val().ID;
              marker.capcnic = capsnap.val().cnicNo;
              //console.log(marker);
              markers.push(marker);
              currentComp.setState({ markers: markers });
              currentComp.selectCenter(markers);

            });
          }
        }
      });
    });
  }

  componentDidMount = () => {
    this.filterMarkers({ color: "grey", status: "All" });
  };


  handleSearch = query => {
    this.setState({ searchQuery: query });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const searchQuery = [this.state.searchQuery];
    const captainRef = firebase.database().ref("Driver2/Captain");
    let refs = {};
    let searchedUsers = [];

    if (String(searchQuery).match(/^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/)) {
      refs = await captainRef
        .orderByChild("cnicNo")
        .equalTo(String(searchQuery))
        .once("value");
    }

    if (String(searchQuery).match(/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/)) {
      refs = await captainRef
        .orderByChild("phone")
        .equalTo(String(searchQuery))
        .once("value");
    }

    if (String(searchQuery).match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/)) {
      refs = await captainRef
        .orderByChild("email")
        .equalTo(String(searchQuery))
        .once("value");
    }

    if (String(searchQuery).match(/^[A-Za-z ]+$/)) {
      //console.log("is name");
      refs = await captainRef
        .orderByChild("name")
        .equalTo(String(searchQuery))
        .once("value");
    }


    if (refs.ref_) {
      refs.forEach(captain => {
        searchedUsers.push(captain.val());
      });
    }


    if (searchedUsers.length === 0) {
      searchedUsers = [];
      searchedUsers.push({ name: "No results found.", profilePicture: "abc" });
    }

    this.setState({ searchQuery: "", searchedUsers });
  };


  selectCenter = (points) => {
    let totalpoints = points.length;
    let latsum = 0, lngsum = 0;
    points.forEach(point => {
      latsum = latsum + point.lat;
      lngsum = lngsum + point.lng;
    });
    let center = { ...this.state.center };
    center.lat = latsum / totalpoints;
    center.lng = lngsum / totalpoints;
    this.setState({ center });
  }


  doneCoords = () => {
    //Decides if a marker is inside the polygon and sends push notification to the captain who is available
    let modalBtn = !this.state.modalBtn;
    this.setState({ modalBtn, calledFrom: "Geofence" });
  }

  customNotificationClick = () => {
    let modalBtn = true;
    this.setState({ modalBtn, calledFrom: "CustomNotification", showForm: true });
  }

  sendNotification = async (notificationData) => {
    let polygon = [];
    console.log(notificationData);
    const triangleCoords = [...this.state.triangleCoords];
    triangleCoords.forEach(function (coord) {
      let cord = [];
      cord.push(coord.lat);
      cord.push(coord.lng);
      polygon.push(cord);
    });
    let markers = [...this.state.markers];
    for (const marker of markers) {
      let isMarkerInside = isInside([marker.lat, marker.lng], polygon);

      if (isMarkerInside && marker.token) {
        //console.log("Notification sent to", marker.token);
        let promise = await axios({
          method: "post",
          url: "https://fcm.googleapis.com/fcm/send",
          headers: {
            "content-type": "application/json",
            authorization: "key = AIzaSyDQLasb2SH_0lU1M_DU6oG7Kgyl5rnX6JI"
          },
          data: {
            to: `${marker.token}`,
            notification: {
              title: "Hello",
              text: "Your Message",
              click_action: "Acceptance"
            },
            data: notificationData
          }
        }).catch(err => console.log(err));
        console.log(promise);
        this.setState({ submitted: true });
      }
    }
  }

  resetCoords = () => {
    let triangleCoords = [];
    this.setState({ triangleCoords });
  }

  onModalClick = () => {
    let modalBtn = !this.state.modalBtn;
    let submitted = false;
    let showForm = false;
    this.setState({ modalBtn, submitted, showForm });
  }

  checkprofilePicture = (user) => {
    if (user.profilePicture === "123" || user.profilePicture === "abc") {
      return false;
    } else {
      return true;
    }
  }

  openForm = () => {
    this.setState({ showForm: true });
  }

  createCSV = () => {
    const markers = [...this.state.markers];
    let data = [
      ["CaptainID", "CNIC", "PhoneNumber", "Email"]
    ];

    let polygon = [];
    const triangleCoords = [...this.state.triangleCoords];
    triangleCoords.forEach(function (coord) {
      let cord = [];
      cord.push(coord.lat);
      cord.push(coord.lng);
      polygon.push(cord);
    });

    for (let marker of markers) {
      let isMarkerInside = isInside([marker.lat, marker.lng], polygon);

      if (isMarkerInside && marker.token) {
        data.push([marker.capID,
        marker.capcnic,
        marker.capnum,
        marker.email]);
      }
    }
    //console.log(data);
    return data;
  }

  selectModalBody = () => {
    if (this.state.showForm) {
      return (<NotificationForm calledFrom={this.state.calledFrom} submit={this.sendNotification} />)
    } else {
      const data = this.createCSV();
      return (<div><button onClick={this.openForm} className="btn btn-primary mr-2">Send Notification</button>

        <CSVLink className="btn btn-secondary" data={data}>Download CSV</CSVLink></div>)
    }
  }

  checkAuth = () => {
    if (localStorage.getItem("token")) {
      let modalHeaderText = this.state.showForm ? "Send Notification." : "Select Contact Method.";
      if (this.state.markers) {
        return (
          <div className="container">
            <Modal show={this.state.modalBtn} onHide={this.onModalClick}>
              <Modal.Header closeButton>
                <Modal.Title>{modalHeaderText}</Modal.Title>

                {this.state.submitted && (
                  <div className="alert alert-info" role="alert">
                    <h4> Notification Sent! </h4>
                  </div>
                )}

              </Modal.Header>
              <Modal.Body>
                {this.selectModalBody()}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.onModalClick}>
                  Close
            </Button>
              </Modal.Footer>
            </Modal>

            <div className="row" style={{ width: "50%", margin: "25px auto" }}>
              <form onSubmit={this.handleSubmit} className="form-horizontal">
                <div className="input-group">
                  <SearchBar
                    value={this.state.searchQuery}
                    onChange={this.handleSearch}
                  />
                  <input
                    type="submit"
                    value="Search"
                    className="btn btn-primary mr-2"
                    id="button"
                    style={{ height: "38px" }}
                  />
                  <button onClick={this.customNotificationClick} type="button" className="btn btn-secondary mb-2">Send Notifications</button>
                </div>
              </form>
            </div>

            <div className="row">
              <div className="col-md-4 col-lg-4 mt-5">
                <div className="row">
                  <div className="col-md-12 col-lg-12">
                    {this.state.searchedUsers.map(user =>
                      <div className="card mb-2" key={user.profilePicture}>
                        <div className="card-body" key={user.profilePicture}>

                          {this.checkprofilePicture(user) && <div id="profile-container" alt="Profile image" ><img src={user.profilePicture} alt="Profile" /></div>}
                          <p>{user.name}</p>
                          <p>{user.phone}</p>
                          <p>{user.email}</p>
                          <p>{user.cnicNo}</p>
                        </div>

                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="ml-3 mt-5 mb-3">
                <div className="row mb-5">
                  <div className="card col-md-10 col-lg-10">
                    <MapKeys onclick={this.handleClick} data={this.state.data} />
                  </div>
                  <div className="col-md-1 col-lg-1 mt-5">
                    <button onClick={this.doneCoords} className="btn btn-primary btn-sm removeDecor clickable">Done</button>
                  </div>

                  <div className="col-md-1 col-lg-1 mt-5">
                    <button onClick={this.resetCoords} className="btn btn-primary btn-sm removeDecor clickable">Reset</button>
                  </div>
                </div>
                <div className="mb-5">
                  <MapContainer triangleCoords={this.state.triangleCoords} mapClicked={this.mapClicked} center={this.state.center} markers={this.state.markers} />
                </div>
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

export default MapInfo;
