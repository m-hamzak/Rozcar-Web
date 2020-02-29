import React , {Component} from 'react'
import { withRouter } from 'react-router-dom'
const $= require('jquery')
$.DataTable = require ('datatables.net')
// Referral link : https://www.youtube.com/watch?v=ZCKj0SJRTB8
class CarTable extends Component {
    componentDidMount(){
        console.log(this.el);
        this.$el = $(this.el)
        this.$el.click( (e) => {
            e.preventDefault();
            console.log("Clicked Item",e.toElement.textContent);
            this.getUserID(e.toElement.textContent,this.props.data,this.props.IDdata);
            
        })  
        this.$el.DataTable({
            data: this.props.data,
            columns: [
                {title : 'Registration No.'},
                {title : "Color"},
                {title : "Model"},
                {title : 'Phone Number'},
                {title : 'CNIC'},
                {title : "IBan"},
                ]
        })
    }
    getUserID(email,array,ID){
        console.log("email",email)
        console.log("array",array[0][1])
        for(var i=0; i < array.length; i++){
            if(email === array[i][2]){
                this.props.history.push(`/admin/vendors/${ID[i][0]}`)
            }
        }
    }
    render(){
        return(
            
            <div>
                <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.20/css/jquery.dataTables.css"/>
                <script type="text/javascript" charSet="utf8" src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.js"></script>

                <table className='display' width="100%" ref ={el=>this.el=el}>
                    
                </table>
            </div>
        )
    }
}

export default withRouter(CarTable); 