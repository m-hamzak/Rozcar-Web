import React, { Component } from "react";
// eslint-disable-next-line
import config from "./../config";
// eslint-disable-next-line
import firebase from "firebase/app";
import "../index.css";
import { Link, Redirect } from "react-router-dom";
import { paginate } from "../utils/paginate";
import FilterForm from "./filterForm";
// eslint-disable-next-line
import _ from "lodash";
import Pagination from './pagination';

class VendorEquity extends Component {
  state = {
    vendors: [],
    captains: [{ name: "Select vendor to display record.", profilePic: "abc" }],
    cars: [{ regNo: "Select vendor to display record." }],
    currentSelected: "None",
    pageSize: { vendor: 3, captain: 2, car: 4 },
    currentPage: { vendor: 1, captain: 1, car: 1 }
  };

  componentDidMount = async () => {
    let vendors = [];
    let vendorsRef = await firebase.database().ref("Driver2/Vendor").once("value");
    vendorsRef.forEach(vendor => {
      vendors.push({ ID: vendor.val().ID, IDback: vendor.ref.path.pieces_[2], name: vendor.val().name, phone: vendor.val().phone, email: vendor.val().email, cnic: vendor.val().cnicNo, iban: vendor.val().iban });
    });
    this.setState({ vendors });
  };

  handlePageChangeVendor = page => {
    let currentPage = { ...this.state.currentPage };
    currentPage.vendor = page;
    this.setState({ currentPage });
  };

  handlePageChangeCaptain = page => {
    let currentPage = { ...this.state.currentPage };
    currentPage.captain = page;
    this.setState({ currentPage });
  };


  handlePageChangeCar = page => {
    let currentPage = { ...this.state.currentPage };
    currentPage.car = page;
    this.setState({ currentPage });
  };

  getEquity = async (vendor) => {
    let cars = [];
    let captains = [];
    let currentSelected = vendor.name;
    const carsref = await firebase.database().ref(`Driver2/Car/${vendor.IDback}`).once("value");

    carsref.forEach(car => {
      cars.push({ color: car.val().color, kind: car.val().kind, model: car.val().modelCar, regNo: car.val().regNo, runningPage: car.val().runningPage });
    });

    const captain = await firebase.database().ref("Driver2/Captain").orderByChild("vendorID")
      .equalTo(vendor.IDback)
      .once("value");
    captain.forEach(cap => {
      captains.push({ ID: cap.val().ID, venID: vendor.ID, name: cap.val().name, email: cap.val().email, phone: cap.val().phone, profilePic: cap.val().profilePicture, cnic: cap.val().cnicNo });
    });

    if (cars.length === 0) {
      this.setState({ cars: [] });
      cars.length = 0;
      cars.push({ regNo: "No car found." });
    }

    if (captains.length === 0) { captains.push({ name: "No captain found.", profilePic: "abc" }); }


    this.setState({ cars, captains, currentSelected });
  }

  checkprofilePicture = (cap) => {
    if (cap.profilePic === "abc") {
      return false;
    } else {
      return true;
    }
  }

  checkFilter = (filteredData) => {
    this.setState({ cars: [] });
    this.setState({
      vendors: filteredData, captains: [{ name: "Select vendor to display record.", profilePic: "abc" }],
      cars: [{ runningPage: "Select vendor to display record." }],
      currentSelected: "None",
    });

  }

  getPagedData = (allData, currentPage, pageSize) => {
    const data = paginate(
      allData,
      currentPage,
      pageSize
    );

    return { totalCount: allData.length, data: data };
  };

  checkAuth = () => {
    if (localStorage.getItem("token")) {
      const vendorData = this.getPagedData(this.state.vendors, this.state.currentPage.vendor, this.state.pageSize.vendor);

      const captainData = this.getPagedData(this.state.captains, this.state.currentPage.captain, this.state.pageSize.captain);
      const carData = this.getPagedData(this.state.cars, this.state.currentPage.car, this.state.pageSize.car);
      return (
        <div className="container">
          <div className="row">
            <h1 className="mb-2">Showing equities for {this.state.currentSelected} </h1>
          </div>

          <FilterForm filter={this.checkFilter} />

          <div className="row">
            <div className="col-md-4 col-lg-4">

              <h4>Vendors</h4>
              {vendorData.data.map(vendor => (
                <div key={vendor.email} onClick={() => this.getEquity(vendor)}>
                  <div className="card text-white bg-info mb-2 clickable">
                    <div className="card-body">
                      <p>{vendor.name}</p>
                      <p>{vendor.email}</p>
                      <p>{vendor.phone}</p>
                      <Link to={{
                        pathname: `/admin/user/${vendor.ID}`,
                        state: { user: vendor }
                      }} className="btn btn-danger float-right mr-2">Details</Link>
                    </div>
                  </div>
                </div>
              ))}

              <Pagination
                itemsCount={vendorData.totalCount}
                pageSize={this.state.pageSize.vendor}
                currentPage={this.state.currentPage.vendor}
                onPageChange={this.handlePageChangeVendor}
              />
            </div>

            <div className="col-md-4 col-lg-4">
              <h4>Captains</h4>
              {captainData.data.map(captain => (
                <div key={captain.profilePic} className="card text-white bg-success mb-2 clickable">
                  <div className="card-body">

                    {this.checkprofilePicture(captain) &&
                      <div id="profile-container" ><img src={captain.profilePic} alt="Profile" /></div>}
                    <p>{captain.name}</p>
                    <p>{captain.phone}</p>
                    <p>{captain.email}</p>
                    {captain.phone && <Link to={{
                      pathname: `/admin/user/${captain.ID}`,
                      state: { user: captain }
                    }} className="btn btn-primary float-right mr-2">Details</Link>}
                  </div>
                </div>
              ))}
              <Pagination
                itemsCount={captainData.totalCount}
                pageSize={this.state.pageSize.captain}
                currentPage={this.state.currentPage.captain}
                onPageChange={this.handlePageChangeCaptain}
              />
            </div>


            <div className="col-md-4 col-lg-4">
              <h4>Cars</h4>
              {carData.data.map(car => (

                <div key={car.runningPage || car.regNo} className="card text-white bg-success mb-2 clickable">
                  <div className="card-body">
                    <p>{car.color}</p>
                    <p>{car.model}</p>
                    <p>{car.regNo}</p>
                  </div>
                </div>
              ))}
              <Pagination
                itemsCount={carData.totalCount}
                pageSize={this.state.pageSize.car}
                currentPage={this.state.currentPage.car}
                onPageChange={this.handlePageChangeCar}
              />
            </div>

          </div>

        </div>

      );
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

export default VendorEquity;
