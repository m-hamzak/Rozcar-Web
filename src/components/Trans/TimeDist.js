import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from "moment";
import SingleScheduleModel from './SingleScheduleModel'
import firebase from "firebase/app";

class TimeDist extends Component{
    
    constructor(){
        super();
        this.state = {
            showInfoTable: false,
            tableContent : [],
            MembersUser : [],
            MemberCounter : 1,
            PickRadioBtn : true,
            PickRoute : [],
            NewPickSchedule : [],
            DropRoute : [],
            NewDropSchedule : [],
            NewSchedule : [],
            NewScheduleTime : "",
            NewRoute : [],
            UpperDistance : "",
            LowerDistance : "",
            Package : "",
            AllocatedPackage : "",
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
                Name : this.props.UserProfile[index].Name + " " +this.props.UserProfile[index].LastName 
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
                            Name : this.props.UserProfile[index].Name + " " +this.props.UserProfile[index].LastName 
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
                Name : this.props.UserProfile[index].Name + " " +this.props.UserProfile[index].LastName 
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
        prestatus = "Pick"
        
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
            
            pickRouteBool[index] = {
                UID : str.UserID,
                status : "Drop"
            };
            
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
                PickRoute : pickroute,
                NewRoute : pickroute
            })
        }else{
            console.log("DropRoute",pickroute);
            this.setState({
                DropRoute : pickroute,
                NewRoute : pickroute
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

    setNewPickSchedule = (Schedule,ID,TimeID,DistanceID) => {
        // var x for total journey Time from pick1 to drop4
        // var y least time from all members
        //sm safety margin
        //sm' safety margin dash
        // waiting time per pick up
        // a duration of current pick up to next pick up
        var flag = true;
        var FinalPackage = "";
        var distance = document.getElementById(DistanceID).value
        if(DistanceID === "ptotalDistance"){
            if(this.state.LowerDistance !== ""){
                FinalPackage = Number(distance) + Number(document.getElementById("dtotalDistance").value) + ""
            }
        }else{
            if(this.state.UpperDistance !== ""){
                FinalPackage = Number(distance) + Number(document.getElementById("ptotalDistance").value) + ""
            }
        }
        var newschedule = [];
        console.log("Schdule",Schedule);
        //for distance
        var distance = document.getElementById(DistanceID).value
        //for x
        var x = document.getElementById(TimeID).value
        x = Number(x)
        //for a1
        var a = []
        for(let p = 0; p < this.props.UserProfile.length - 1; p ++){
            a.push(document.getElementById(ID+(p+1)).value)
        }
        //for sm
        var sm = 5;
        //for sm'
        var smdash = 5;
        //for waiting time
        var waitingTime = 10;



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
            if(Schedule[i].Tuesday !== ""){
                TuesdayTimes.push(moment(Schedule[i].Tuesday,"LT"))
            }
            if(Schedule[i].Wednesday !== ""){
                WednesdayTimes.push(moment(Schedule[i].Wednesday,"LT"))
            }
            if(Schedule[i].thursday !== ""){
                ThursdayTimes.push(moment(Schedule[i].thursday,"LT"))
            }
            if(Schedule[i].Friday !== ""){
                FridayTimes.push(moment(Schedule[i].Friday,"LT"))
            }
            if(Schedule[i].Saturday !== ""){
                SaturdayTimes.push(moment(Schedule[i].Saturday,"LT"))
            }
            if(Schedule[i].Sunday !== ""){
                SundayTimes.push(moment(Schedule[i].Sunday,"LT"))
            }
        }
        


         console.log("convertMinutes",this.timeConvert(MondayTimes[0].toDate().getHours().toString(),MondayTimes[0].toDate().getMinutes().toString()))
    //    console.log("COnverted",this.timeConvert(MondayTimes[0].toDate())
    //     var diff = MondayTimes[0].subtract(waitingTime, 'minutes').toDate();
    //     console.log("Minute",this.timeConvert(diff.getHours().toString(),diff.getMinutes().toString()))
        
        //for y comparing minimum or maximum time;
        var minArray
        if(ID === "pt"){
            minArray = {
                Monday : moment.min(MondayTimes),
                Tuesday : moment.min(TuesdayTimes),
                Wednesday : moment.min(WednesdayTimes),
                Thursday : moment.min(ThursdayTimes),
                Friday : moment.min(FridayTimes),
                Saturday : moment.min(SaturdayTimes),
                Sunday : moment.min(SundayTimes), 
            }
        }else{
            minArray = {
                Monday : moment.max(MondayTimes),
                Tuesday : moment.max(TuesdayTimes),
                Wednesday : moment.max(WednesdayTimes),
                Thursday : moment.max(ThursdayTimes),
                Friday : moment.max(FridayTimes),
                Saturday : moment.max(SaturdayTimes),
                Sunday : moment.max(SundayTimes), 
            }
        }
        
        if(Schedule[0].Monday != ""){
            console.log("For Monday",minArray.Monday)
            var pt1;
            if(ID === "pt"){
                pt1 = minArray.Monday.subtract(x,"minutes").subtract((sm + 3*(smdash)),"minutes");
            }else{
                pt1 = minArray.Monday.subtract((sm + smdash),"minutes")
            }
            var prin = this.timeConvert(pt1.toDate().getHours().toString(),pt1.toDate().getMinutes().toString());
            console.log("0",prin)
            var mapObj = []
            mapObj.push("Monday")
            mapObj.push(prin)
            var t = pt1.add(waitingTime,"minutes").add(a[0],"minutes")
            var prin = this.timeConvert(t.toDate().getHours().toString()
            ,t.toDate().getMinutes().toString());
            mapObj.push(prin)
            console.log("1", prin)
            for(var m = 1; m < this.props.UserProfile.length - 1; m ++){
                t = t.add(waitingTime, "minutes").add(a[m],"minutes")
                var prin = this.timeConvert(t.toDate().getHours().toString()
                ,t.toDate().getMinutes().toString());
                console.log((m+1)+"", prin)
                var index = (m+1)+""
                mapObj.push(prin)
            }
      //      console.log("MapObj",mapObj);
            newschedule.push(mapObj)
        }else{
            var mapObj = []
            mapObj.push("Monday")
            for(let i = 0; i < this.props.UserProfile.length; i++){
                mapObj.push("")
            }
            newschedule.push(mapObj)
        }
        if(Schedule[0].Tuesday != ""){
            console.log("For Tuesday",minArray.Tuesday)
            var pt1;
            if(ID === "pt"){
                pt1 = minArray.Tuesday.subtract(x,"minutes").subtract((sm + 3*(smdash)),"minutes");
            }else{
                pt1 = minArray.Tuesday.subtract((sm + smdash),"minutes")
            }            
            var prin = this.timeConvert(pt1.toDate().getHours().toString(),pt1.toDate().getMinutes().toString());
            console.log("0",prin)

            var mapObj = []
            mapObj.push("Tuesday")
            mapObj.push(prin)
            var t = pt1.add(waitingTime,"minutes").add(a[0],"minutes")
            var prin = this.timeConvert(t.toDate().getHours().toString()
            ,t.toDate().getMinutes().toString());
            mapObj.push(prin)
            console.log("1", prin)
            for(var m = 1; m < this.props.UserProfile.length - 1; m ++){
                t = t.add(waitingTime, "minutes").add(a[m],"minutes")
                var prin = this.timeConvert(t.toDate().getHours().toString()
                ,t.toDate().getMinutes().toString());
                console.log((m+1)+"", prin)
                var index = (m+1)+""
                mapObj.push(prin)
            }
      //      console.log("MapObj",mapObj);
            newschedule.push(mapObj)
        }else{
            var mapObj = []
            mapObj.push("Tuesday")
            for(let i = 0; i < this.props.UserProfile.length; i++){
                mapObj.push("")
            }
            newschedule.push(mapObj)
        }
        if(Schedule[0].Wednesday != ""){
            console.log("For Wednesday",minArray.Wednesday)
            var pt1;
            if(ID === "pt"){
                pt1 = minArray.Wednesday.subtract(x,"minutes").subtract((sm + 3*(smdash)),"minutes");
            }else{
                pt1 = minArray.Wednesday.subtract((sm + smdash),"minutes")
            }           
            var prin = this.timeConvert(pt1.toDate().getHours().toString(),pt1.toDate().getMinutes().toString());
            console.log("0",prin)
            var mapObj = []
            mapObj.push("Wednesday")
            mapObj.push(prin)
            var t = pt1.add(waitingTime,"minutes").add(a[0],"minutes")
            var prin = this.timeConvert(t.toDate().getHours().toString()
            ,t.toDate().getMinutes().toString());
            mapObj.push(prin)
            console.log("1", prin)
            for(var m = 1; m < this.props.UserProfile.length - 1; m ++){
                t = t.add(waitingTime, "minutes").add(a[m],"minutes")
                var prin = this.timeConvert(t.toDate().getHours().toString()
                ,t.toDate().getMinutes().toString());
                console.log((m+1)+"", prin)
                var index = (m+1)+""
                mapObj.push(prin)
            }
     //       console.log("MapObj",mapObj);
            newschedule.push(mapObj)
        }else{
            var mapObj = []
            mapObj.push("Wednesday")
            for(let i = 0; i < this.props.UserProfile.length; i++){
                mapObj.push("")
            }
            newschedule.push(mapObj)
        }
        if(Schedule[0].thursday != ""){
            console.log("For thursday",minArray.Thursday)
            var pt1;
            if(ID === "pt"){
                pt1 = minArray.Thursday.subtract(x,"minutes").subtract((sm + 3*(smdash)),"minutes");
            }else{
                pt1 = minArray.Thursday.subtract((sm + smdash),"minutes")
            }
            var prin = this.timeConvert(pt1.toDate().getHours().toString(),pt1.toDate().getMinutes().toString());
            console.log("0",prin)
            var mapObj = []
            mapObj.push("Thursday")
            mapObj.push(prin)
            var t = pt1.add(waitingTime,"minutes").add(a[0],"minutes")
            var prin = this.timeConvert(t.toDate().getHours().toString()
            ,t.toDate().getMinutes().toString());
            mapObj.push(prin)
            console.log("1", prin)
            for(var m = 1; m < this.props.UserProfile.length - 1; m ++){
                t = t.add(waitingTime, "minutes").add(a[m],"minutes")
                var prin = this.timeConvert(t.toDate().getHours().toString()
                ,t.toDate().getMinutes().toString());
                console.log((m+1)+"", prin)
                var index = (m+1)+""
                mapObj.push(prin)
            }
        //    console.log("MapObj",mapObj);
            newschedule.push(mapObj)
        }else{
            var mapObj = []
            mapObj.push("Thursday")
            for(let i = 0; i < this.props.UserProfile.length; i++){
                mapObj.push("")
            }
            newschedule.push(mapObj)
        }
        if(Schedule[0].Friday != ""){
            console.log("For Friday",minArray.Friday)
            var pt1;
            if(ID === "pt"){
                pt1 = minArray.Friday.subtract(x,"minutes").subtract((sm + 3*(smdash)),"minutes");
            }else{
                pt1 = minArray.Friday.subtract((sm + smdash),"minutes")
            }
            var prin = this.timeConvert(pt1.toDate().getHours().toString(),pt1.toDate().getMinutes().toString());
            console.log("0",prin)
            var mapObj = []
            mapObj.push("Friday")
            mapObj.push(prin)
            var t = pt1.add(waitingTime,"minutes").add(a[0],"minutes")
            var prin = this.timeConvert(t.toDate().getHours().toString()
            ,t.toDate().getMinutes().toString());
            mapObj.push(prin)
            console.log("1", prin)
            for(var m = 1; m < this.props.UserProfile.length - 1; m ++){
                t = t.add(waitingTime, "minutes").add(a[m],"minutes")
                var prin = this.timeConvert(t.toDate().getHours().toString()
                ,t.toDate().getMinutes().toString());
                console.log((m+1)+"", prin)
                var index = (m+1)+""
                mapObj.push(prin)
            }
          //  console.log("MapObj",mapObj);
            newschedule.push(mapObj)
        }else{
            var mapObj = []
            mapObj.push("Friday")
            for(let i = 0; i < this.props.UserProfile.length; i++){
                mapObj.push("")
            }
            newschedule.push(mapObj)
        }
        if(Schedule[0].Saturday != ""){
            console.log("For Saturday",minArray.Saturday)
            var pt1;
            if(ID === "pt"){
                pt1 = minArray.Saturday.subtract(x,"minutes").subtract((sm + 3*(smdash)),"minutes");
            }else{
                pt1 = minArray.Saturday.subtract((sm + smdash),"minutes")
            }
            var prin = this.timeConvert(pt1.toDate().getHours().toString(),pt1.toDate().getMinutes().toString());
            console.log("0",prin)
            var mapObj = []
            mapObj.push("Saturday")
            mapObj.push(prin)
            var t = pt1.add(waitingTime,"minutes").add(a[0],"minutes")
            var prin = this.timeConvert(t.toDate().getHours().toString()
            ,t.toDate().getMinutes().toString());
            mapObj.push(prin)
            console.log("1", prin)
            for(var m = 1; m < this.props.UserProfile.length - 1; m ++){
                t = t.add(waitingTime, "minutes").add(a[m],"minutes")
                var prin = this.timeConvert(t.toDate().getHours().toString()
                ,t.toDate().getMinutes().toString());
                console.log((m+1)+"", prin)
                var index = (m+1)+""
                mapObj.push(prin)
            }
       //     console.log("MapObj",mapObj);
            newschedule.push(mapObj)
        }else{
            var mapObj = []
            mapObj.push("Saturday")
            for(let i = 0; i < this.props.UserProfile.length; i++){
                mapObj.push("")
            }
            newschedule.push(mapObj)
        }
        if(Schedule[0].Sunday != ""){
            console.log("For Sunday",minArray.Sunday)
            var pt1;
            if(ID === "pt"){
                pt1 = minArray.Sunday.subtract(x,"minutes").subtract((sm + 3*(smdash)),"minutes");
            }else{
                pt1 = minArray.Sunday.subtract((sm + smdash),"minutes")
            }
            var prin = this.timeConvert(pt1.toDate().getHours().toString(),pt1.toDate().getMinutes().toString());
            console.log("0",prin)
            var mapObj = []
            mapObj.push("Sunday")
            mapObj.push(prin)
            var t = pt1.add(waitingTime,"minutes").add(a[0],"minutes")
            var prin = this.timeConvert(t.toDate().getHours().toString()
            ,t.toDate().getMinutes().toString());
            mapObj.push(prin)
            console.log("1", prin)
            for(var m = 1; m < this.props.UserProfile.length - 1; m ++){
                t = t.add(waitingTime, "minutes").add(a[m],"minutes")
                var prin = this.timeConvert(t.toDate().getHours().toString()
                ,t.toDate().getMinutes().toString());
                console.log((m+1)+"", prin)
                mapObj.push(prin)
            }
       //     console.log("MapObj",mapObj);
            newschedule.push(mapObj)
        }else{
            var mapObj = []
            mapObj.push("Sunday")
            for(let i = 0; i < this.props.UserProfile.length; i++){
                mapObj.push("")
            }
            newschedule.push(mapObj)
        }


        // var pt2 = pt1.add(waitingTime, "minutes").add(a1,"minutes")
        // var prin1 = this.timeConvert(pt2.toDate().getHours().toString(),pt2.toDate().getMinutes().toString());
        // console.log("PT2",prin1)
        // var pt3 = pt2.add(waitingTime, "minutes").add(a2,"minutes")
        // var prin2 = this.timeConvert(pt3.toDate().getHours().toString(),pt3.toDate().getMinutes().toString());
        // console.log("PT3",prin2)
        // var pt4 = pt3.add(waitingTime, "minutes").add(a3,"minutes")
        // var prin3 = this.timeConvert(pt4.toDate().getHours().toString(),pt4.toDate().getMinutes().toString());
        // console.log("PT4",prin3)
        console.log("MinArray",minArray)
        console.log("New Schedule",newschedule)
        if(ID === "pt"){
            this.setState({
                NewPickSchedule : newschedule,
                NewSchedule : newschedule,
                NewScheduleTime : "Pick",
                Package : FinalPackage,
                UpperDistance : distance
            })
        }else{
            this.setState({
                NewDropSchedule : newschedule,
                NewSchedule : newschedule,
                NewScheduleTime : "Drop",
                Package : FinalPackage,
                LowerDistance : distance
            })
        }
        this.toggleSchedule()
    }
    timeConvert(Hours,Minutes) {
        var makeTime = ""
        var amPm = ""
        if(Number(Hours) > 12){
            Hours = (Number(Hours) - 12) + ""
            amPm = "PM"
        }else{
            amPm = "AM"
        }
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
        
        makeTime += " " + amPm
        return makeTime;
    }


    showTimesInputBetweenMembers(ID){
        var table  = [];
        for(let i = 0; i < this.props.UserProfile.length - 1; i ++){
            table.push(
                <div key = {i} className="input-group pb-4">
                    <div className="col-2">
                        <h6>{"M"+(i+1)+"-"+"M"+(i+2)}</h6>
                    </div>
                    <div className="col-5">
                        <input className="form-control"
                        type="text"
                        name="t1"
                        id={ID+(i+1)}
                        placeholder="60 (in mins)" required/>
                    </div>
                </div>
            )
        }
        return table;
        
    }

    toggleSchedule = () => {
        this.setState({ showInfoTable: !this.state.showInfoTable });
    }

    MakeFinalTimes(){
        var PickTemp = []
        var DropTemp = []
        for(var i = 0; i < this.state.PickRoute.length; i ++){
            if(this.state.PickRoute[i].status === "Pick"){
                PickTemp.push(this.state.PickRoute[i])
            }
            if(this.state.DropRoute[i].status === "Pick"){
                DropTemp.push(this.state.DropRoute[i])
            }
        }

        var PickDB = firebase.database().ref("User2/NewPickDays")
        var DropDB = firebase.database().ref("User2/NewDropDays")
        
        for(let j = 0; j < PickTemp.length; j ++){
            PickDB.child(PickTemp[j].ID).child("Monday").set(this.state.NewPickSchedule[0][j+1])
            PickDB.child(PickTemp[j].ID).child("Tuesday").set(this.state.NewPickSchedule[1][j+1])
            PickDB.child(PickTemp[j].ID).child("Wednesday").set(this.state.NewPickSchedule[2][j+1])
            PickDB.child(PickTemp[j].ID).child("thursday").set(this.state.NewPickSchedule[3][j+1])
            PickDB.child(PickTemp[j].ID).child("Friday").set(this.state.NewPickSchedule[4][j+1])
            PickDB.child(PickTemp[j].ID).child("Saturday").set(this.state.NewPickSchedule[5][j+1])
            PickDB.child(PickTemp[j].ID).child("Sunday").set(this.state.NewPickSchedule[6][j+1])

            DropDB.child(DropTemp[j].ID).child("Monday").set(this.state.NewDropSchedule[0][j+1])
            DropDB.child(DropTemp[j].ID).child("Tuesday").set(this.state.NewDropSchedule[1][j+1])
            DropDB.child(DropTemp[j].ID).child("Wednesday").set(this.state.NewDropSchedule[2][j+1])
            DropDB.child(DropTemp[j].ID).child("thursday").set(this.state.NewDropSchedule[3][j+1])
            DropDB.child(DropTemp[j].ID).child("Friday").set(this.state.NewDropSchedule[4][j+1])
            DropDB.child(DropTemp[j].ID).child("Saturday").set(this.state.NewDropSchedule[5][j+1])
            DropDB.child(DropTemp[j].ID).child("Sunday").set(this.state.NewDropSchedule[6][j+1])
        }
        alert("All Done")
    }

    MakeFinalRoute = () => {
        //availability
        if(this.state.PickRoute.length > 0 && this.state.DropRoute.length > 0){
            if(this.state.AllocatedPackage !== ""){
            var db = firebase
            .database()
            .ref("User2/Groups")
            .child(this.props.GroupID)
            var availability = db.child("Availability")
            var Members = db.child("Members")
            var LeaderShip = db.child("Leadership")
            var PickedUp = db.child("PickedUp")
            var PickRoute = db.child("PickRoute")
            var DropRoute = db.child("DropRoute")
            db.child("Leader").set(this.state.PickRoute[0].ID)
            db.child("PickLeader").set(this.state.PickRoute[0].ID)
            db.child("DropLeader").set(this.state.DropRoute[0].ID)
            console.log("MakeFinalRoute",this.state.MembersUser)
            for(let i = 0; i < this.state.MembersUser.length; i ++){
                Members.child(this.state.MembersUser[i].MemberNo).set(this.state.MembersUser[i].UID)
                availability.child(this.state.MembersUser[i].MemberNo).set(true)
                LeaderShip.child(this.state.MembersUser[i].MemberNo).set(false)
                PickedUp.child(this.state.MembersUser[i].MemberNo).set(false)
            }
            LeaderShip.child("M1").set(true)
            PickRoute.set(this.state.PickRoute)
            DropRoute.set(this.state.DropRoute)
            //UserDaily work for dispatching
            var db2 = firebase.database().ref("User2/UserDaily").child(this.state.PickRoute[0].ID)
            db2.child("ID").set(this.state.PickRoute[0].ID)
            db2.child("isBooked").set(false);
            db2.child("round").set(0)
            //UserProfiles may changing
            var db3 = firebase.database().ref("User2/UserInfo");
            for(let k = 0; k < this.props.UserProfile.length; k ++){
                if(this.props.UserProfile[k].UserID === this.state.PickRoute[0].ID){
                    db3.child(this.props.UserProfile[k].UserID).update({PickLeader : true})
                    db3.child(this.props.UserProfile[k].UserID).update({LeaderBool : true})
                    db3.child(this.props.UserProfile[k].UserID).update({DropLeader : false})
                }else if(this.props.UserProfile[k].UserID === this.state.DropRoute[0].ID){
                    db3.child(this.props.UserProfile[k].UserID).update({DropLeader : true})
                    db3.child(this.props.UserProfile[k].UserID).update({PickLeader : false})
                    db3.child(this.props.UserProfile[k].UserID).update({LeaderBool : false})
                }else{
                    db3.child(this.props.UserProfile[k].UserID).update({DropLeader : false})
                    db3.child(this.props.UserProfile[k].UserID).update({PickLeader : false})
                    db3.child(this.props.UserProfile[k].UserID).update({LeaderBool : false})
                }
                db3.child(this.props.UserProfile[k].UserID).update({Package : this.state.AllocatedPackage})
                db3.child(this.props.UserProfile[k].UserID).update({Transcribed : true})
            }
                // For M1 M2 etc
                for(let l = 0; l < this.state.MembersUser.length; l ++){
                    db3.child(this.state.MembersUser[l].UID)
                    .update({MemberNo :this.state.MembersUser[l].MemberNo})
                }
                this.MakeFinalTimes()
        }else{
            alert("Please Configure Time First")
        }
           

        }else{
            alert("Please Fill both Routes")
        }
        

        // firebase
        // .database()
        // .ref("User2/Groups")
        // .child(this.props.GroupID)
        // .child("DemoAvailability")
        // .set(objarray)
    }

    MakeFinalGroup = () => {
        //Group ki node k andr chalay jai
        this.MakeFinalRoute()
    }

    getAllocatedPackage = (Meters) => {
        if(Meters != ""){
            var allocatedPackage = ""
            Meters = Number(Meters);
            var km = Math.round(Meters / 100) / 10;
            for(let i = 0; i < this.props.Packages.length; i ++){
                if(km <= this.props.Packages[i].Kmlimitperday){
                    allocatedPackage = this.props.Packages[i].RoutePackageCode
                    this.state.AllocatedPackage = allocatedPackage;
                    console.log("AllocatedPackage",this.state.AllocatedPackage)
                    return this.props.Packages[i].RoutePackageCode
                }
            }
        }else{
            return ""
        }        
    }

    render(){
        return(
            <div className="container">
                <label>Package Allocated to this Group is : {this.getAllocatedPackage(this.state.Package)}</label>
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

                            {
                                this.showTimesInputBetweenMembers("pt")
                            }
                        </div>
                                {this.state.showInfoTable && <SingleScheduleModel show={this.state.showInfoTable} 
                                toggleSchedule={this.toggleSchedule}
                                UsersProfiles = {this.props.UserProfile}
                                Schedule = {this.state.NewSchedule}
                                Route = {this.state.NewRoute}
                                scheduleTime = {this.state.NewScheduleTime}/>}

                        <div className="card-footer">
                            <button type="button" onClick={(e) => this.setNewPickSchedule(this.props.PickUpSchedule,"pt","ptotalTime","ptotalDistance")} className="btn btn-primary float-right mt-2">Submit</button>
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
                        
                            <button onClick={(e) => this.MakeFinalGroup()} className="btn btn-primary float-right" type="submit">Done</button>
                            {/*Link to generate the complete route*/}
                            <button type="button" onClick={(e) => this.pickRoute()}className="btn btn-primary float-right mr-2">Generate</button>
                            <button type="button" className="btn btn-danger float-right mr-2">Reject</button>
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
                            {
                                this.showTimesInputBetweenMembers("dt")
                            }
                        </div>

                        <div className="card-footer">
                            <button type="button" onClick={(e) => this.setNewPickSchedule(this.props.DropOffSchedul,"dt","dtotalTime","dtotalDistance")} className="btn btn-primary float-right mt-2">Submit</button>
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