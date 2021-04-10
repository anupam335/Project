import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
import authService from '../../authentication/auth.service';
import FooterComponent from './FooterComponent';
import NavBar from './Navbar';
import SlideCustServ from './SlideCustServ';
import Slideshow from './Slideshow';
import p2 from './utils/p2.gif';
import welcome from './utils/welcome.gif';

const Home = () => {

    useEffect(() => {
        authService.logout();
    })

    return (
        <div>
            <div>
                <NavBar />
                <br />
                <h1 className="text-center"><img src={welcome} style={{ width: '400px' }} /></h1>
                <br />
            </div>
            <div className="text-center">
                <Row>
                    <Col>
                        <h1 style={{color:'lightgray'}}>Customer Services</h1>

                        <br />
                        <br />
                        <div style={{ height: '500px', width: '500px',marginLeft:'230px' }}>

                            <SlideCustServ />
                            <br /><br />
                            <img src={p2} style={{ width: '220px' }} />
                            <br /><br />
                            <Link tag="a" to="/add-customer" action><Button className="btn-light" style={{height:'80px',fontWeight:'bolder'}}>Register as Customer</Button></Link>
                        </div>

                    </Col>
                    <Col>
                        <h1 style={{color:'lightgray'}}>Worker Services</h1>
                        <br />
                        <br />
                        <div style={{ height: '600px', width: '600px', marginLeft: '170px' }}>
                            <Slideshow />
                            <br />
                            <h3 style={{ backgroundColor: 'lightgray' }}>WORKER WITH ANY KIND OF SKILL SET CAN REGISTER ON OUR APP</h3>
                            <br /><br />
                            <Link tag="a" to="/add-worker" action><Button className="btn-light" style={{height:'80px',fontWeight:'bolder'}}>Register as Worker</Button></Link>
                        </div>
                    </Col>
                </Row>
            </div>
            <div>
            <br /><br /><br /><br /> 
            </div>
            <div style={{ marginTop: '60px' }}>
                <FooterComponent />
            </div>
        </div>

    );
}

export default Home;