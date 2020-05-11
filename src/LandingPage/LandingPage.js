import React, {Component} from 'react';
import './LandingPage.css'
import DemoMap from '../Images/DemoMap.png'
import slider2New from '../Images/slider2New.jpg'
import google from '../Images/google.png'
import apple from '../Images/apple.png'
import TopNavigation from '../TopNavigation/TopNavigation'
import Carousel from 'react-bootstrap/Carousel'
import cur1 from '../Images/cur1.jpg'
import airconditioned from '../Images/air-conditioned.png'
import announcement from '../Images/announcement.png'
import automatedmatching from '../Images/automated-matching.png'
import communication from '../Images/communication.png'
import easypayment from '../Images/easy-payment.png'
import economical from '../Images/economical.png'
import erm from '../Images/ERM.png'
import inapphazard from '../Images/in-app-hazard.png'
import nopeak from '../Images/no-peak.png'
import secure from '../Images/secure.png'
import timesaving from '../Images/time-saving.png'
import vacationfee from '../Images/vacation-fee.png'
import LogIn from '../LoginSignUpPages/Login';

class LandingPage extends Component {

    constructor(){
        super();
        this.state = {
            picArr: [cur1, cur1, cur1,cur1,cur1,cur1,cur1,cur1,cur1],
        }
    }
    //Initially pic Index = 0
    picIndex = 0;

    //CorouselCreationHere:
    createCarousel = () => {
        var table =[];
        for(let i = 0; i< 3; i++){
            table.push(
                <Carousel.Item>
                    <div>
                        {
                            this.createImage()
                        }
                    </div>
                </Carousel.Item>
            );
        }
        return table;
    }

    createImage = () => {
        var table = []
        for(let i = 0; i< 3; i++) {
            table.push(
                <div clasName="mySlides w3-animate-opacity">
                    <img className="w3-image" id = "carouselone" src= {this.state.picArr[this.picIndex]} alt="Cur Image" height = "250px"></img>       
                </div>
            );
            this.picIndex++;
        }
        return table;
    }

    render() {
        return(

        <div>
            <TopNavigation/>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins"/> 
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>

             <div className = "banner">

             </div>

            <div className="w3-padding-64 w3-white">
                <div className="w3-row-padding">
                    <div className="w3-col l8 m6">
                        <h1 className="w3-jumbo"><b>The App</b></h1>
                        <h1 className="w3-xxxlarge w3-text-green"><b>Why buy it?</b></h1>
                        <p><span className="w3-xlarge">Take photos like a pro.</span> You should buy this app because lorem ipsum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            <img  id = "google" src = {google} height = "auto" width = "200px"></img>
                            <img className = "w3-image" id = "apple" src = {apple} height = "auto" width = "200px"></img>
                        
                        
                    </div>
                    <div className="w3-col l4 m6">
                    <img src = {DemoMap} class="w3-image"></img>
                    <div className="w3-center w3-hide-large w3-hide-medium">
                    <button className="w3-button w3-block w3-padding-large" onclick="document.getElementById('download').style.display='block'">
                    <i className="fa fa-download"></i> Download Application
                    </button>
                   
                    </div>
                    </div>
                </div>
            </div> 

                    {/* Model */}
            <div id="download" className="w3-modal w3-animate-opacity">
                <div className="w3-modal-content">
                    <div className="w3-container w3-white">
                        <i onclick="document.getElementById('download').style.display='none'" className="fa fa-remove w3-xlarge w3-button w3-transparent w3-right w3-xlarge"></i>
                        <h2 className="w3-wide">DOWNLOAD</h2>
                        <p>Download the app in AppStore, Google Play or Microsoft Store.</p>
                        <i className="fa fa-android w3-large"></i> <i className="fa fa-apple w3-large"></i> <i className="fa fa-windows w3-large"></i>
                        <p><input className="w3-input w3-border" type="text" placeholder="Enter e-mail"></input></p>
                        <button type="button" className="w3-button w3-block w3-padding-large w3-red w3-margin-bottom" onclick="document.getElementById('download').style.display='none'">Fake Download</button>
                    </div>
                </div>
            </div>

            {/* <!-- Clarity Section --> */}
            <Carousel>
                {
                    this.createCarousel()
                }
            </Carousel>

            {/* <!-- Features Section --> */}
            <div id = "feature-section" className="w3-container w3-padding-64 w3-dark-grey w3-center">
            <h1 className="w3-jumbo"><b>Why ROZCAR?</b></h1>
            <p>Your Daily commute Partner</p>

            <div className="w3-row">
                <div className="w3-col s3">
                <img src = {timesaving} id = "timesaving"  className="w" width="100" height="100"></img>
                <p>Time Saving</p>
                </div>
                <div className="w3-col s3">
                <img src = {economical} id = "economical"  className="w" width="100" height="100"></img>
                <p>Economical</p>
                </div>
                <div className="w3-col s3">
                <img src = {secure} id = "secure"  className="w" width="100" height="100"></img>
                <p>Safe and Serve</p>
                </div>
                <div className="w3-col s3">
                <img src = {inapphazard} id = "inapphazard"  className="w" width="100" height="100"></img>
                <p>In App Hazard</p>
                </div>
            </div>

            <div className="w3-row">
                <div className="w3-col s3">
                <img src = {airconditioned} id = "airconditioned"  className="w" width="100" height="100"></img>
                <p>Air Conditional</p>
                </div>
                <div className="w3-col s3">
                <img src = {vacationfee} id = "vacationfee"  className="w" width="100" height="100"></img>
                <p>No fee for vaccation</p>
                </div>
                <div className="w3-col s3">
                <img src = {nopeak} id = "nopeak"  className="w" width="100" height="100"></img>
                <p>No peak/Surge</p>
                </div>
                <div className="w3-col s3">
                <img src = {automatedmatching} id = "automatedmatching"  className="w" width="100" height="100"></img>
                <p>Automated Matching process</p>
                </div>
            </div>
            
            <div className="w3-row">
                <div className="w3-col s3">
                <img src = {communication} id = "communication"  className="w" width="100" height="100"></img>
                <p>Effective Communication</p>
                </div>
                <div className="w3-col s3">
                <img src = {announcement} id = "announcement"  className="w" width="100" height="100"></img>
                <p>Regular Announcement</p>
                </div>
                <div className="w3-col s3">
                <img src = {erm} id = "erm"  className="w" width="100" height="100"></img>
                <p>ERM</p>
                </div>
                <div className="w3-col s3">
                <img src = {easypayment} id = "easypayment"  className="w" width="100" height="100"></img>
                <p>Easy Payments</p>
                </div>
            </div>
            </div>

            
            {/* <!-- Pricing Section --> */}
            {/* <div className="w3-padding-64 w3-center w3-white">
                <h1 className="w3-jumbo"><b>Pricing</b></h1>
                <p className="w3-large">Choose a pricing plan that fits your needs.</p>
                <div className="w3-row-padding">
                    <div className="w3-half w3-section">
                        <ul className="w3-ul w3-card w3-hover-shadow">
                            <li className="w3-dark-grey w3-xlarge w3-padding-32">Basic</li>
                            <li className="w3-padding-16"><b>250</b> Photos</li>
                            <li className="w3-padding-16"><b>10</b> Features</li>
                            <li className="w3-padding-16"><b>No</b> Ads</li>
                            <li className="w3-padding-16"><b>Office hours</b> Support</li>
                            <li className="w3-padding-16">
                            <h2 className="w3-opacity">$ 25</h2>
                            </li>
                            <li className="w3-light-grey w3-padding-24">
                                <button className="w3-button w3-black w3-padding-large" onclick="document.getElementById('download').style.display='block'"><i class="fa fa-download"></i> Download</button>
                            </li>
                        </ul>
                    </div>

                    <div className="w3-half w3-section">
                        <ul className="w3-ul w3-card w3-hover-shadow">
                            <li className="w3-red w3-xlarge w3-padding-32">Premium</li>
                            <li className="w3-padding-16"><b>1000</b> Photos</li>
                            <li className="w3-padding-16"><b>50</b> Features</li>
                            <li className="w3-padding-16"><b>No</b> Ads</li>
                            <li className="w3-padding-16"><b>Endless</b> Support</li>
                            <li className="w3-padding-16">
                            <h2 className="w3-opacity">$ 99</h2>
                            </li>
                            <li className="w3-light-grey w3-padding-24">
                                <button className="w3-button w3-black w3-padding-large" onclick="document.getElementById('download').style.display='block'"> <i class="fa fa-download"></i> Download</button>
                            </li>
                        </ul>
                    </div>
                    
                </div>
                <br/>
            </div> */}
        {/* <div className="w3-container">
            <img src={map} class="w3-image"></img>
            </div> */}
            
                {/* <!-- Footer --> */} 
            <footer className="w3-container w3-padding-32 w3-light-grey w3-center w3-xlarge">
                <div className="w3-section">
                    <i className="fa fa-facebook-official w3-hover-opacity"></i>
                    <i className="fa fa-instagram w3-hover-opacity"></i>
                    <i className="fa fa-snapchat w3-hover-opacity"></i>
                    <i className="fa fa-twitter w3-hover-opacity"></i>
                    <i className="fa fa-linkedin w3-hover-opacity"></i>
                </div>
                    <p className="w3-medium">Powered by 2 minut Networks</p>
               


                </footer>

                    

                {/* </body> */}


            </div> 

        );
    }
}
export default LandingPage;

