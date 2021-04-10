import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Row } from 'reactstrap';
import authService from "../../../authentication/auth.service";
import userService from "../../../authentication/user.service";
import CustNavbarProfile from "./CustNavbarProfile";

export default class RegisterWorkDesc extends Component {
  constructor(props) {
    super(props);
    this.handleWorkDesc = this.handleWorkDesc.bind(this);
    this.onChangeWorkAmt = this.onChangeWorkAmt.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);

    this.state = {
      workAmount: "",
      description: "",
      location: "",
      category: "",
      successful: false,
      message: "",
      redirect: null
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
    const currentUser = authService.getCurrentUser();
    if (currentUser && !(currentUser.category != 'CUSTOMER')) {
      userService.getPublicContent(currentUser.id).then(Response => this.setState({ data: Response.data })).catch()
      this.setState({ currentUser: currentUser, userReady: true, redirect: true });
    }
  }
  
  onChangeWorkAmt(e) {
    this.setState({
      workAmount: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeLocation(e) {
    this.setState({
      location: e.target.value
    });
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value
    });
  }


  handleWorkDesc(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });

    authService.addWorkDesc(
      authService.getCurrentUser().id,
      this.state.workAmount,
      this.state.description,
      this.state.location,
      this.state.category
    ).then(
      response => {
        this.setState({
          message: response.data.message,
          successful: true
        });
        this.props.history.push('/profile/CUSTOMER');
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          successful: false,
          message: resMessage
        });
      }
    );
  }

  render() {
    return (
      <div>
        <CustNavbarProfile id={authService.getCurrentUser().id} name={authService.getCurrentUser().fName} />
        <Container style={{ textAlign: 'center' }}>
          <Row>
            <Col md={3}>

            </Col>
            <Col md={6}>
            <br/><br/>
              <h1 className="text-center my-3">Add Work Description</h1>
              <br/><br/><br/><br/>
              <Form onSubmit={this.handleWorkDesc} style={{ padding: '15px', borderBlockColor: 'white', width: '500px', border: 'solid', backgroundColor: 'white' }}>
                <FormGroup>
                  <label for="amount"> Work Amount</label>
                  <Input required type="text" placeholder="Work Amount" name="amount" id="amt"
                    value={this.state.workAmount}
                    onChange={this.onChangeWorkAmt} />
                </FormGroup>
                <FormGroup>
                  <label for="work">Work Description</label>
                  <Input required type="text" placeholder="Work Description" name="desc" id="desc"
                    value={this.state.description}
                    onChange={this.onChangeDescription} />
                </FormGroup>
                <FormGroup>
                  <label for="exampleSelect">Work Category</label>
                  <Input required type="select" name="CUSTOMER" id="CUSTOMER"
                    value={this.state.category}
                    onChange={this.onChangeCategory} >
                    <option></option>
                    <option>PLUMBER</option>
                    <option>ELECTRICIAN</option>
                    <option>MECHANIC</option>
                    <option>CARPENTER</option>
                    <option>AUTOMOTIVE_TECHNICIAN</option>
                    <option>WELDER</option>
                    <option>PAINTER</option>
                    <option>HOUSE_CLEANING</option>
                    <option>ELECTRONIC_REPAIRER</option>
                  </Input>
                </FormGroup>
                <FormGroup>

                  <label for="exampleSelect">City</label>
                  <Input required type="select" name="city" id="city"
                    value={this.state.location}
                    onChange={this.onChangeLocation} >
                    <option></option>
                    <option>PUNE</option>
                    <option>MUMBAI</option>
                    <option>NAGPUR</option>
                    <option>BHOPAL</option>
                    <option>INDORE</option>
                    <option>AHMEDABAD</option>
                    <option>JAIPUR</option>
                    <option>NOIDA</option>
                    <option>BANGALORE</option>
                  </Input>
                </FormGroup>

                <Container className="text-center">
                  <Button color="success" type="submit">Add</Button>
                  <Button color="warning ml-3" type="reset">Clear</Button>
                </Container>
              </Form>
              <div><br /><br /></div>
              <Link to="/profile/CUSTOMER" action><Button color="warning">Back</Button></Link>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}