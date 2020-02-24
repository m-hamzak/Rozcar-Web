import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
// eslint-disable-next-line
import config from "./../config";
// eslint-disable-next-line
import firebase from "firebase/app";
import "firebase/database";
// eslint-disable-next-line
import _ from "lodash";
import Pagination from './pagination';
import { paginate } from "../utils/paginate";
import "../index.css";

class Transcription extends Component {
  state = {
    verified: [],
    unverified: [],
    pageSize: 7,
    currentPage: { verified: 1, unverified: 1 }
  };

  componentDidMount = async () => {
    const groupsRef = firebase.database().ref("User2/IDsList");
    let verified = [];
    let unverified = [];
    //read data from firebase
    await groupsRef.once("value", function (snapshot) {
      snapshot.forEach(function (snap) {
        if (snap.val().Verified) {
          //verified groups
          verified.push(snap.val());
        } else {
          //unverified groups
          unverified.push(snap.val());
        }
      });
    });
    this.setState({ verified, unverified });
  };


  handlePageChangeVerified = page => {
    let currentPage = { ...this.state.currentPage };
    currentPage.verified = page;
    this.setState({ currentPage });
  };

  handlePageChangeUnverified = page => {
    let currentPage = { ...this.state.currentPage };
    currentPage.unverified = page;
    this.setState({ currentPage });
  };

  getPagedData = (allData, currentPage, pageSize) => {
    const data = paginate(
      allData,
      currentPage,
      pageSize
    );

    return { totalCount: allData.length, data: data };
  };


  //return a link or just the group ID based on the isLocked property.
  checkLocked = (group) => {

    if (group.isLocked) {
      return group.ID
    } else {
      return (<NavLink
        className="nav-link grouplist"
        to={`/admin/transGroup/${group.ID}`}
       // to={`/admin/group/${group.ID}`}
      >
        {group.ID}
      </NavLink>
      )
    }
  }

  checkAuth = () => {
    if (localStorage.getItem("token")) {
      const verified = this.getPagedData(this.state.verified, this.state.currentPage.verified, this.state.pageSize);

      const unverified = this.getPagedData(this.state.unverified, this.state.currentPage.unverified, this.state.pageSize);

      return (<div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-6 mt-5">
            <h1>Verified Groups</h1>
            <div className="row">
              <div className="col-md-8 col-lg-8">
                <ul className="list-group mb-2">
                  {verified.data.map(group => (
                    <li key={group.ID} className="list-group-item text-center">
                      <NavLink
                        className="nav-link grouplist"
                        to={{ pathname: `/admin/transGroup/${group.ID}`, state: { verified: true } }}
                      >
                        {group.ID}
                      </NavLink>
                    </li>
                  ))}
                </ul>
                <Pagination
                  itemsCount={verified.totalCount}
                  pageSize={this.state.pageSize}
                  currentPage={this.state.currentPage.verified}
                  onPageChange={this.handlePageChangeVerified}
                />
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-6 mt-5 mb-5">
            <h1>UnVerified Groups</h1>
            <div className="row">
              <div className="col-md-8 col-lg-8">
                <ul className="list-group mb-2">
                  {unverified.data.map(group => (
                    <li
                      key={group.ID}
                      className="list-group-item text-center grouplist"
                    >
                      {/*Checks each group if its locked or not*/}
                      {this.checkLocked(group)}

                    </li>
                  ))}
                </ul>
                <Pagination
                  itemsCount={unverified.totalCount}
                  pageSize={this.state.pageSize}
                  currentPage={this.state.currentPage.unverified}
                  onPageChange={this.handlePageChangeUnverified}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      );
    } else {
      return <Redirect to='/admin/login' />
    }
  }

  render() {
    return (
      <div>
        {this.checkAuth()}
      </div>
    );
  }
}

export default Transcription;
