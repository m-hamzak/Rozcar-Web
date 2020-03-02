import React, {Component} from 'react';
import './LandingPage.css'
import DemoMap from '../Images/DemoMap.png'
import slider1 from '../Images/slider1.jpg'
import slider2New from '../Images/slider2New.jpg'
import image1 from '../Images/image1.jpg'
import image2 from '../Images/image2.jpg'
import rozcarlogo from '../Images/rozcarlogo.png'
import TopNavigation from '../TopNavigation/TopNavigation'

class LandingPage extends Component {

    render() {
        return(

        <div>
            <TopNavigation/>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins"/> 
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>

             <div clasName="mySlides w3-animate-opacity">
                <img className="w3-image" src= {slider2New} alt="Image 2"></img>
                
                
            </div>
 
            <a className="w3-button w3-block w3-black w3-hide-large w3-hide-medium" onclick={(e) => this.plusDivs(1)}>Take Tour <i class="fa fa-angle-right"></i></a>


            {/* App section */}

            <div className="w3-padding-64 w3-white">
                <div className="w3-row-padding">
                    <div className="w3-col l8 m6">
                        <h1 className="w3-jumbo"><b>The App</b></h1>
                        <h1 className="w3-xxxlarge w3-text-green"><b>Why buy it?</b></h1>
                        <p><span className="w3-xlarge">Take photos like a pro.</span> You should buy this app because lorem ipsum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                        <button className="w3-button w3-light-grey w3-padding-large w3-section w3-hide-small" onclick="document.getElementById('download').style.display='block'">
                            <i className="fa fa-download"></i> Download Application
                        </button>
                        <p>Available for
                            <i className="fa fa-android w3-xlarge w3-text-green"></i>
                            <i className="fa fa-apple w3-xlarge"></i>
                            <i className="fa fa-windows w3-xlarge w3-text-blue"></i>
                        </p>
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
            <div className="w3-padding-64 w3-light-grey">
                <div className="w3-row-padding">
                    <div className="w3-col l4 m6">
                        <img className="w3-image w3-round-large w3-hide-small w3-grayscale" src={image2} alt="App" width="335" height="471"></img>
                    </div>
                    <div className="w3-col l8 m6">
                        <h1 className="w3-jumbo"><b>Clarity</b></h1>
                        <h1 className="w3-xxxlarge w3-text-red"><b>Pixels, who?</b></h1>
                        <p><span classNam="w3-xlarge">A revolution in resolution.</span> Sharp and clear photos with the world's best photo engine, incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    </div>
                </div>
            </div>

            {/* <!-- Features Section --> */}
            <div id = "feature-section" className="w3-container w3-padding-64 w3-dark-grey w3-center">
            <h1 className="w3-jumbo"><b>Features</b></h1>
            <p>This app is just so lorem ipsum.</p>

            <div className="w3-row">
                <div className="w3-col s3">
                <i className="fa fa-bolt w3-text-orange w3-jumbo"></i>
                <p>Fast</p>
                </div>
                <div className="w3-col s3">
                <i className="fa fa-heart w3-text-red w3-jumbo"></i>
                <p>Loved</p>
                </div>
                <div className="w3-col s3">
                <i className="fa fa-camera w3-text-yellow w3-jumbo"></i>
                <p>Clarity</p>
                </div>
                <div className="w3-col s3">
                <i className="fa fa-battery-full w3-text-green w3-jumbo"></i>
                <p>Power</p>
                </div>
            </div>

            <div className="w3-row">
                <div className="w3-col s3">
                <i className="fa fa-diamond w3-text-white w3-jumbo"></i>
                <p>Sharp</p>
                </div>
                <div className="w3-col s3">
                <i className="fa fa-cloud w3-text-blue w3-jumbo"></i>
                <p>Cloud</p>
                </div>
                <div className="w3-col s3">
                <i className="fa fa-globe w3-text-amber w3-jumbo"></i>
                <p>Global</p>
                </div>
                <div className="w3-col s3">
                <i className="fa fa-hdd-o w3-text-cyan w3-jumbo"></i>
                <p>Storage</p>
                </div>
            </div>
            
            <div className="w3-row">
                <div className="w3-col s3">
                <i className="fa fa-user w3-text-sand w3-jumbo"></i>
                <p>Safe</p>
                </div>
                <div className="w3-col s3">
                <i className="fa fa-shield w3-text-orange w3-jumbo"></i>
                <p>Stabile</p>
                </div>
                <div className="w3-col s3">
                <i className="fa fa-wifi w3-text-grey w3-jumbo"></i>
                <p>Connected</p>
                </div>
                <div className="w3-col s3">
                <i className="fa fa-image w3-text-pink w3-jumbo"></i>
                <p>HD</p>
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
            <footer class="w3-container w3-padding-32 w3-light-grey w3-center w3-xlarge">
                <div class="w3-section">
                    <i class="fa fa-facebook-official w3-hover-opacity"></i>
                    <i class="fa fa-instagram w3-hover-opacity"></i>
                    <i class="fa fa-snapchat w3-hover-opacity"></i>
                    <i class="fa fa-pinterest-p w3-hover-opacity"></i>
                    <i class="fa fa-twitter w3-hover-opacity"></i>
                    <i class="fa fa-linkedin w3-hover-opacity"></i>
                </div>
                    <p class="w3-medium">Powered by 2 minut Networks</p>
               


                </footer>

                    

                {/* </body> */}


            </div> 

        );
    }
}
export default LandingPage;

