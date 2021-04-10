import React, { Component } from 'react';
import whatsapp from './logo/whatsapp.png';
import insta from './logo/insta.png';
import twitter from './logo/twitter.png';

class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div style={{backgroundColor:'darkblue',color:'white', height:'200px'}}>
                <footer className = "footer">
                    <div className="text-center">
                        <h3>About Us</h3>
                        <hr />
                        <h4>Serving In</h4>
                        <h6>PUNE &nbsp;&nbsp;&nbsp;MUMBAI &nbsp;&nbsp;&nbsp;AHEMDABAD &nbsp;&nbsp;&nbsp;BHOPAL &nbsp;&nbsp;&nbsp;NOIDA &nbsp;&nbsp;&nbsp;INDORE &nbsp;&nbsp;&nbsp;JAIPUR &nbsp;&nbsp;&nbsp;BANGLORE &nbsp;&nbsp;&nbsp;NAGPUR</h6>
                        Contact Us : <img src={whatsapp} style={{width:'20px',height:'20px'}}/>&nbsp;&nbsp;<img src={insta} style={{width:'20px',height:'20px'}}/>&nbsp;&nbsp;<img src={twitter} style={{width:'20px',height:'20px'}}/>
                    </div>
                </footer>
            </div>
        )
    }
}

export default FooterComponent;
