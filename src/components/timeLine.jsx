import React, { Component } from "react";
import TimeInstance from "./timeInstance";
// eslint-disable-next-line
import config from "./../config";
// eslint-disable-next-line
import firebase from "firebase/app";
import axios from "axios";
import "../index.css";

class TimeLine extends Component {
  state = {
    MemberData: {
      M1: "None",
      M2: "None",
      M3: "None",
      M4: "None",
      M5: "None",
      M6: "None",
      M7: "None",
      M8: "None"
    },

    //Array containing info about each link. Quards1 and quards2 are the latitudes and longitudes of the first and second member, respectively
    googleLinks: [
      { source: "M1", dest: "M2", quards1: "", quards2: "", distance: "", time: "" },
      { source: "M2", dest: "M3", quards1: "", quards2: "", distance: "", time: "" },
      { source: "M3", dest: "M4", quards1: "", quards2: "", distance: "", time: "" },
      { source: "M4", dest: "M5", quards1: "", quards2: "", distance: "", time: "" },
      { source: "M5", dest: "M6", quards1: "", quards2: "", distance: "", time: "" },
      { source: "M6", dest: "M7", quards1: "", quards2: "", distance: "", time: "" },
      { source: "M7", dest: "M8", quards1: "", quards2: "", distance: "", time: "" },
      { source: "M1", dest: "M1", quards1: "", quards2: "" },
      { source: "M8", dest: "M8", quards1: "", quards2: "" }
    ],

    //A link for the complete route
    mainLink: "https://www.google.com/maps/dir/"
  };


  tempState = {
    up: {},
    down: {}
  };

  //find the distance and time of the route and set it.
  setDistance = (link) => {
    axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${link.quards1}&destinations=${link.quards2}&key=`).then(res => console.log(res)).catch(err => console.log(err));
  }


  handleSubmit = async e => {
    e.preventDefault();
    const groupRef = firebase.database().ref("User2/Groups");
    const idListRef = firebase.database().ref("User2/IDsList");
    const userDailyRef = firebase.database().ref("User2/UserDaily");
    const userNameRef = firebase.database().ref("User2/UserInfo");
    let members = [];
    let membersRev = [];

    const users = [...this.props.users];
    let sameUser = [];
    let indexes = {};
    let sameUserRev = [];
    let indexesRev = {};


    for (let [key, value] of Object.entries(this.state.MemberData)) {
      members.push({ key: key, value: value });
    }
    //console.log(this.tempState);

    if (this.props.radioBtn.up) {

      for (let [key, value] of Object.entries(this.tempState.down.MemberData)) {
        membersRev.push({ key: key, value: value });
      }
    } else {
      for (let [key, value] of Object.entries(this.tempState.up.MemberData)) {
        membersRev.push({ key: key, value: value });
      }
    }

    users.forEach(user => {
      sameUser = members.filter(member => member.value === user.Name);
      sameUserRev = membersRev.filter(memberRev => memberRev.value === user.Name);

      if (sameUser) {
        indexes.first = members.indexOf(sameUser[0]);
        sameUser[0].ID = user.ID;
        sameUser[0].status = "Pick";
        members[indexes.first] = { ...sameUser[0] };

        if (sameUser[1]) {
          indexes.second = members.indexOf(sameUser[1]);
          sameUser[1].key = sameUser[0].key
          sameUser[1].ID = user.ID;
          sameUser[1].status = "Drop";
          members[indexes.second] = { ...sameUser[1] };
        }
      }


      if (sameUserRev) {
        indexesRev.first = membersRev.indexOf(sameUserRev[0]);
        sameUserRev[0].ID = user.ID;
        sameUserRev[0].status = "Pick";
        membersRev[indexesRev.first] = { ...sameUserRev[0] };

        if (sameUserRev[1]) {
          indexesRev.second = membersRev.indexOf(sameUserRev[1]);
          sameUserRev[1].key = sameUserRev[0].key
          sameUserRev[1].ID = user.ID;
          sameUserRev[1].status = "Drop";
          membersRev[indexesRev.second] = { ...sameUserRev[1] };
        }
      }
    });

    let counter = 1;
    for (let i = 0; i < members.length; i++) {
      if (!members[i].added && members[i].value !== "None") {
        members[i].key = `M${counter}`;
        members[i].added = true;
        let found = members.filter(member => member.ID === members[i].ID)[1];
        let index = members.indexOf(found);
        members[index].key = `M${counter}`;
        members[index].added = true;
        counter++;
      }
    }

    counter = 1;
    for (let i = 0; i < membersRev.length; i++) {
      if (!membersRev[i].added && membersRev[i].value !== "None") {
        membersRev[i].key = `M${counter}`;
        membersRev[i].added = true;
        let found = membersRev.filter(member => member.ID === membersRev[i].ID)[1];
        let index = membersRev.indexOf(found);
        membersRev[index].key = `M${counter}`;
        membersRev[index].added = true;
        counter++;
      }
    }


    //console.log(members);
    let Availability = {}, PickedUp = {}, Leadership = {}, Members = {}
    if (this.props.radioBtn.up) {

      groupRef.child(this.props.users[0].GroupID).child("Leader").set(members[0].ID);


      groupRef.child(this.props.users[0].GroupID).child("PickLeader").set(members[0].ID);

      let i = 1;
      users.forEach(user => {
        if (members[0].ID === user.ID) {
          userNameRef.child(user.ID).child("LeaderBool").set(true);
          userNameRef.child(user.ID).child("PickLeader").set(true);
        } else {
          userNameRef.child(user.ID).child("LeaderBool").set(false);
          userNameRef.child(user.ID).child("PickLeader").set(false);
        }

        if (membersRev[0].ID === user.ID) {
          userNameRef.child(user.ID).child("DropLeader").set(true);
        } else {
          userNameRef.child(user.ID).child("DropLeader").set(false);
        }

        Availability[`M${i}`] = true;
        PickedUp[`M${i}`] = false;
        Members[`M${i}`] = members.find(member => member.key === `M${i}`).ID

        userNameRef.child(Members[`M${i}`]).child("MemberNo").set(`M${i}`);


        Leadership[`M${i}`] = i === 1 ? true : false;
        i++;
      });

      groupRef.child(this.props.users[0].GroupID).child("Availability").set({ ...Availability });

      groupRef.child(this.props.users[0].GroupID).child("PickedUp").set({ ...PickedUp });

      groupRef.child(this.props.users[0].GroupID).child("Members").set({ ...Members });

      groupRef.child(this.props.users[0].GroupID).child("Leadership").set({ ...Leadership });


      let j = 1;
      for (i = 0; i < members.length; i++) {
        if (members[i].value !== "None") {
          groupRef.child(this.props.users[0].GroupID).child("PickRoute").child(`0${j}`).set({ ID: members[i].ID, Member: members[i].key, status: members[i].status });
          j++;
        }
      }

      userDailyRef.child(members[0].ID).set({ ID: members[0].ID, isBooked: false, round: 0 });

      const ids = await idListRef.orderByChild("ID")
        .equalTo(this.props.users[0].GroupID)
        .once("value");

      ids.forEach(id => {
        idListRef.child(id.ref.path.pieces_[2]).set({ ID: this.props.users[0].GroupID, Members: this.props.users.length, Verified: false, isLocked: true });
      });


      //console.log("submit up", this.state.MemberData);

      groupRef.child(this.props.users[0].GroupID).child("DropLeader").set(membersRev[0].ID);

      let MemberNumberList = []

      const MembersRef = await firebase.database().ref(`User2/Groups/${this.props.users[0].GroupID}/Members`).once("value");

      MembersRef.forEach(memberRef => {
        MemberNumberList.push({ number: memberRef.ref.path.pieces_[4], ID: memberRef.val() });
      });

      let k = 1;
      for (let i = 0; i < membersRev.length; i++) {
        if (membersRev[i].value !== "None") {

          let memberNumber = MemberNumberList.find(member => member.ID === membersRev[i].ID).number;

          groupRef.child(this.props.users[0].GroupID).child("DropRoute").child(`0${k}`).set({ ID: membersRev[i].ID, Member: memberNumber, status: membersRev[i].status });
          k++;
        }
      }

      this.props.users.forEach(user => {
        userNameRef.child(user.ID).child("Transcribed").set(true);
      });
      //console.log("submit down", this.state.MemberData);
    } else {

      groupRef.child(this.props.users[0].GroupID).child("Leader").set(membersRev[0].ID);

      groupRef.child(this.props.users[0].GroupID).child("PickLeader").set(membersRev[0].ID);


      let i = 1;
      users.forEach(user => {
        if (membersRev[0].ID === user.ID) {
          userNameRef.child(user.ID).child("LeaderBool").set(true);
          userNameRef.child(user.ID).child("PickLeader").set(true);
        } else {
          userNameRef.child(user.ID).child("LeaderBool").set(false);
          userNameRef.child(user.ID).child("PickLeader").set(false);
        }

        if (members[0].ID === user.ID) {
          userNameRef.child(user.ID).child("DropLeader").set(true);
        } else {
          userNameRef.child(user.ID).child("DropLeader").set(false);
        }

        Availability[`M${i}`] = true;
        PickedUp[`M${i}`] = false;
        Members[`M${i}`] = membersRev.find(member => member.key === `M${i}`).ID
        userNameRef.child(Members[`M${i}`]).child("MemberNo").set(`M${i}`);
        Leadership[`M${i}`] = i === 1 ? true : false;
        i++;
      });

      groupRef.child(this.props.users[0].GroupID).child("Availability").set({ ...Availability });

      groupRef.child(this.props.users[0].GroupID).child("PickedUp").set({ ...PickedUp });

      await groupRef.child(this.props.users[0].GroupID).child("Members").set({ ...Members });

      groupRef.child(this.props.users[0].GroupID).child("Leadership").set({ ...Leadership });

      let j = 1;
      for (i = 0; i < membersRev.length; i++) {
        if (membersRev[i].value !== "None") {
          groupRef.child(this.props.users[0].GroupID).child("PickRoute").child(`0${j}`).set({ ID: membersRev[i].ID, Member: membersRev[i].key, status: membersRev[i].status });
          j++;
        }
      }

      userDailyRef.child(membersRev[0].ID).set({ ID: membersRev[0].ID, isBooked: false, round: 0 });

      const ids = await idListRef.orderByChild("ID")
        .equalTo(this.props.users[0].GroupID)
        .once("value");

      ids.forEach(id => {
        idListRef.child(id.ref.path.pieces_[2]).set({ ID: this.props.users[0].GroupID, Members: this.props.users.length, Verified: false, isLocked: true });
      });


      //console.log("submit up", this.state.MemberData);

      groupRef.child(this.props.users[0].GroupID).child("DropLeader").set(members[0].ID);

      let MemberNumberList = []

      const MembersRef = await firebase.database().ref(`User2/Groups/${this.props.users[0].GroupID}/Members`).once("value");

      MembersRef.forEach(memberRef => {
        MemberNumberList.push({ number: memberRef.ref.path.pieces_[4], ID: memberRef.val() });
        //console.log(memberRef.ref.path.pieces_[4], memberRef.val());
      });


      let k = 1;
      for (let i = 0; i < members.length; i++) {
        if (members[i].value !== "None") {

          let memberNumber = MemberNumberList.find(member => member.ID === members[i].ID).number;
          //console.log(memberNumber, members[i].ID);
          groupRef.child(this.props.users[0].GroupID).child("DropRoute").child(`0${k}`).set({ ID: members[i].ID, Member: memberNumber, status: members[i].status });
          k++;
        }
      }
      this.props.users.forEach(user => {
        userNameRef.child(user.ID).child("Transcribed").set(true);
      });

    }
    this.props.openTimeLineInfo();

    this.setState({
      MemberData: {
        M1: "None",
        M2: "None",
        M3: "None",
        M4: "None",
        M5: "None",
        M6: "None",
        M7: "None",
        M8: "None"
      },

      //Array containing info about each link. Quards1 and quards2 are the latitudes and longitudes of the first and second member, respectively
      googleLinks: [
        { source: "M1", dest: "M2", quards1: "", quards2: "", distance: "", time: "" },
        { source: "M2", dest: "M3", quards1: "", quards2: "", distance: "", time: "" },
        { source: "M3", dest: "M4", quards1: "", quards2: "", distance: "", time: "" },
        { source: "M4", dest: "M5", quards1: "", quards2: "", distance: "", time: "" },
        { source: "M5", dest: "M6", quards1: "", quards2: "", distance: "", time: "" },
        { source: "M6", dest: "M7", quards1: "", quards2: "", distance: "", time: "" },
        { source: "M7", dest: "M8", quards1: "", quards2: "", distance: "", time: "" },
        { source: "M1", dest: "M1", quards1: "", quards2: "" },
        { source: "M8", dest: "M8", quards1: "", quards2: "" }
      ],

      //A link for the complete route
      mainLink: "https://www.google.com/maps/dir/"
    });
    this.tempState = {
      up: {},
      down: {}
    };
  };



  handleChange = async ({ currentTarget: input }) => {

    //Update the value of the select
    const MemberData = { ...this.state.MemberData };
    MemberData[input.name] = input.value;
    await this.setState({ MemberData });

    //Update each route containing the changed select

    //if someone is selected
    if (input.value !== "None") {
      let indexes = [];
      let googleLinks = [...this.state.googleLinks];

      //find user with the name given
      let user = this.props.users.find(user => user.Name === input.value);
      //convert the data object in the state into an array.
      let members = [];
      for (let [key, value] of Object.entries(this.state.MemberData)) {
        members.push({ key: key, value: value });
      }
      //get the person who has been selected (can occur twice that's why filtered)
      let samePerson = members.filter(member => member.value === input.value);

      //link in which person is to be picked and is source 
      let links1src = googleLinks.find(link => link.source === samePerson[0].key)

      //link in which person is to be picked and is destination
      let links1dest = googleLinks.find(link => link.dest === samePerson[0].key)

      //links for source and destination in which user is to be dropped.
      let links2src, links2dest;

      //if the person occurs a second time
      if (samePerson.length > 1) {
        links2src = googleLinks.find(link => link.source === samePerson[1].key)

        links2dest = googleLinks.find(link => link.dest === samePerson[1].key)
      }

      //get indexes of all four links for setting the state
      indexes.push(googleLinks.indexOf(links1src));
      indexes.push(googleLinks.indexOf(links1dest));
      indexes.push(googleLinks.indexOf(links2src));
      indexes.push(googleLinks.indexOf(links2dest));

      //pickup lat and lng for person
      const latlngpick = await firebase.database().ref(`User2/PickLocation/${user.ID}`).once("value");

      //dropoff lat and lng for person
      const latlngdrop = await firebase.database().ref(`User2/DropLocation/${user.ID}`).once("value");


      //If the route is for up.
      if (this.props.radioBtn.up) {
        //Setting quards in link in which person is to be picked and is source
        links1src.quards1 = `${latlngpick.val().Latitude},${latlngpick.val().Longitude}/`

        //Setting quards in link in which person is to be picked and is destination
        links1dest.quards2 = `${latlngpick.val().Latitude},${latlngpick.val().Longitude}`

      } else {

        links1src.quards1 = `${latlngdrop.val().Latitude},${latlngdrop.val().Longitude}/`

        //Setting quards in link in which person is to be picked and is destination
        links1dest.quards2 = `${latlngdrop.val().Latitude},${latlngdrop.val().Longitude}`

      }


      if (samePerson.length > 1) {

        if (this.props.radioBtn.up) {
          //Setting quards in link in which person is to be dropped and is source
          links2src.quards1 = `${latlngdrop.val().Latitude},${latlngdrop.val().Longitude}/`

          //Setting quards in link in which person is to be dropped and is destination
          links2dest.quards2 = `${latlngdrop.val().Latitude},${latlngdrop.val().Longitude}`

        }
        else {
          links2src.quards1 = `${latlngpick.val().Latitude},${latlngpick.val().Longitude}/`

          //Setting quards in link in which person is to be dropped and is destination
          links2dest.quards2 = `${latlngpick.val().Latitude},${latlngpick.val().Longitude}`
        }
        //set the respective links into their position
        googleLinks[indexes[2]] = links2src;
        googleLinks[indexes[3]] = links2dest;
      }

      //set the respective links into their position      
      googleLinks[indexes[0]] = links1src;
      googleLinks[indexes[1]] = links1dest;

      //Regenerate mainLink since users have been changed.
      let mainLink = "https://www.google.com/maps/dir/";
      let j = 0;
      googleLinks.forEach(googlelink => {

        if (googlelink.quards1 !== "" && googlelink.quards2 !== "" && googlelink.source !== "M8") {
          if (j === 0) {
            mainLink = `${mainLink}${googlelink.quards1}${googlelink.quards2}/`
          } else {
            mainLink = `${mainLink}${googlelink.quards2}/`;
          }
          j++;
        }
      });
      //console.log(mainLink, googleLinks);
      this.setState({ mainLink, googleLinks });
    }
  };



  handleRadio = ({ currentTarget: input }) => {

    if (this.props.radioBtn.up) {
      this.tempState.up = { ...this.state };
      if (this.tempState.down.MemberData) {
        this.setState({ ...this.tempState.down });
      } else {
        this.setState({
          MemberData: {
            M1: "None",
            M2: "None",
            M3: "None",
            M4: "None",
            M5: "None",
            M6: "None",
            M7: "None",
            M8: "None"
          },

          googleLinks: [
            { source: "M1", dest: "M2", quards1: "", quards2: "", distance: "", time: "" },
            { source: "M2", dest: "M3", quards1: "", quards2: "", distance: "", time: "" },
            { source: "M3", dest: "M4", quards1: "", quards2: "", distance: "", time: "" },
            { source: "M4", dest: "M5", quards1: "", quards2: "", distance: "", time: "" },
            { source: "M5", dest: "M6", quards1: "", quards2: "", distance: "", time: "" },
            { source: "M6", dest: "M7", quards1: "", quards2: "", distance: "", time: "" },
            { source: "M7", dest: "M8", quards1: "", quards2: "", distance: "", time: "" },
            { source: "M1", dest: "M1", quards1: "", quards2: "" },
            { source: "M8", dest: "M8", quards1: "", quards2: "" }
          ],

          mainLink: "https://www.google.com/maps/dir/"
        });

      }
    }

    if (this.props.radioBtn.down) {
      this.tempState.down = { ...this.state };
      if (this.tempState.up.MemberData) {
        this.setState({ ...this.tempState.up });
      } else {
        this.setState({
          MemberData: {
            M1: "None",
            M2: "None",
            M3: "None",
            M4: "None",
            M5: "None",
            M6: "None",
            M7: "None",
            M8: "None"
          },

          googleLinks: [
            { source: "M1", dest: "M2", quards1: "", quards2: "", distance: "", time: "" },
            { source: "M2", dest: "M3", quards1: "", quards2: "", distance: "", time: "" },
            { source: "M3", dest: "M4", quards1: "", quards2: "", distance: "", time: "" },
            { source: "M4", dest: "M5", quards1: "", quards2: "", distance: "", time: "" },
            { source: "M5", dest: "M6", quards1: "", quards2: "", distance: "", time: "" },
            { source: "M6", dest: "M7", quards1: "", quards2: "", distance: "", time: "" },
            { source: "M7", dest: "M8", quards1: "", quards2: "", distance: "", time: "" },
            { source: "M1", dest: "M1", quards1: "", quards2: "" },
            { source: "M8", dest: "M8", quards1: "", quards2: "" }
          ],

          mainLink: "https://www.google.com/maps/dir/"
        });
      }
    }
    this.props.radioChange(input.value);
  }


  render() {
    const { MemberData } = this.state;
    //get links except the last one.
    let googlelinks = this.state.googleLinks.filter(link => link.source !== link.dest);

    return (
      <form onSubmit={this.handleSubmit}>

        <span className="">
          <span className="mr-2">
            <input onChange={this.handleRadio} type="radio" id="routeChoice1"
              name="route" value="up" />
            <label htmlFor="routeChoice1">Up Route</label>
          </span>

          <span>
            <input onChange={this.handleRadio} type="radio" id="routeChoice2"
              name="route" value="down" />
            <label htmlFor="routeChoice2">Down Route</label>
          </span>
        </span>

        <section id="conference-timeline">
          <div className="timeline-start">Route</div>
          <div className="conference-center-line" />
          <div className="conference-timeline-content">

            {/*First 7 selects*/}

            {googlelinks.map(link => (
              <TimeInstance key={link.dest} users={this.props.users} googleLink={link} Member={MemberData[link.source]} field={link.source} handleChange={this.handleChange} />
            ))}

            {/*Last select*/}
            <div className="timeline-article">
              <div className="content-right-container">
                <div className="content-right">
                  <p>
                    <span className="article-number">
                      {" "}
                      <select
                        value={MemberData.M8}
                        onChange={this.handleChange}
                        name="M8"
                        className="form-control"
                      >
                        <option value="None">None</option>
                        {this.props.users.map(member => (
                          <option value={member.Name} key={member.Name}>
                            {member.Name}
                          </option>
                        ))}
                      </select>
                    </span>
                  </p>
                </div>
              </div>

              <div className="meta-date">

              </div>
            </div>
          </div>
        </section>

        {(this.tempState.up.MemberData && this.tempState.down.MemberData) &&
          <button className="btn btn-primary float-right" type="submit">
            Done.
        </button>
        }

        {/*Link to generate the complete route*/}
        <a href={this.state.mainLink} target="_blank"
          rel="noopener noreferrer" className="btn btn-primary float-right mr-2">

          Generate.
        </a>

        <button type="button" className="btn btn-danger float-right mr-2">Reject</button>

      </form>
    );
  }
}

export default TimeLine;
