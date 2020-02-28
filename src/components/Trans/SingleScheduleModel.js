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
      //  this.setData(this.props.PickSchedule)
      }

    onModalClick = () => {
        this.props.toggleSchedule();
      }
    
    // setData(Schedule){
    //     var Table = [];
    //     for(let i = 0; i < this.props.UsersProfiles.length; i ++){
    //         var mapObj = {
    //             MemberName : this.props.UsersProfiles[i].Name + this.props.UsersProfiles[i].LastName,
    //             mon : Schedule[i].Monday,
    //             tue : Schedule[i].Tuesday,
    //             wed : Schedule[i].Wednesday,
    //             thrs : Schedule[i].thursday,
    //             fri : Schedule[i].Friday,
    //             sat : Schedule[i].Saturday,
    //             sun : Schedule[i].Sunday,
    //         }
    //         Table.push(mapObj)
    //     }
    //     this.setState({
    //         data : Table
    //     })
    // }

    render(){
        console.log("Schedule",this.props.Schedule)
        console.log("ScehdulePickOrDrop",this.props.scheduleTime)
        console.log("UsersProfiles",this.props.UsersProfiles)
        return(
            
            <div className="container">
                <Modal show={this.props.show} onHide={this.onModalClick}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Schedule for Group {this.props.GroupID}
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