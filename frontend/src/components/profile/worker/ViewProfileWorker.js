import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import authService from '../../../authentication/auth.service';
import userService from '../../../authentication/user.service';
import WorkerNavbarProfile from './WorkerNavbarProfile';



const ViewProfileWorker = (props) => {
    const id = props.match.params.id;
    const [username, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [gender, setGender] = useState("");
    const [houseNo, setHouseNo] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [category, setCategory] = useState("");

    
    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (!currentUser || !(currentUser.category != 'CUSTOMER') || !(currentUser.category != 'ADMIN')) {
            redirect();
        }
        getUserDetails();
    });

    let history = useHistory();

    const redirect = () => {
        history.push("/");
    }

    const getUserDetails = () => {
        userService.getPublicContent(id).then(
            (response) => {
                setFirstName(response.data.fName);
                setLastName(response.data.lName);
                setEmail(response.data.email);
                setPassword(response.data.password);
                setDateOfBirth(response.data.dob);
                setPhoneNo(response.data.phoneNo);
                setGender(response.data.gender);
                setHouseNo(response.data.address.houseNo);
                setStreet(response.data.address.street);
                setCity(response.data.address.city);
                setCategory(response.data.workCategory);
            }, (error) => {
                console.log(error);
            }
        );
    };

    return (
        <div>
            <WorkerNavbarProfile id={id} name={firstName} />
            <div><br /><br /></div>
            <Container style={{ textAlign: 'center' }}>
                <Row>
                    <Col md={3}>

                    </Col>
                    <Col md={6}>
                        <h1 style={{ textAlign: 'center' }}>{firstName} {lastName}'s Profile Details</h1>
                        <div><br /><br /><br /></div>
                        <div>
                            <table className="table table-bordered table-success">
                                <tr>
                                    <td>Name</td>
                                    <td>{firstName} {lastName}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{email}</td>
                                </tr>
                                <tr>
                                    <td>Password</td>
                                    <td>******</td>
                                </tr>
                                <tr>
                                    <td>Date of Birth</td>
                                    <td>{dateOfBirth}</td>
                                </tr>
                                <tr>
                                    <td>Contact No.</td>
                                    <td>{phoneNo}</td>
                                </tr>
                                <tr>
                                    <td>Gender</td>
                                    <td>{gender}</td>
                                </tr>
                                <tr>
                                    <td>Work Category</td>
                                    <td>{category}</td>
                                </tr>
                                <tr>
                                    <td>House No.</td>
                                    <td>{houseNo}</td>
                                </tr>
                                <tr>
                                    <td>Street</td>
                                    <td>{street}</td>
                                </tr>
                                <tr>
                                    <td>City</td>
                                    <td>{city}</td>
                                </tr>
                                <tr>
                                    <td><Link to="/update-worker-profile" action><Button color="primary">Update</Button></Link></td>
                                    <td><Link to="/profile/WORKER" action><Button color="warning">Back</Button></Link></td>
                                </tr>
                            </table>
                        </div>
                    </Col>
                    <Col md={3}>

                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default ViewProfileWorker;