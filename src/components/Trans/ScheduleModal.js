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

    onModalClick = () => {
        this.props.toggleSchedule();
      }

    render(){
        return(
            <div className="container">
                <Modal show={this.props.show} onHide={this.onModalClick}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Schedule for Group 1234
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Table data={this.state.data} columns={this.columns}/>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary">Show Time</Button>
                        <Button variant="secondary" onClick={this.onModalClick}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default ScheduleModal;