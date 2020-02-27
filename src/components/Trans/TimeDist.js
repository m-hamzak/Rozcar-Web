import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from "moment";

class TimeDist extends Component{
    
    constructor(){
        super();
        this.state = {
            tableContent : [],
            MembersUser : [],
            MemberCounter : 1,
            PickRadioBtn : true,
            PickRoute : [],
            DropRoute : [],
        }
    }

    
    componentWillMount(){
        console.log("TimeDis",this.props.UserProfile);
        console.log("PickUpSchedule",this.props.PickUpSchedule)
        console.log("DropOffSchedul",this.props.DropOffSchedul)
        console.log("PickupLocation",this.props.PickupLocation)
        console.log("DropOffLocation",this.props.DropOffLocation)
        for(let i = 0; i < this.props.UserProfile.length; i++){
            this.state.tableContent.push(this.props.UserProfile[i].Name);
        }
    }

    setMembersAccordingToSelector(selectorString,position,index){ 
        if(this.state.PickRadioBtn === true){
        if(index > this.props.PickupLocation.length - 1){
            index = index % this.props.PickupLocation.length;
        }
       // console.log("memeberIndex",index)
        var selector = "Selector"
        var MemberCounter = this.state.MemberCounter;
        if(selectorString === "Selector0"){
            var HashMap = {
                selector : selectorString,
                MemberNo : "M1",
                Position : position, 
                UID : this.props.UserProfile[index].UserID,
                Name : this.props.UserProfile[index].Name
            }
            this.state.MembersUser.push(HashMap);
            for(let k = 0; k < this.state.MembersUser.length - 1; k ++){
                if(this.state.MembersUser[k].UID === this.props.UserProfile[index].UserID){
                    this.state.MembersUser.splice(k,1)
                }
            }
        }else{
            for(let k = 0; k < this.state.MembersUser.length; k ++){
                //On
          //      console.log("compare",this.state.MembersUser[k].UID,this.props.UserProfile[index].UserID);
                if(this.state.MembersUser[k].UID === this.props.UserProfile[index].UserID){
                    if(this.state.MembersUser[k].selector === selectorString){
                 //       console.log("return1",selectorString)
                        return;
                    }else{
                        console.log("Not Return");
                        let memberno = this.state.MembersUser[k].MemberNo;
                  //      console.log("state1",this.state.MembersUser[k]);
                        this.state.MembersUser[k] = {
                            selector : selectorString,
                            MemberNo : memberno,
                            Position : position,
                            UID : this.props.UserProfile[index].UserID,
                            Name : this.props.UserProfile[index].Name
                        }
                    //    console.log("state",this.state.MembersUser[k]);
                     //   update(this.state.MembersUser,{$splice:[k,1,mapObj]})
                        return
                    }
                }
            }
            console.log("return",selectorString)
            MemberCounter++;    
            if(MemberCounter <= this.props.UserProfile.length){
            var HashMap = {
                selector : selectorString,
                MemberNo : "M"+MemberCounter,
                Position : position,
                UID : this.props.UserProfile[index].UserID,
                Name : this.props.UserProfile[index].Name
            }
            this.state.MembersUser.push(HashMap);
            this.setState({
                MemberCounter : MemberCounter
                })
                }
                
            }
        }
    }

    

    pickRoute = () => {
        console.log("Called");
        var pickroute = [];
        var pickRouteBool = [];
        var prestatus
        if(this.state.PickRadioBtn === true){
            prestatus = "Pick"
        }else{
            prestatus = "Drop"
        }
        for(var j = 0; j < this.props.UserProfile.length; j ++){
            var mapObj = {
                UID : this.props.UserProfile[j].UserID,
                status : prestatus,
            }
            pickRouteBool.push(mapObj)
        }
        console.log("PickRouteBool",pickRouteBool)
        for(let i = 0; i < (this.props.UserProfile.length*2); i ++){
            
            var str = this.props.UserProfile[document.getElementById("Selector"+i)
            .options[document.getElementById("Selector"+i).selectedIndex].value];
        //    console.log(str)
            var index = i;
       //     console.log("Old Index",index);
            if(index > this.props.PickupLocation.length - 1){
                index = index % this.props.PickupLocation.length;
            }
        //    console.log("New Index",index);
            var memberNo = "";
            for(let l = 0; l < this.state.MembersUser.length; l++){
                if(str.UserID === this.state.MembersUser[l].UID){
                    memberNo = this.state.MembersUser[l].MemberNo
                }
            }
        
            var statusstr = ""
            
            for(let m = 0; m < pickRouteBool.length; m ++){
                if(pickRouteBool[m].UID === str.UserID){
                    statusstr = pickRouteBool[m].status;
                    index = m;
                    break;
                }
            }
            statusstr = pickRouteBool[index].status;
            
          //  console.log("Old Item",pickRouteBool[index],index)
            if(this.state.PickRadioBtn === true){    
                pickRouteBool[index] = {
                    UID : str.UserID,
                    status : "Drop"
                };
            }else{
                pickRouteBool[index] = {
                    UID : str.UserID,
                    status : "Pick"
                };
            }
        //    console.log("New Item",pickRouteBool[index],index)
            pickroute.push({
                ID : str.UserID,
                status : statusstr,
                Member : memberNo,
                Name : str.Name
            })
            
        }
        if(this.state.PickRadioBtn === true){
            console.log("PickRoute",pickroute);
            console.log("MembersUser",this.state.MembersUser)
            this.setState({
                PickRoute : pickroute
            })
        }else{
            console.log("DropRoute",pickroute);
            this.setState({
                DropRoute : pickroute
            })
        }
        this.getWholeGooglePath(pickroute)
        
    }

    printValue = (e,index) => {
        var i = index;
        if(index > this.props.PickupLocation.length - 1){
            index = index % this.props.PickupLocation.length;
        }
        console.log("Index",index);
      //  console.log("Asdsad","Selector"+i)
        
        var str = document.getElementById("Selector"+i)
        .options[document.getElementById("Selector"+i).selectedIndex].value;
        console.log("str",str)
        this.setMembersAccordingToSelector("Selector"+i,i,str);
        // console.log("str",str)
        // console.log("e",e.target.name)
        // console.log(this.props.UserProfile[e.target.value]," Index : "+index)
    }
    TableContent = () => {
        var table = [];
        for(let i = 0; i < this.state.tableContent.length; i ++){
            table.push(
                <option key={i} value={i}>{this.state.tableContent[i]}</option>
            )
        }
        return table;
    }

    getWholeGooglePath(Route){
        var Points = []
        for(let i = 0; i < Route.length; i ++){
            for(let j = 0; j < this.props.UserProfile.length; j ++){
                if(Route[i].ID === this.props.UserProfile[j].UserID){
                    var point;
                    if(Route[i].status === "Pick"){
                        point = this.props.PickupLocation[j]
                    }else{
                        point = this.props.DropOffLocation[j]
                    }
                    Points.push(point)
                    break;
                }
            }
        }
        var Str = "https://www.google.com/maps/dir/";
        for(let k = 1; k < Points.length; k ++){
            Str += `${Points[k-1].Latitude},${Points[k-1].Longitude}/`+
            `${Points[k].Latitude},${Points[k].Longitude}/` 
        }
        console.log("Points",Points)
        window.open(Str, "_blank") 
    }

    getGooglePath = (FirstSelector,ArgFirstIndex,SecondSelector,ArgSecondIndex) => {
        var FirstPoint,SecondPoint;
        var Pick = true;
        var FirstIndex = document.getElementById(FirstSelector)
        .options[document.getElementById(FirstSelector).selectedIndex].value;
        var SecondIndex = document.getElementById(SecondSelector)
        .options[document.getElementById(SecondSelector).selectedIndex].value;
        for(var i = 0; i < ArgFirstIndex; i++){
        var index = i;
        if(index > this.props.PickupLocation.length - 1){
            index = index % this.props.PickupLocation.length;
        }
        var UserIndex = document.getElementById("Selector"+i)
        .options[document.getElementById("Selector"+i).selectedIndex].value;
        if(this.props.UserProfile[index] === this.props.UserProfile[FirstIndex]){
                Pick = false;
                break;
            }
        }
        if(this.state.PickRadioBtn === true){
            if(Pick === true){
                FirstPoint = this.props.PickupLocation[FirstIndex]
            }else{
                FirstPoint = this.props.DropOffLocation[FirstIndex];
            }
        }else{
            if(Pick === true){
                FirstPoint = this.props.DropOffLocation[FirstIndex]
            }else{
                FirstPoint = this.props.PickupLocation[FirstIndex];
            }
        }
        Pick = true;
        for(var j = 0; j < ArgSecondIndex; j++){
            var index = i;
        if(index > this.props.PickupLocation.length - 1){
            index = index % this.props.PickupLocation.length;
        }
        var UserIndex = document.getElementById("Selector"+j)
        .options[document.getElementById("Selector"+j).selectedIndex].value;
        if(this.props.UserProfile[UserIndex] === this.props.UserProfile[SecondIndex]){
                Pick = false;
                break;
            }
        }
        if(this.state.PickRadioBtn === true){
            if(Pick === true){
                SecondPoint = this.props.PickupLocation[SecondIndex]
            }else{
                SecondPoint = this.props.DropOffLocation[SecondIndex];
            }
        }else{
            if(Pick === true){
                SecondPoint = this.props.DropOffLocation[SecondIndex]
            }else{
                SecondPoint = this.props.PickupLocation[SecondIndex];
            }
        }
        
        window.open("https://www.google.com/maps/dir/"
        +`${FirstPoint.Latitude},${FirstPoint.Longitude}/`+
        `${SecondPoint.Latitude},${SecondPoint.Longitude}/`, "_blank")                                                                                                                                                                                                                                                                                                                                                      
    }

    setTextBoxesForRoute = () => {
        
        var table = [];
        var StrClassName = "";
        var OtherdivClassname = "";
        let index = 1;
        for(let i = 0; i < (this.props.PickupLocation.length * 2); i++){
            if(index > this.props.PickupLocation.length){
                index = 1;
            }
            // console.log(" MainIndex : " + index)
            if((i % 2) === 0){
                StrClassName = "content-left-container";
                OtherdivClassname = "content-left"
            }else{
                StrClassName = "content-right-container";
                OtherdivClassname = "content-right"
            }
            table.push(
                <div key={i} className="timeline-article">
                    <div className={StrClassName}>
                        <div className={OtherdivClassname}>
                            <p>
                                <span className="article-number">
                                    <select id={"Selector"+(i)} onChange={(e) => this.printValue(e,i)} className={"form-control"}
                                    name={"Selector"+(i)}>
                                        <option value="">None</option>
                                        {this.TableContent()}
                                    </select>
                                </span>
                            </p>
                        </div>
                    </div>
                    {
                        i !== 0 ? <div className="meta-date">             
                        <div className="date">                       
                            <a onClick={(e) => this.getGooglePath("Selector"+(i-1),(i-1),"Selector"+(i),i)} target="_blank">
                                <i className="fa fa-map-marker">Click here</i></a>
                        </div>
                    </div> : null
                    }
                    
                </div>
            )
            index++;
        }
        return table;
    }
    RadioBtn = (e) => {
        console.log("PickRadio",this.state.PickRadioBtn)
        this.setState({
            PickRadioBtn : !this.state.PickRadioBtn
        })
        
    }

    setNewPickSchedule = (Schedule) => {
        // var x for total journey Time from pick1 to drop4
        // var y least time from all members
        //sm safety margin
        //sm' safety margin dash
        // waiting time per pick up
        // a duration of current pick up to next pick up
        console.log("Schdule",Schedule);
        //for distance
        var distance = document.getElementById("ptotalDistance").value
        //for x
        var x = document.getElementById("ptotalTime").value
        //for a1
        var a1 = document.getElementById("pt1").value
        //for a2
        var a2 = document.getElementById("pt1").value
        //for a3
        var a3 = document.getElementById("pt1").value
        //for sm
        var sm = 5;
        //for sm'
        var smdash = 5;
        //for waiting time
        var waitingTime = 10;

        console.log("TextValues",x,a1,a2,a3,distance);

        //for y
        var MondayTimes = []
        var TuesdayTimes = []
        var WednesdayTimes = []
        var ThursdayTimes = []
        var FridayTimes = []
        var SaturdayTimes = []
        var SundayTimes = []


        for(let i = 0; i < Schedule.length; i ++){
            if(Schedule[i].Monday !== ""){
                MondayTimes.push(moment(Schedule[i].Monday,"LT"))
            }
            if(Schedule[i].Monday !== ""){
                TuesdayTimes.push(moment(Schedule[i].Tuesday,"LT"))
            }
            if(Schedule[i].Monday !== ""){
                WednesdayTimes.push(moment(Schedule[i].Wednesday,"LT"))
            }
            if(Schedule[i].Monday !== ""){
                ThursdayTimes.push(moment(Schedule[i].thursday,"LT"))
            }
            if(Schedule[i].Monday !== ""){
                FridayTimes.push(moment(Schedule[i].Friday,"LT"))
            }
            if(Schedule[i].Monday !== ""){
                SaturdayTimes.push(moment(Schedule[i].Saturday,"LT"))
            }
            if(Schedule[i].Monday !== ""){
                SundayTimes.push(moment(Schedule[i].Sunday,"LT"))
            }
        }
        


         console.log("convertMinutes",this.timeConvert(MondayTimes[0].toDate().getHours().toString(),MondayTimes[0].toDate().getMinutes().toString()))
    //    console.log("COnverted",this.timeConvert(MondayTimes[0].toDate())
    //     var diff = MondayTimes[0].subtract(waitingTime, 'minutes').toDate();
    //     console.log("Minute",this.timeConvert(diff.getHours().toString(),diff.getMinutes().toString()))
        
        //for y comparing minimum time;
        var minArray = {
            Monday : moment.min(MondayTimes),
            Tuesday : moment.min(TuesdayTimes),
            Wednesday : moment.min(WednesdayTimes),
            Thursday : moment.min(ThursdayTimes),
            Friday : moment.min(FridayTimes),
            Saturday : moment.min(SaturdayTimes),
            Sunday : moment.min(SundayTimes), 
        }

        var pt1 = minArray.Monday.subtract(x,"minutes").subtract((sm + 3*(smdash)));
        var prin = this.timeConvert(pt1.toDate().getHours().toString(),pt1.toDate().getMinutes().toString());
        console.log("PT1",prin)
        var pt2 = pt1.add(waitingTime, "minutes").add(a1,"minutes")
        var prin1 = this.timeConvert(pt2.toDate().getHours().toString(),pt2.toDate().getMinutes().toString());
        console.log("PT2",prin1)
        var pt3 = pt2.add(waitingTime, "minutes").add(a2,"minutes")
        var prin2 = this.timeConvert(pt3.toDate().getHours().toString(),pt3.toDate().getMinutes().toString());
        console.log("PT3",prin2)
        var pt4 = pt1.add(waitingTime, "minutes").add(a3,"minutes")
        var prin3 = this.timeConvert(pt4.toDate().getHours().toString(),pt4.toDate().getMinutes().toString());
        console.log("PT4",prin3)
        console.log("MinArray",minArray)
    }
    timeConvert(Hours,Minutes) {
        var makeTime = ""
        if(Hours.length === 1){
            makeTime = "0"+Hours
        }else{
            makeTime = Hours
        }
        makeTime += ":"
      //  console.log("length" + Minutes.length)
        if(Minutes.length === 1){
            makeTime += "0"+Minutes
        }else{
            makeTime += Minutes
        }
        var amPm = ""
        if(Number(Hours) > 12){
            amPm = "PM"
        }else{
            amPm = "AM"
        }
        makeTime += " " + amPm
        return makeTime;
    }

    render(){
        return(
            <div className="container">

                {/* PICK UP TABLE AND TIMELINE STARTS */}
                <div className="row">

                    {/* TABLE STARTS HERE */}
                    <div className="col-md-6 col-lg-6 mt-5">
                        <div className="card">
                        <div className="card-header">
                            <h1>Pick Up</h1>
                        </div>
                        <div className="card-body">
                            <div className="input-group pb-4">
                                <div className="col-2">
                                    <h6>Total</h6>
                                </div>
                                <div className="col-5">
                                    <input className="form-control"
                                    type="text"
                                    name="totalTime"
                                    id="ptotalTime"
                                    placeholder="60 (in mins)" required/>
                                </div>

                                <div className="col-5">
                                    <input className="form-control"
                                    type="text"
                                    name="totalDistance"
                                    id="ptotalDistance"
                                    placeholder="50 (in meters)" required/>
                                </div>
                            </div>



                            <div className="input-group pb-4">
                                <div className="col-2">
                                    <h6>M1-M2</h6>
                                </div>
                                <div className="col-5">
                                    <input className="form-control"
                                    type="text"
                                    name="t1"
                                    id="pt1"
                                    placeholder="60 (in mins)" required/>
                                </div>
                            </div>


                            <div className="input-group pb-4">
                                <div className="col-2">
                                    <h6>M2-M3</h6>
                                </div>
                                <div className="col-5">
                                    <input className="form-control"
                                    type="text"
                                    name="t2"
                                    id="pt2"
                                    placeholder="60 (in mins)" required/>
                                </div>
                            </div>


                            <div className="input-group pb-4">
                                <div className="col-2">
                                    <h6>M3-M4</h6>
                                </div>
                                <div className="col-5">
                                    <input className="form-control"
                                    type="text"
                                    name="t3"
                                    id="pt3"
                                    placeholder="60 (in mins)" required/>
                                </div>
                            </div>
                        </div>

                        <div className="card-footer">
                            <button type="button" onClick={(e) => this.setNewPickSchedule(this.props.PickUpSchedule)} className="btn btn-primary float-right mt-2">Submit</button>
                        </div>
                        </div>
                    </div>
                    {/* PICKUP TABLE ENDS */}


                    {/* TIMELINE STARTS HERE */}
                    <div className="col-md-6 col-lg-6 mb-5 mt-5">
                    
                        {/* RADIO BUTTONS START */}
                        <span className="mr-2">
                            <input type="radio" id="routeChoice1"
                            name="route" onChange={(e) => this.RadioBtn(e)} defaultChecked={true} />
                            <label htmlFor="routeChoice1">Up Route</label>
                        </span>

                        <span>
                            <input type="radio"  id="routeChoice2"
                            name="route" onChange={(e) => this.RadioBtn(e)} />
                            <label htmlFor="routeChoice2">Down Route</label>
                        </span>
                        {/* RADIO BUTTONS END */}
                        
                        <section id="conference-timeline">
                            <div className="timeline-start">Route</div>

                            <div className="conference-center-line"/>
                            <div className="conference-timeline-content"></div>

                                {/* FIRST SEVEN SELECTS */}

                                {
                                    this.setTextBoxesForRoute()
                                }
                        </section>
                        
                            <button className="btn btn-primary float-right" type="submit">Done</button>
                            {/*Link to generate the complete route*/}
                            <a href="www.facebook.com" target="_blank"
                            rel="noopener noreferrer" className="btn btn-primary float-right mr-2">Generate</a>
                            <button type="button"onClick={(e) => this.pickRoute()}  className="btn btn-danger float-right mr-2">Reject</button>
                    </div>

                </div>
                {/* PICKUP TABLE AND TIMELINE ENDS */}


                {/* DROP OFF TABLE AND TIMELINE STARTS */}
                <div className="row">
                <div className="col-md-6 col-lg-6 mt-5">
                        <div className="card">
                        <div className="card-header">
                            <h1>Drop Off</h1>
                        </div>
                        <div className="card-body">
                            <div className="input-group pb-4">
                                <div className="col-2">
                                    <h6>Total</h6>
                                </div>
                                <div className="col-5">
                                    <input className="form-control"
                                    type="text"
                                    name="totalTime"
                                    id="dtotalTime"
                                    placeholder="60 (in mins)" required/>
                                </div>

                                <div className="col-5">
                                    <input className="form-control"
                                    type="text"
                                    name="totalDistance"
                                    id="dtotalDistance"
                                    placeholder="50 (in meters)" required/>
                                </div>
                            </div>



                            <div className="input-group pb-4">
                                <div className="col-2">
                                    <h6>M1-M2</h6>
                                </div>
                                <div className="col-5">
                                    <input className="form-control"
                                    type="text"
                                    name="t1"
                                    id="dt1"
                                    placeholder="60 (in mins)" required/>
                                </div>
                            </div>


                            <div className="input-group pb-4">
                                <div className="col-2">
                                    <h6>M2-M3</h6>
                                </div>
                                <div className="col-5">
                                    <input className="form-control"
                                    type="text"
                                    name="t2"
                                    id="dt2"
                                    placeholder="60 (in mins)" required/>
                                </div>
                            </div>


                            <div className="input-group pb-4">
                                <div className="col-2">
                                    <h6>M3-M4</h6>
                                </div>
                                <div className="col-5">
                                    <input className="form-control"
                                    type="text"
                                    name="t3"
                                    id="dt3"
                                    placeholder="60 (in mins)" required/>
                                </div>
                            </div>
                        </div>

                        <div className="card-footer">
                            <button type="button" className="btn btn-primary float-right mt-2">Submit</button>
                        </div>
                        </div>
                    </div>
                </div>


                

                {/* DROPOFF TABLE ENDS */}


            </div>
        );
    }
}
export default withRouter(TimeDist)