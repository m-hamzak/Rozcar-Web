import React, { Component } from 'react';
import TimeDist from './TimeDist';
import { withRouter } from 'react-router-dom';

class TransRoute extends Component{
    render(){
        return(
            <TimeDist/>
        );
    }
}
export default withRouter(TransRoute);