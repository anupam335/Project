import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Row, Col } from 'reactstrap';
import AdminServiceCard from './AdminServiceCard';
import { Link } from 'react-router-dom';
import admin from './images/admin.gif';

const ServiceCardContent = () => {
    return (
        <div>
            <br /><br />
            <h1 className="myText"><img src={admin} alt={""} style={{ width: '400px', textAlign: 'left' }} /></h1>
            <br /><br />
            <Container>
                <Row>
                    <Col md={4}>
                        <h1 className="myText" style={{color:'white'}}>Manage Customer</h1>
                    </Col>
                    <Col md={4}>

                    </Col>
                    <Col md={4}>
                        <h1 className="myText" style={{color:'white'}}>Manage Worker</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <AdminServiceCard service="Customer"
                            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH4Pl6Zp3WblPR_ycAD3epApPc8nMLiSgRFA&usqp=CAU" />
                        <div>
                            <br />
                        </div>
                        <div className="text-center">
                            <Link to="/customer-list" action><Button className="btn btn-dark btn-outline-light">VIEW CUSTOMER LIST</Button></Link>
                        </div>
                        <div>
                            <br />
                        </div>
                        <div className="text-center">
                            <Link to="/search-customer" action><Button className="btn btn-dark btn-outline-light">SEARCH CUSTOMER BY EMP CODE</Button></Link>
                        </div>
                        <div>
                            <br />
                        </div>
                        <div className="text-center">
                            <Link to="/delete-customer" action><Button className="btn btn-dark btn-outline-light">DELETE CUSTOMER BY EMP CODE</Button></Link>
                        </div>
                        <div>
                            <br />
                        </div>
                        <div className="text-center">
                            <Link to="/search-workhist" action><Button className="btn btn-dark btn-outline-light">SEARCH USER HISTORY BY EMP CODE</Button></Link>
                        </div>
                    </Col>
                    <Col md={4}>

                    </Col>
                    <Col md={4}>
                        <AdminServiceCard service="Worker"
                            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGh7P6O5hKttb1n2ttV_dO1I5SDTsHXYQ0WQ&usqp=CAU" />
                        <div className="text-center">
                            <Link to="/worker-list" action><Button className="btn btn-dark btn-outline-light">VIEW WORKER LIST</Button></Link>
                        </div>
                        <div>
                            <br />
                        </div>
                        <div className="text-center">
                            <Link to="/search-worker" action><Button className="btn btn-dark btn-outline-light">SEARCH WORKER BY EMP CODE</Button></Link>
                        </div>
                        <div>
                            <br />
                        </div>
                        <div className="text-center">
                            <Link to="/search-worker-cat" action><Button className="btn btn-dark btn-outline-light">SEARCH WORKER BY WORK TYPE</Button></Link>
                        </div>
                        <div>
                            <br />
                        </div>
                        <div className="text-center">
                            <Link to="/delete-worker" action><Button className="btn btn-dark btn-outline-light">DELETE Worker BY EMP CODE</Button></Link>
                        </div>
                        </Col>
                </Row>

            </Container>
        </div>

    );
}

export default ServiceCardContent;