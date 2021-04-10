import React from 'react';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import Navbar from '../home/Navbar';

const contact = () => {
    return (
        <div>
            <Navbar />
            <h1 className="text-center">Project Contributors</h1>
            <div>
                <Row>
                    <Col sm="6">
                        <Card body style={{width:'250px',background:'lightgreen'}}>
                            <CardTitle tag="h5">Anupam Singh</CardTitle>
                            <CardText>Frontend Developer</CardText>
                        </Card>
                    </Col>
                    <Col sm="6">
                        <Card body style={{width:'250px',background:'lightgreen'}}>
                            <CardTitle tag="h5">Apurv Gupta</CardTitle>
                            <CardText>Backend Developer</CardText>
                            
                        </Card>
                    </Col>
                </Row>
            </div>
            <div>
                <Row>
                    <Col sm="6">
                        <Card body style={{width:'250px',background:'lightgreen'}}>
                            <CardTitle tag="h5">Umesh Kumar Sharma</CardTitle>
                            <CardText>UI Creator</CardText>
                            
                        </Card>
                    </Col>
                    <Col sm="6">
                        <Card body style={{width:'250px',background:'lightgreen'}}>
                            <CardTitle tag="h5">Anuja Tayde</CardTitle>
                            <CardText>UI Creator</CardText>
                            
                        </Card>
                    </Col>
                </Row>
            </div>
            <div>
                <Row>
                    <Col sm="6">
                        <Card body style={{width:'250px',background:'lightgreen'}}>
                            <CardTitle tag="h5">Vaishali Jassal</CardTitle>
                            <CardText>Backend Developer</CardText>
                            
                        </Card>
                    </Col>
                    <Col sm="6">
                        <Card body style={{width:'250px',background:'lightgreen'}}>
                            <CardTitle tag="h5">Sumit Singh</CardTitle>
                            <CardText>Frontend Developer</CardText>
                            
                        </Card>
                    </Col>
                </Row>
            </div>
            <div>
                <Row>
                    <Col>
                        <Card body style={{width:'250px',background:'lightgreen'}}>
                            <CardTitle tag="h5">Guided By</CardTitle>
                            <CardText>Mr.Shakir Hussain</CardText>
                            
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>

    );
};

export default contact;