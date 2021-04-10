import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import AuthService from "../../../authentication/auth.service";
import userService from "../../../authentication/user.service";
import AdminNavbarProfile from "./AdminNavbarProfile";
import ServiceCardContent from "./ServiceCardContent";
import { Link } from 'react-router-dom';

export default class AdminProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
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
    if (currentUser && !(currentUser.category != 'ADMIN')) {
      userService.getPublicContent(currentUser.id).then(Response => this.setState({ data: Response.data })).catch()
      this.setState({ currentUser: currentUser, userReady: true, redirect: true });
    }
  }

  render() {

    return (
      <div>
        <div>
          {(this.state.userReady) ?
            <div>
              <AdminNavbarProfile id={this.state.data.userId} name={this.state.data.fName} />
              <ServiceCardContent />
            </div> :
            <div className="jumbotron text-center" style={{width : '50%', marginLeft : '25%'}}>
              <h1>Invalid Session</h1>
              <br /><br />
              <Link to="/login"><Button className="btn-warning">Login Again</Button></Link>
            </div>}
        </div>
      </div>
    );
  }
}