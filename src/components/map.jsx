import React, { Component } from "react";
import {
  Map,
  GoogleApiWrapper,
  InfoWindow,
  Marker,
  Polygon
} from "google-maps-react";
// eslint-disable-next-line
import config from "./../config";
// eslint-disable-next-line
import firebase from "firebase/app";
import "firebase/database";


export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  mapStyles = {
    position: "absolute",
    width: "100%",
    height: "100%"
  };

  infoStyles = {
    width: "100",
    height: "50"
  };


  info = true;


  componentDidCatch(error, info) {
    console.log(error, info);
  }


  //specified in the google-maps-react documentation
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  //specified in the google-maps-react documentation
  onClose = props => {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  };

  selectStatus = (status, google) => {
    //select the color of the marker based on the status of the captains.
    if (status === "Available") {
      return {
        url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
        anchor: new google.maps.Point(32, 32)
      };
    }

    if (status === "Accepted") {
      return {
        url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        anchor: new google.maps.Point(32, 32)
      };
    }

    if (status === "Picked Up") {
      return {
        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        anchor: new google.maps.Point(32, 32)
      };
    }


    if (status === "Busy") {
      return {
        url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
        anchor: new google.maps.Point(32, 32)
      };
    }

    if (status === "Offline") {
      return {
        url: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
        anchor: new google.maps.Point(32, 32)
      };
    }
  };

  //Everything below is specified in the google-maps-react documentation.
  render() {
    return (
      <div style={{ position: "absolute", height: "60%", width: "60%" }}>
        <Map
          google={this.props.google}
          zoom={14}
          style={this.mapStyles}
          initialCenter={{ lat: 24.814, lng: 67.129 }}
          onClick={this.props.mapClicked}
        >
          {this.props.markers.map(marker => (
            <Marker
              position={{ lat: marker.lat, lng: marker.lng }}
              key={marker.capnum}
              onClick={this.onMarkerClick}
              name={marker.capname}
              phone={marker.capnum}
              email={marker.email}
              icon={this.selectStatus(
                marker.status,
                this.props.google
              )}
            />
          ))}
          <Polygon
            paths={this.props.triangleCoords}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2}
            fillColor="#0000FF"
            fillOpacity={0.35}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
              <p>{this.state.selectedPlace.phone}</p>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }

}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBVlh1KMb4y5h9unK_pxFboguE3glpbKj4"
})(MapContainer);
