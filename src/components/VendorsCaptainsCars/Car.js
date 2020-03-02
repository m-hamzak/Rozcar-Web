import React, { Component } from "react";
// eslint-disable-next-line
import CarTable from "./CarTable";

class CarList extends Component{
    constructor(){
        super();
        this.state = {
            CarsList : [],
            CarID : [],
        }
    }

    render(){
        return(
            <div>
                <h2>Cars List</h2>
                {
                    this.state.CarsList.length > 0 ? <CarTable >

                    </CarTable> : null
                }
                
            </div>
        )
    };
}

export default CarList