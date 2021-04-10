import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import e from './images/e.gif';
import p from './images/p.gif';
import w from './images/w.gif';
import c from './images/c.gif';
import h from './images/h.gif';
import authService from '../../../authentication/auth.service';
import customer from './images/customer.gif';
import { Card } from '@material-ui/core';
import axios from 'axios';
import base_url from '../../../api/bootapi'
import authHeader from '../../../authentication/auth-header';

const CustServiceCardContent = () => {

    const [message, setMessage]=useState("");

    let btnRef = useRef();

    useEffect(() => {
        axios.get(`${base_url}/user/jobApplications/${authService.getCurrentUser().id}`, { headers: authHeader() }).then((res) => {
            console.log(res.data);
            setMessage("You Have A Notification .... Plz Check!!!")
        },(error)=>{
            setMessage("No Notifications");
            btnRef.current.setAttribute("disabled", "disabled");
        });
    }, []);


    const url = `/profile/add-work/${authService.getCurrentUser().id}`
    return (
        <div>
            <div className="text-center">
                <h1 className="text-center"><img src={customer} alt={""} style={{ width: '400px', textAlign: 'left' }} /></h1>
                <Row>
                    <Col md={5}>
                        <h1>ACTIONS</h1>
                    </Col>
                    <Col md={2}>

                    </Col>

                    <Col md={5}>
                        <h1>SERVICES AVAILABLE</h1>
                    </Col>
                </Row>
            </div>
            <div>
                <Row>
                    <Col md={5}>
                        <div>
                            <br />
                            <img src={c} alt={""} style={{ width: '170px', marginLeft: '20px' }} />
                            <br /><br />

                            <div className="text-center">
                                <Link to="/user-work-history"><Button className="btn btn-dark btn-outline-light" style={{ width: '150px', fontWeight:'bold' }}>VIEW WORK HISTORY</Button></Link>
                            </div>
                            <br />

                            <div className="text-center">
                                <Link to={url}><Button className="btn btn-dark btn-outline-light" style={{ width: '150px', fontWeight:'bold' }}>POST JOBS</Button></Link>
                            </div>
                            
                            <br />
                            <div className="text-center">
                                <Link to="/cust-worker-list"><Button className="btn btn-dark btn-outline-light" style={{ width: '150px', fontWeight:'bold' }}>VIEW WORKERS</Button></Link>
                            </div>
                            <br />

                            <div className="text-center">
                                <Link to="/search-cust-worker"><Button className="btn btn-dark btn-outline-light" style={{ width: '150px', fontWeight:'bold' }}>SEARCH WORKER BY WORKER ID</Button></Link>
                            </div>

                            <br />
                            <div className="text-center">
                                <Link to="/delete-jobs"><Button className="btn btn-dark btn-outline-light" style={{ width: '150px', fontWeight:'bold' }}>DELETE POSTED JOBS</Button></Link>
                            </div>

                            <br />
                            <div className="text-center">
                                <Link to="/display-jobs"><Button className="btn btn-dark btn-outline-light" style={{ width: '150px', fontWeight:'bold' }}>DISPLAY POSTED JOBS</Button></Link>
                            </div>
                        </div>
                    </Col>

                    <Col md={2}>
                        <div>
                        <Card style={{background:"transparent", width:'420px',height:'200px', marginRight:'20px', marginTop:'150px',border:'solid'}}>
                            <div className="text-center">
                                <h2 style={{color:'green'}}>{message}</h2>
                                <br /><br />
                                <Link to="/job-notifications"><Button ref={btnRef} style={{height:'60px'}} className="btn-danger">View Notifications</Button></Link>
                            </div>
                        </Card>
                        </div>
                    </Col>
                    <Col md={5}>
                        <div>
                            <br />
                            <div className="text-center">
                                <h2><u>HIRE</u></h2>
                            </div>
                            <div>
                                <img src={e} alt={""} style={{ width: '100px', textAlign: 'left' }} />
                                <h3>Electrician</h3>
                            </div>
                            <div>
                                <img src={p} alt={""} style={{ width: '100px', textAlign: 'left' }} />
                                <h3>Plumber</h3>
                            </div>
                            <br />
                            
                        </div>
                        <div>
                            <div>
                                <img src={h} alt={""} style={{ width: '100px', textAlign: 'left' }} />
                                <h3>House Cleaner</h3>
                            </div>
                            <div>
                                <img src={w} alt={""} style={{ width: '100px', textAlign: 'left' }} />
                                <h3>MUCH MORE</h3>
                            </div>
                            <br />
                            
                        </div>

                    </Col>
                </Row>
            </div>
        </div>

    );
}

export default CustServiceCardContent;