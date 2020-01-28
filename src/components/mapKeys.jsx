import React, { Component } from "react";
import "../index.css";

class MapKeys extends Component {
  state = {};

  render() {
    //props recieved from mapInfo.jsx
    const { data, onclick } = this.props;
    let property;
    //Circle for each data element using the map function in JS es6.
    return (
      <div className="row" style={{ paddingLeft: "15px" }}>
        {data.map(info => (
          <div key={info.color} className="col-md-2 col-lg-2" id="statusContainer">
            <div
              onClick={() => onclick(info)}
              className={property === info.clicked ? "selected" : "none"}
              id={`${info.color}Circle`}
            />
            <p className="status">{info.status}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default MapKeys;
