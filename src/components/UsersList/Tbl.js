import React , {Component} from 'react'
import { withRouter } from 'react-router-dom'
const $= require('jquery')
$.DataTable = require ('datatables.net')
// Referral link : https://www.youtube.com/watch?v=ZCKj0SJRTB8
class Tbl extends Component {
    componentDidMount(){
        console.log(this.el);
        this.$el = $(this.el)
        this.$el.click( (e) => {
            e.preventDefault();
            console.log("Clicked Item",e.toElement.textContent);
            var UserID = getUserID(e.toElement.textContent,this.props.data);
            this.props.history.push(`/admin/userlist/profile/${UserID}`)
        })  
        this.$el.DataTable({
                data: this.props.data,
             columns: [
                {title : "Name"},
                {title : "Email"},
                {title : 'Phone Number'},
                {title : 'GroupID'},
                {title : "Package"},
                {title : "Residentail Address"},
                {title : 'Office Address'}
                ]
        })
    }
    render(){
        return(
            
            <div>All Users List
                <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.20/css/jquery.dataTables.css"/>
                <script type="text/javascript" charSet="utf8" src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.js"></script>

                <table className='display' width="100%" ref ={el=>this.el=el}>
                    
                </table>
            </div>
        )
    }
}

function getUserID(email,array){
    console.log("email",email)
    console.log("array",array[0][1])
    for(var i=0; i < array.length; i++){
        if(email === array[i][1]){
            return array[i][7];
        }
    }
}

export default withRouter(Tbl); 