import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom'
import ScheduleModal from './ScheduleModal'

class Trans extends Component{

    state = {
        showInfoTable: false,
    }

    toggleSchedule = () => {
        this.setState({ showInfoTable: !this.state.showInfoTable });
      }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-lg-12 mt-5">
                        <h1>Group Detail RC1234</h1>
                        <button type="button" className="btn btn-primary">Lock Group</button>    
                        {this.state.showInfoTable && <ScheduleModal show={this.state.showInfoTable} toggleSchedule={this.toggleSchedule}/>}
                        <button onClick={this.toggleSchedule} className="btn btn-secondary ml-2">Show Schedule</button>
                           

                            <div className="row">
                                <div className="col-md-12 col-lg-12">
                                    <div className="row">
                                        <div className="col-md-12 col-lg-12">
                                            <table className="table table-bordered mt-4 text-center">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Pickup Location</th>
                                                    <th>Dropoff Location</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr>
                                                    <td>Farah Khan</td>
                                                    <td>Asif House Civil Lines</td>
                                                    <td>26th Commercial Lane</td>
                                                </tr>
                                                <tr>
                                                    <td>Farah Khan</td>
                                                    <td>Asif House Civil Lines</td>
                                                    <td>26th Commercial Lane</td>
                                                </tr>
                                                <tr>
                                                    <td>Farah Khan</td>
                                                    <td>Asif House Civil Lines</td>
                                                    <td>26th Commercial Lane</td>
                                                </tr>
                                                <tr>
                                                    <td>Farah Khan</td>
                                                    <td>Asif House Civil Lines</td>
                                                    <td>26th Commercial Lane</td>
                                                </tr>
                                            </tbody>
                                            </table>
                                            
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 col-lg-12">
                                            <NavLink to="/admin/transRoute"><button type="button" className="btn btn-primary float-right mt-2">Set Route</button></NavLink> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Trans);