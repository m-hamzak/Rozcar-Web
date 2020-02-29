import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import Table from '../table'

class ScheduleModal extends Component{
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

      state={
          data:[],
      }
      componentWillMount(){
        this.getSchedule(this.props.Schedule)
      }

    getSchedule(schedule){
        var temp = []
        console.log("ROUTEEEE",this.props.Route)
        for(let m = 0; m < this.props.Route.length; m ++){
            if(this.props.Route[m].status === this.props.scheduleTime){
                temp.push(this.props.Route[m]);
            }
        }
        var tab = [];
        for(let i = 0; i < temp.length; i ++){
            var mapObj = {
                MemberName : temp[i].Name,
                mon : schedule[0][i+1],
                tue : schedule[1][i+1],
                wed : schedule[2][i+1],
                thrs : schedule[3][i+1],
                fri : schedule[4][i+1],
                sat : schedule[5][i+1],
                sun : schedule[6][i+1],
            }
            tab.push(mapObj)
        }
        this.setState({
            data : tab
        })
        console.log("Tab",tab)


        // for(let i = 0; i < schedule.length; i ++){
        //     var mapObj;
        //     for(let j = 1; j < schedule[i].length; j ++){
        //         var statusDay = schedule[i][0]
        //         mapObj = {
        //             UserMembers : this.props.UserMembers[(j-1)],
        //             time : schedule[i][j],
        //             status : statusDay
        //         }
        //         tab.push(mapObj)
        //     }
            
        // }
    }

    onModalClick = () => {
        this.props.toggleSchedule();
      }

    render(){
        console.log("Schedule",this.props.Schedule)
        console.log("ScehdulePickOrDrop",this.props.scheduleTime)
        console.log("MemberUsers",this.props.UserMembers)
        console.log("UsersProfiles",this.props.UsersProfiles)
        console.log("ROUTEEEE",this.props.Route)
        return(
            
            <div className="container">
                <Modal show={this.props.show} onHide={this.onModalClick}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.props.scheduleTime} Schedule
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Table data={this.state.data} columns={this.columns}/>
                    </Modal.Body>

                    
                </Modal>
            </div>
        );
    }

    
}
export default ScheduleModal;