import React from "react";
import Joi from "joi-browser";
import Form from "./form";
// eslint-disable-next-line
import firebase from "firebase/app";
import "firebase/auth";
import moment from "moment";
// eslint-disable-next-line
import config from "./../config";


class TimeDistance extends Form {
  state = {
    data: {
      totalTime: "",
      totalDistance: "",
      t1: "",
      d1: "",
      t2: "",
      d2: "",
      t3: "",
      d3: "",
      t4: "",
      d4: "",
      t5: "",
      d5: "",
      t6: "",
      d6: "",
      t7: "",
      d7: ""
    },

    errors: {},
    errorMessage: "",
    submitUp: false,
    submitDown: false,
    submitted: false
  };


  componentDidMount = () => {
    this.checkFlag();
  }


  componentDidUpdate(prevProps) {
    if (prevProps.flag.up !== this.props.flag.up) {
      this.checkFlag();
    }
  }


  checkFlag = () => {
    if (this.props.flag.up) {
      this.setState({
        data: {
          totalTime: "",
          totalDistance: "",
          t1: "",
          d1: "",
          t2: "",
          d2: "",
          t3: "",
          d3: "",
          t4: "0",
          d4: "0",
          t5: "0",
          d5: "0",
          t6: "0",
          d6: "0",
          t7: "0",
          d7: "0"
        },
        submitted: false
      });
    }

    if (this.props.flag.down) {
      this.setState({
        data: {
          totalTime: "0",
          totalDistance: "0",
          t1: "0",
          d1: "0",
          t2: "0",
          d2: "0",
          t3: "0",
          d3: "0",
          t4: "",
          d4: "",
          t5: "",
          d5: "",
          t6: "",
          d6: "",
          t7: "",
          d7: ""
        },
        submitted: false
      });
    }
  }


  schema = {
    totalTime: Joi.number()
      .integer()
      .required()
      .label("Total Time"),
    totalDistance: Joi.number()
      .integer()
      .required()
      .label("Total Distance"),
    t1: Joi.number()
      .integer()
      .required()
      .label("Time 1"),
    d1: Joi.number()
      .integer()
      .required()
      .label("Distance 1"),
    t2: Joi.number()
      .integer().required().label("Time 2"),
    d2: Joi.number()
      .integer().required().label("Distance 2"),
    t3: Joi.number()
      .integer().required().label("Time 3"),
    d3: Joi.number()
      .integer().required().label("Distance 3"),
    t4: Joi.number()
      .integer().required().label("Time 4"),
    d4: Joi.number()
      .integer()
      .required()
      .label("Distance 4"),
    t5: Joi.number()
      .integer().required().label("Time 5"),
    d5: Joi.number()
      .integer().required().label("Distance 5"),
    t6: Joi.number()
      .integer().required().label("Time 6"),
    d6: Joi.number()
      .integer().required().label("Distance 6"),
    t7: Joi.number()
      .integer().required().label("Time 7"),
    d7: Joi.number()
      .integer()
      .required()
      .label("Distance 7")
  };


  doSubmit = async () => {
    //console.log(this.state.data);
    const { data } = this.state;
    let weeklyTime = [];
    let sm = 10, sm1 = 10, wt = 8;
    const GroupRef = await firebase.database().ref(`User2/Groups/${this.props.groupID}/Members`).once("value");

    if (this.props.flag.up) {

      for (let user of this.props.users) {
        const timeRef = await firebase.database().ref(`User2/PickDays/${user.ID}`).once("value");

        weeklyTime.push(timeRef.val());
      }

      let PtWeek = [
        { day: "Monday", pt1: "", pt2: "", pt3: "", pt4: "" },

        { day: "Tuesday", pt1: "", pt2: "", pt3: "", pt4: "" },

        { day: "Wednesday", pt1: "", pt2: "", pt3: "", pt4: "" },

        { day: "thursday", pt1: "", pt2: "", pt3: "", pt4: "" },

        { day: "Friday", pt1: "", pt2: "", pt3: "", pt4: "" },

        { day: "Saturday", pt1: "", pt2: "", pt3: "", pt4: "" },

        { day: "Sunday", pt1: "", pt2: "", pt3: "", pt4: "" }];

      let min = this.minTime(weeklyTime);

      for (let Day of PtWeek) {
        if (min[Day.day] !== "") {
          Day.pt1 = moment(min[Day.day], "LT").subtract(data.totalTime + sm + 3 * sm1, "minutes");
          Day.pt2 = moment(Day.pt1, "LT").add(wt + Number(data.t1), "minutes");
          Day.pt3 = moment(Day.pt2, "LT").add(wt + Number(data.t2), "minutes");
          Day.pt4 = moment(Day.pt3, "LT").add(wt + Number(data.t3), "minutes");

          Day.pt1 = this.convertTo12hr(Day.pt1);
          Day.pt2 = this.convertTo12hr(Day.pt2);
          Day.pt3 = this.convertTo12hr(Day.pt3);
          Day.pt4 = this.convertTo12hr(Day.pt4);
        }

        let pid = "pt", i = 1;
        GroupRef.forEach(groupData => {
          firebase.database().ref(`User2/NewPickDays/${groupData.val()}`).child(Day.day).set(Day[`${pid}${i}`]);
          i++;
        });

      }
      console.log(PtWeek);
      this.setState({ submitUp: true });
    }


    if (this.props.flag.down) {

      for (let user of this.props.users) {
        const timeRefDrop = await firebase.database().ref(`User2/DropDays/${user.ID}`).once("value");

        weeklyTime.push(timeRefDrop.val());
      }

      let PtWeek = [
        { day: "Monday", dt1: "", dt2: "", dt3: "", dt4: "" },

        { day: "Tuesday", dt1: "", dt2: "", dt3: "", dt4: "" },

        { day: "Wednesday", dt1: "", dt2: "", dt3: "", dt4: "" },

        { day: "thursday", dt1: "", dt2: "", dt3: "", dt4: "" },

        { day: "Friday", dt1: "", dt2: "", dt3: "", dt4: "" },

        { day: "Saturday", dt1: "", dt2: "", dt3: "", dt4: "" },

        { day: "Sunday", dt1: "", dt2: "", dt3: "", dt4: "" }];

      let max = this.maxTime(weeklyTime);
      for (let Day of PtWeek) {
        if (max[Day.day] !== "") {
          Day.dt1 = moment(max[Day.day], "LT").subtract(sm1, "minutes");
          Day.dt2 = moment(Day.dt1, "LT").add(wt + Number(data.t5), "minutes");
          Day.dt3 = moment(Day.dt2, "LT").add(wt + Number(data.t6), "minutes");
          Day.dt4 = moment(Day.dt3, "LT").add(wt + Number(data.t7), "minutes");

          Day.dt1 = this.convertTo12hr(Day.dt1);
          Day.dt2 = this.convertTo12hr(Day.dt2);
          Day.dt3 = this.convertTo12hr(Day.dt3);
          Day.dt4 = this.convertTo12hr(Day.dt4);
        }
        let did = "dt", i = 1;
        GroupRef.forEach(groupData => {
          firebase.database().ref(`User2/NewDropDays/${groupData.val()}`).child(Day.day).set(Day[`${did}${i}`]);
          i++;
        });

      }
      console.log(PtWeek);
      this.setState({ submitDown: true });
    }

    this.setState({ errorMessage: "" });
    this.setState({
      data: {
        totalTime: "",
        totalDistance: "",
        t1: "",
        d1: "",
        t2: "",
        d2: "",
        t3: "",
        d3: "",
        t4: "",
        d4: "",
        t5: "",
        d5: "",
        t6: "",
        d6: "",
        t7: "",
        d7: ""
      },

      submitted: true,
      errorMessage: ""
    });
  }


  verify = async () => {
    //get the group with the current group ID
    const groups = await firebase.database().ref("User2/IDsList").orderByChild("ID")
      .equalTo(this.props.groupID).once("value");

    //set islocked to false  
    groups.forEach(group => {
      firebase.database().ref(`User2/IDsList/${group.ref.path.pieces_[2]}`).child("isLocked").set(false);

      firebase.database().ref(`User2/IDsList/${group.ref.path.pieces_[2]}`).child("Verified").set(true);
    });
    this.props.openDTverified();
  }


  convertTo12hr = (date) => {
    return date.toDate().toLocaleTimeString({},
      { hour12: true, hour: 'numeric', minute: 'numeric' });
  }

  minTime = (timeArr) => {
    let min = { Monday: timeArr[0].Monday, Tuesday: timeArr[0].Tuesday, Wednesday: timeArr[0].Wednesday, thursday: timeArr[0].thursday, Friday: timeArr[0].Friday, Saturday: timeArr[0].Saturday, Sunday: timeArr[0].Sunday };

    for (let time of timeArr) {
      if (time.Monday !== "")
        min.Monday = moment.min(moment(time.Monday, "LT"), moment(min.Monday, "LT"));

      if (time.Tuesday !== "")
        min.Tuesday = moment.min(moment(time.Tuesday, "LT"), moment(min.Tuesday, "LT"));

      if (time.Wednesday !== "")
        min.Wednesday = moment.min(moment(time.Wednesday, "LT"), moment(min.Wednesday, "LT"));

      if (time.thursday !== "")
        min.thursday = moment.min(moment(time.thursday, "LT"), moment(min.thursday, "LT"));

      if (time.Friday !== "")
        min.Friday = moment.min(moment(time.Friday, "LT"), moment(min.Friday, "LT"));

      if (time.Saturday !== "")
        min.Saturday = moment.min(moment(time.Saturday, "LT"), moment(min.Saturday, "LT"));

      if (time.Sunday !== "")
        min.Sunday = moment.min(moment(time.Sunday, "LT"), moment(min.Sunday, "LT"));
    }
    return min;
  }


  maxTime = (timeArr) => {
    let max = { Monday: timeArr[0].Monday, Tuesday: timeArr[0].Tuesday, Wednesday: timeArr[0].Wednesday, thursday: timeArr[0].thursday, Friday: timeArr[0].Friday, Saturday: timeArr[0].Saturday, Sunday: timeArr[0].Sunday };

    for (let time of timeArr) {
      if (time.Monday !== "")
        max.Monday = moment.max(moment(time.Monday, "LT"), moment(max.Monday, "LT"));

      if (time.Tuesday !== "")
        max.Tuesday = moment.max(moment(time.Tuesday, "LT"), moment(max.Tuesday, "LT"));

      if (time.Wednesday !== "")
        max.Wednesday = moment.max(moment(time.Wednesday, "LT"), moment(max.Wednesday, "LT"));

      if (time.thursday !== "")
        max.thursday = moment.max(moment(time.thursday, "LT"), moment(max.thursday, "LT"));

      if (time.Friday !== "")
        max.Friday = moment.max(moment(time.Friday, "LT"), moment(max.Friday, "LT"));

      if (time.Saturday !== "")
        max.Saturday = moment.max(moment(time.Saturday, "LT"), moment(max.Saturday, "LT"));

      if (time.Sunday !== "")
        max.Sunday = moment.max(moment(time.Sunday, "LT"), moment(max.Sunday, "LT"));
    }
    return max;
  }


  render() {

    const { data, errors } = this.state;
    const distanceError = "Distance should be a number.";
    const timeError = "Time should be a number."
    return (
      <div>
        {this.state.errorMessage && (
          <div className="alert alert-warning" role="alert">
            <h4> {this.state.errorMessage} </h4>
          </div>
        )}

        {this.state.submitted && (
          <div className="alert alert-info" role="alert">
            <h4> Time and Durations Submitted Successfully! </h4>
          </div>
        )}
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          {this.props.flag.up &&
            <div>
              {/* {this.checkFlag()} */}
              <h3>Pick Up</h3>
              <div className="input-group pb-3">
                <div className="col-2">
                  <h6>Total</h6>
                </div>
                <div className="col-5">
                  <input
                    type="text"
                    required
                    name="totalTime"
                    id="totalTime"
                    placeholder="60 (In mins)"
                    value={data.totalTime}
                    onChange={this.handleChange}
                    className="form-control"
                  />
                  {errors.totalTime && (
                    <div className="alert alert-danger">
                      {timeError}
                    </div>
                  )}
                </div>

                <div className="col-5">
                  <input
                    type="text"
                    name="totalDistance"
                    required
                    id="totalDistance"
                    placeholder="50 (In meters)"
                    value={data.totalDistance}
                    onChange={this.handleChange}
                    className="form-control"
                  />
                  {errors.totalDistance && (
                    <div className="alert alert-danger">
                      {distanceError}
                    </div>
                  )}
                </div>
              </div>

              <div className="input-group pb-3">

                <div className="col-2">
                  <h6>M1-M2</h6>
                </div>

                <div className="col-5">
                  <input
                    type="text"
                    name="t1"
                    required
                    id="t1"
                    placeholder="60 (In mins)"
                    value={data.t1}
                    onChange={this.handleChange}
                    className="form-control"
                  />
                  {errors.t1 && (
                    <div className="alert alert-danger">
                      {timeError}
                    </div>
                  )}
                </div>

                <div className="col-5">
                  <input
                    type="text"
                    name="d1"
                    required
                    id="d1"
                    placeholder="50 (In meters)"
                    value={data.d1}
                    onChange={this.handleChange}
                    className="form-control"
                  />
                  {errors.d1 && (
                    <div className="alert alert-danger">
                      {distanceError}
                    </div>
                  )}
                </div>
              </div>

              <div className="input-group pb-3">

                <div className="col-2">
                  <h6>M2-M3</h6>
                </div>

                <div className="col-5">
                  <input
                    type="text"
                    required
                    name="t2"
                    id="t2"
                    placeholder="60 (In mins)"
                    value={data.t2}
                    onChange={this.handleChange}
                    className="form-control"
                  />
                  {errors.t2 && (
                    <div className="alert alert-danger">{timeError}</div>
                  )}
                </div>

                <div className="col-5">
                  <input
                    type="text"
                    required
                    name="d2"
                    id="d2"
                    placeholder="50 (In meters)"
                    value={data.d2}
                    onChange={this.handleChange}
                    className="form-control"
                  />
                  {errors.d2 && (
                    <div className="alert alert-danger">{distanceError}</div>
                  )}
                </div>
              </div>

              <div className="input-group pb-3">
                <div className="col-2">
                  <h6>M3-M4</h6>
                </div>
                <div className="col-5">
                  <input
                    type="text"
                    required
                    name="t3"
                    id="t3"
                    placeholder="60 (In mins)"
                    value={data.t3}
                    onChange={this.handleChange}
                    className="form-control"
                  />
                  {errors.t3 && (
                    <div className="alert alert-danger">{timeError}</div>
                  )}
                </div>

                <div className="col-5">
                  <input
                    type="text"
                    name="d3"
                    id="d3"
                    required
                    placeholder="50 (In meters)"
                    value={data.d3}
                    onChange={this.handleChange}
                    className="form-control"
                  />
                  {errors.d3 && (
                    <div className="alert alert-danger">{distanceError}</div>
                  )}
                </div>
              </div>
            </div>
          }

          {this.props.flag.down &&
            <div>
              {/* {this.checkFlag()} */}
              <h3>Drop Off</h3>
              <div className="input-group pb-3">
                <div className="col-2">
                  <h6>Total</h6>
                </div>

                <div className="col-5">
                  <input
                    type="text"
                    required
                    name="t4"
                    id="t4"
                    placeholder="60 (In mins)"
                    value={data.t4}
                    onChange={this.handleChange}
                    className="form-control"
                  />
                  {errors.t4 && (
                    <div className="alert alert-danger">
                      {timeError}
                    </div>
                  )}
                </div>

                <div className="col-5">
                  <input
                    type="text"
                    name="d4"
                    required
                    id="d4"
                    placeholder="50 (In meters)"
                    value={data.d4}
                    onChange={this.handleChange}
                    className="form-control"
                  />
                  {errors.d4 && (
                    <div className="alert alert-danger">{distanceError}</div>
                  )}
                </div>
              </div>

              <div className="input-group pb-3">

                <div className="col-2">
                  <h6>M1-M2</h6>
                </div>

                <div className="col-5">
                  <input
                    type="text"
                    name="t5"
                    id="t5"
                    required
                    placeholder="60 (In mins)"
                    value={data.t5}
                    onChange={this.handleChange}
                    className="form-control"
                  />
                  {errors.t5 && (
                    <div className="alert alert-danger">{timeError}</div>
                  )}
                </div>

                <div className="col-5">
                  <input
                    type="text"
                    name="d5"
                    required
                    id="d5"
                    placeholder="50 (In meters)"
                    value={data.d5}
                    onChange={this.handleChange}
                    className="form-control"
                  />
                  {errors.d5 && (
                    <div className="alert alert-danger">{distanceError}</div>
                  )}
                </div>
              </div>

              <div className="input-group pb-3">

                <div className="col-2">
                  <h6>M2-M3</h6>
                </div>

                <div className="col-5">
                  <input
                    type="text"
                    name="t6"
                    required
                    id="t6"
                    placeholder="60 (In mins)"
                    value={data.t6}
                    onChange={this.handleChange}
                    className="form-control"
                  />
                  {errors.t6 && (
                    <div className="alert alert-danger">{timeError}</div>
                  )}
                </div>

                <div className="col-5">
                  <input
                    type="text"
                    name="d6"
                    id="d6"
                    required
                    placeholder="50 (In meters)"
                    value={data.d6}
                    onChange={this.handleChange}
                    className="form-control"
                  />
                  {errors.d6 && (
                    <div className="alert alert-danger">{distanceError}</div>
                  )}
                </div>
              </div>


              <div className="input-group pb-3">

                <div className="col-2">
                  <h6>M3-M4</h6>
                </div>

                <div className="col-5">
                  <input
                    type="text"
                    name="t7"
                    required
                    id="t7"
                    placeholder="60 (In mins)"
                    value={data.t7}
                    onChange={this.handleChange}
                    className="form-control"
                  />
                  {errors.t7 && (
                    <div className="alert alert-danger">{timeError}</div>
                  )}
                </div>

                <div className="col-5">
                  <input
                    type="text"
                    name="d7"
                    id="d7"
                    required
                    placeholder="50 (In meters)"
                    value={data.d7}
                    onChange={this.handleChange}
                    className="form-control"
                  />
                  {errors.d7 && (
                    <div className="alert alert-danger">{distanceError}</div>
                  )}
                </div>
              </div>
            </div>
          }
          <div className="col-12 mt-4">

            {this.renderButton("Submit")}
            {(this.state.submitUp && this.state.submitDown) && <button type="button" onClick={this.verify} className="btn btn-secondary ml-2">Verify</button>}
          </div>


        </form>
      </div>
    );
  }
}

export default TimeDistance;
