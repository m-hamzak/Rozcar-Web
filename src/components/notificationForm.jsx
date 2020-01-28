import React from "react";
import Joi from "joi-browser";
import Form from "./form";
// eslint-disable-next-line
import config from "./../config";
import firebase from "firebase/app";
import axios from 'axios';


class NotificationForm extends Form {
  state = {
    data: {
      notificationType: "none",
      text: "",
      title: "",
      ID: "",
      groupID: "",
      userID: "",
      selectedDriver: ""
    },
    driverString: "",
    errors: {},
    errorMessage: "",
    submitted: false,
    customNotification: false
  };


  componentDidMount = () => {
    if (this.props.calledFrom === "Geofence") {

      this.setState({
        customNotification: false, data: {
          notificationType: "none",
          text: "none",
          title: "none",
          ID: "",
          groupID: "",
          userID: "none",
          selectedDriver: "none"
        }
      });
    } else {
      this.setState({ customNotification: true });
    }
  }

  options = ["All Drivers",
    "Specific Drivers",
    "Manual Driver",
    "Customers",
    "Customer Group"];

  handleNotificationChange = ({ currentTarget: input }) => {
    let data = { ...this.state.data };

    if (input.value === "Specific Drivers" || input.value === "All Drivers" || input.value === "Customers") {

      data.groupID = "none";
      data.userID = "none";
      data.ID = "none";
    }

    if (input.value === "Customer Group") {
      data.ID = "none";
      data.userID = "none";
    }

    data.notificationType = input.value;
    this.setState({ data });
  }


  addDriver = () => {
    let driverString = this.state.driverString;
    if (this.state.driverString === "") {
      driverString = `${driverString}${this.state.data.selectedDriver}`;
    } else {
      driverString = `${driverString} ${this.state.data.selectedDriver}`;
    }
    let data = { ...this.state.data };
    data.selectedDriver = "";
    this.setState({ driverString, data });
  }



  //Schema for validation through joi-browser 
  schema = {
    notificationType: Joi.string().required().label("Notification Type"),
    text: Joi.string().required().label("Text"),
    title: Joi.string().required().label("Title"),
    ID: Joi.string().required().label("ID"),
    groupID: Joi.string().required().label("Group ID"),
    userID: Joi.string().required().label("User ID"),
    selectedDriver: Joi.label("Selected Drivers")
  };

  //Called after the handleSubmit function in the Form component
  doSubmit = async () => {

    if (this.props.calledFrom === "Geofence") {
      let data = {};
      data.ID = this.state.data.ID;
      data.groupID = this.state.data.groupID;
      //console.log(data);
      this.props.submit(data);
      return;
    }

    let err = await this.sendNotification();
    if (err) {
      console.log(err);
      //this.setState({ errorMessage: err });
      return;
    }
    this.setState({ submitted: true });
    console.log(this.state.data);
    this.setState({
      data: {
        notificationType: "none",
        text: "",
        title: "",
        ID: "",
        groupID: "",
        userID: ""
      }
    });
  };

  sendNotification = async () => {
    let data = { ...this.state.data };
    let tokens = [];

    if (data.notificationType === "Specific Drivers") {
      let splitted = this.state.driverString.split(" ");
      for (let str of splitted) {
        console.log(str);
        let caps = [];
        let captainRef = await firebase.database()
          .ref(`Driver2/Captain`)
          .orderByChild("ID")
          .equalTo(str)
          .once("value");


        if (captainRef) {
          captainRef.forEach(cap => {
            caps.push(cap.ref.path.pieces_[2]);
          });
          console.log(caps);
          for (let capref of caps) {
            //console.log("HERE");
            let driverRef = await firebase.database().ref(`Driver2/DeviceToken/${capref}`).once("value");
            //console.log("HERE");
            tokens.push(driverRef.val().Token);
          }
        } else {
          return `Invalid Captain ID ${str}`;
        }
      }
    }


    if (data.notificationType === "All Drivers") {
      let driverRef = await firebase.database().ref("Driver2/DeviceToken").once("value");

      driverRef.forEach(driver => {
        tokens.push(driver.val().Token);
      });
    }

    if (data.notificationType === "Customers") {
      let customerRef = await firebase.database().ref("User2/DeviceToken").once("value");

      customerRef.forEach(customer => {
        tokens.push(customer.val().Token);
      });
    }


    if (data.notificationType === "Customer Group") {
      let groupRef = await firebase.database().ref(`User2/Groups/${data.groupID}/Members`).once("value");
      let groups = [];

      groupRef.forEach(ref => {
        groups.push(ref.val());
      });

      if (groups) {
        for (let group of groups) {
          let Ref = await firebase.database().ref(`User2/DeviceToken/${group}`).once("value");

          tokens.push(Ref.val().Token);
        }
      } else {
        return "No group found."
      }
    }

    if (data.notificationType === "Manual Driver") {
      let captainRef = await firebase.database()
        .ref(`Driver2/Captain`)
        .orderByChild("ID")
        .equalTo(data.ID)
        .once("value");

      let caps = [];

      captainRef.forEach(capref => {
        caps.push(capref.ref.path.pieces_[2]);
      });

      if (caps) {

        for (let captain of caps) {
          let driverRef = await firebase.database().ref(`Driver2/DeviceToken/${captain}`).once("value");

          tokens.push(driverRef.val().Token);
        }
      }
      else {
        return "No Driver Found.";
      }
    }

    for (let token of tokens) {
      //console.log("Notification sent to", marker.token);
      let title = data.title;
      let text = data.text;
      delete data.title;
      delete data.text;
      delete data.notificationType;

      let promise = await axios({
        method: "post",
        url: "https://fcm.googleapis.com/fcm/send",
        headers: {
          "content-type": "application/json",
          authorization: "key = AIzaSyDQLasb2SH_0lU1M_DU6oG7Kgyl5rnX6JI"
        },
        data: {
          to: `${token}`,
          notification: {
            title: `${title}`,
            text: `${text}`,
            click_action: "Acceptance"
          },
          data: data
        }
      }).catch(err => console.log(err));
      console.log(promise);
    }
  }

  render() {
    const { data, errors } = this.state;
    //console.log(this.props.calledFrom)
    return (
      <div className="container">
        <div className="row">
          {this.state.errorMessage && (
            <div className="alert alert-warning" role="alert">
              <h4> {this.state.errorMessage} </h4>
            </div>
          )}

          {this.state.submitted && (
            <div className="alert alert-info col-12" role="alert">
              <h4>Submitted Successfully!</h4>
            </div>
          )}

          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            {this.state.customNotification &&
              <div>
                <select
                  onChange={this.handleNotificationChange}
                  value={data.notificationType}
                  name="NotificationType"
                  className="form-control mb-3"
                >
                  <option value="None">None</option>
                  {this.options.map(optionType => (
                    <option value={optionType} key={optionType}>
                      {optionType}
                    </option>
                  ))}
                </select>
                {errors.notificationType && (
                  <div className="alert alert-danger">
                    {errors.notificationType}
                  </div>
                )}

                <div className="input-group pb-3">
                  <div className="col-6">
                    <label htmlFor="title">Title:</label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      placeholder="title"
                      value={data.title}
                      onChange={this.handleChange}
                      className="form-control"
                    />
                    {errors.title && (
                      <div className="alert alert-danger">
                        {errors.title}
                      </div>
                    )}
                  </div>

                  <div className="col-6">
                    <label htmlFor="text">Text:</label>
                    <input
                      type="text"
                      name="text"
                      id="text"
                      placeholder="text"
                      value={data.text}
                      onChange={this.handleChange}
                      className="form-control"
                    />
                    {errors.text && (
                      <div className="alert alert-danger">
                        {errors.text}
                      </div>
                    )}
                  </div>
                </div>


                {data.notificationType === "Specific Drivers" && <div className="input-group pb-3">
                  <div className="col-6">
                    <label htmlFor="selectedDriver">Drivers:</label>
                    <input
                      type="text"
                      name="selectedDriver"
                      id="selectedDriver"
                      placeholder="Driver ID"
                      value={data.selectedDriver}
                      onChange={this.handleChange}
                      className="form-control"
                    />
                    {errors.selectedDriver && (
                      <div className="alert alert-danger">
                        {errors.selectedDriver}
                      </div>
                    )}
                  </div>

                  <div className="col-6">
                    <button onClick={this.addDriver} className="btn btn-secondary mt-4 btn-sm" type="button">Add Driver</button>
                  </div>
                </div>
                }
              </div>
            }
            <div className="input-group pb-3">
              {
                (!this.state.customNotification || data.notificationType === "Manual Driver")

                && <div className="col-6">
                  <label htmlFor="ID">ID:</label>
                  <input
                    type="text"
                    name="ID"
                    id="ID"
                    placeholder="ID"
                    value={data.ID}
                    onChange={this.handleChange}
                    className="form-control"
                  />
                  {errors.ID && (
                    <div className="alert alert-danger">
                      {errors.ID}
                    </div>
                  )}
                </div>
              }

              {
                (!this.state.customNotification || data.notificationType === "Manual Driver" || data.notificationType === "Customer Group")
                &&
                <div className="col-6">
                  <label htmlFor="groupID">groupID:</label>
                  <input
                    type="text"
                    name="groupID"
                    id="groupID"
                    placeholder="RC0000"
                    value={data.groupID}
                    onChange={this.handleChange}
                    className="form-control"
                  />
                  {errors.groupID && (
                    <div className="alert alert-danger">
                      {errors.groupID}
                    </div>
                  )}
                </div>
              }
            </div>

            <div className="input-group pb-3">
              {data.notificationType === "Manual Driver" &&
                <div className="col-6">
                  <label htmlFor="userID">User ID:</label>
                  <input
                    type="text"
                    name="userID"
                    id="userID"
                    placeholder="User ID"
                    value={data.userID}
                    onChange={this.handleChange}
                    className="form-control"
                  />
                  {errors.userID && (
                    <div className="alert alert-danger">
                      {errors.userID}
                    </div>
                  )}
                </div>}


              <div className={data.notificationType === "Manual Driver" ? "col-6 pt-4" : "col-6 pt-2 float-right"}>
                {this.renderButton("Send Notification")}
              </div>

            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default NotificationForm;
