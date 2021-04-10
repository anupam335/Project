import React, { Component } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import authService from '../../../authentication/auth.service';
import userService from '../../../authentication/user.service';

import WorkerNavbarProfile from './WorkerNavbarProfile';

class UpdateWorkerProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fName: '',
            lName: '',
            email: '',
            dob: '',
            phone: '',
            gender: '',
            houseNo: '',
            street: '',
            city: '',
            correct: false,
            url: ''
        }
    }

    componentDidMount() {
        const currentUser = authService.getCurrentUser();
        if (!currentUser || !(currentUser.category != 'CUSTOMER') || !(currentUser.category != 'ADMIN')) {
            this.props.history.push("/");
        }
        if (currentUser && (currentUser.category != 'CUSTOMER') && (currentUser.category != 'ADMIN')) {
            userService.getPublicContent(authService.getCurrentUser().id)
                .then((res) => {
                    let user = res.data;
                    this.setState({
                        fName: user.fName,
                        lName: user.lName,
                        dob: user.dob,
                        email: user.email,
                        phone: user.phoneNo,
                        gender: user.gender,
                        houseNo: user.address.houseNo,
                        street: user.address.street,
                        city: user.address.city
                    })
                });
            this.setState({ correct: true, url: `/profile/ViewProfileWorker/${authService.getCurrentUser().id}` });
        }
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveUser = (e) => {
        e.preventDefault();
        let address = { houseNo: this.state.houseNo, street: this.state.street, city: this.state.city }
        authService.updateUser(authService.getCurrentUser().id, this.state.fName, this.state.lName, this.state.email, this.state.dob, this.state.phone, this.state.gender, address)
            .then(res => {
                this.setState({ message: 'User added successfully.' });
                this.props.history.push(`/profile/ViewProfileWorker/${authService.getCurrentUser().id}`);
            });
    }

    render() {

        return <div> {
            (this.state.correct) ?
                <div>
                    <WorkerNavbarProfile id={authService.getCurrentUser().id} name={this.state.fName} />
                    <div><br /></div>
                    <Container style={{ textAlign: 'center' }}>
                        <Row>
                            <Col md={4}>

                            </Col>
                            <Col md={4}>
                                <h2 className="text-center">Update Profile</h2>
                                <div><br /><br /></div>
                                <form className="updateForm" style={{ padding: '15px', borderBlockColor: 'white', width: '400px', border: 'solid', backgroundColor: 'white' }}>

                                    <div className="form-group">
                                        <label>First Name:</label>
                                        <input required defaultValue={this.state.fName} type="text" name="fName" className="form-control" value={this.state.fName} onChange={this.onChange} />
                                    </div>

                                    <div className="form-group">
                                        <label>Last Name:</label>
                                        <input required defaultValue={this.state.lName} type="text" name="lName" className="form-control" value={this.state.lName} onChange={this.onChange} />
                                    </div>

                                    <div className="form-group">
                                        <label>Email</label>
                                        <input required defaultValue={this.state.email} type="text" name="email" className="form-control" value={this.state.email} onChange={this.onChange} />
                                    </div>

                                    <div className="form-group">
                                        <label>Phone No</label>
                                        <input required type="number" name="phone" className="form-control" value={this.state.phone} onChange={this.onChange} />
                                    </div>

                                    <div className="form-group">
                                        <label>Gender</label>
                                        <input defaultValue={this.state.gender} type="text" name="email" className="form-control" readOnly="true" />
                                    </div>

                                    <div className="form-group">
                                        <label>House No</label>
                                        <input required defaultValue={this.state.houseNo} type="number" name="houseNo" className="form-control" value={this.state.houseNo} onChange={this.onChange} />
                                    </div>

                                    <div className="form-group">
                                        <label>Street</label>
                                        <input required defaultValue={this.state.street} type="text" name="street" className="form-control" value={this.state.street} onChange={this.onChange} />
                                    </div>

                                    <div className="form-group">
                                        <label>City</label>
                                        <input defaultValue={this.state.city} type="text" name="city" className="form-control" readOnly="true" />
                                    </div>
                                    <div className="text-center">
                                        <button className="btn btn-success" onClick={this.saveUser}>Update</button>
                                        <Link to={this.state.url} action><Button className="ml-3" color="warning">Back</Button></Link>
                                    </div>
                                </form>
                            </Col>
                            <Col md={4}>

                            </Col>
                        </Row>
                    </Container>
                </div> : null}
        </div>
    }
}

export default UpdateWorkerProfile;