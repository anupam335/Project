import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import AuthService from "../../../authentication/auth.service";
import userService from "../../../authentication/user.service";
import TotalWorkerList from "./TotalWorkerList";
import WorkerListByType from "./WorkerListByType";
import WorkerNavbarProfile from "./WorkerNavbarProfile";
import h from './images/h.gif';
import { Card } from "@material-ui/core";
import { Button } from "react-bootstrap";

export default class WorkerProfiles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      data: [],
      currentUser: { username: "" }
    };
  }

  renderRedirect = () => {
    if (!this.state.redirect) {
      return (
        <Redirect to="/" />
      );
    }
  };

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser && (currentUser.category != 'CUSTOMER') && (currentUser.category != 'ADMIN')) {
      userService.getPublicContent(currentUser.id).then(Response => this.setState({ data: Response.data })).catch()
      this.setState({ currentUser: currentUser, userReady: true, redirect: true });
    }
  }

  render() {

    return (
      <div>
        <WorkerNavbarProfile id={this.state.data.userId} name={this.state.data.fName} />
        <div>
          {(this.state.userReady) ?
            <div style={{ textAlign: 'center' }}>
              <img src={h} alt={""} style={{ width: '250px' }} />
              <h1>WELCOME TO WORKER PAGE</h1>
              <div style={{ textAlign: 'center', background: 'transparent', borderBlockColor: 'transparent' }} className="jumbotron">
                <Row>
                  <Col md={5}>
                    <h2>Jobs For Your Profile</h2>
                      <WorkerListByType />
                  </Col>
                  <Col md={2}>
                  <div>
                        <Card style={{background:"transparent", width:'300px',height:'200px', marginTop:'30px',border:'solid'}}>
                            <div className="text-center">
                                <h2 style={{color:'green'}}>View Your Current Jobs</h2>
                                <br /><br />
                                <Link to="/successful-jobs"><Button style={{height:'60px'}} className="btn-danger">View</Button></Link>
                            </div>
                        </Card>
                        </div>
                  </Col>
                  <Col md={5}>
                    <h2>Other Jobs</h2>
                    <TotalWorkerList />
                  </Col>
                </Row>

              </div>


            </div> : 
            <div className="jumbotron text-center" style={{ width: '50%', marginLeft: '25%' }}>
            <h1>Can Not Proceed Without Login</h1>
            <br /><br />
            <Link to="/login"><Button className="btn-warning">Login</Button></Link>
          </div>}
        </div>
      </div>
    );
  }
}
