import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import AuthService from "../../../authentication/auth.service";
import userService from "../../../authentication/user.service";
import CustNavbarProfile from "./CustNavbarProfile";
import CustServiceCardContent from "./CustServiceCardContent";


export default class CustomerProfiles extends Component {
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
    if (currentUser && !(currentUser.category != 'CUSTOMER')) {
      userService.getPublicContent(currentUser.id).then(Response => this.setState({ data: Response.data })).catch()
      this.setState({ currentUser: currentUser, userReady: true, redirect: true });
    }
  }

  render() {
   
    return (
      <div style={{ textAlign: 'center' }}>
        <CustNavbarProfile id={this.state.data.userId} name={this.state.data.fName} />
        <div style={{ textAlign: 'center' }}>
          {(this.state.userReady) ?
            <div style={{ textAlign: 'center' }}>
              <CustServiceCardContent style={{ textAlign: 'center' }} />
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
