import React, { useEffect, useState } from 'react';
import axios from 'axios';
import base_url from '../../../api/bootapi';
import authHeader from '../../../authentication/auth-header';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Card, CardBody, CardTitle, Input } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import authService from '../../../authentication/auth.service';
import AdminNavbarProfile from './AdminNavbarProfile';

const DeleteWorker = () => {

    const [customerData, setCustomerData] = useState();
    const [id, setId] = useState();
    const [status, setStatus] = useState();
    const [correct, setCorrect] = useState();

    const inputEvent = (e) => {
        const data = e.target.value;
        setId(data);
    }

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (!currentUser || currentUser.category != 'ADMIN') {
            redirect();
        }
        setCorrect(true);
    })

    let history = useHistory();

    const redirect = () => {
        history.push("/");
    }

    
    const handleForm = (e) => {
        searching(id);
        setStatus(true)
    };

    const handleDelete = (e) => {
        deleting(id);
        
    };

    const searching = (id) => {
        axios.get(`${base_url}/user/getUserByTypeId/WORKER/${id}`, { headers: authHeader() }).then((res) => {
            console.log(res.data);
            setCustomerData(res.data);
            toast.success("Worker With ID " + id + " loaded Successfully");
        },
            (error) => {
                setCustomerData("")
            });
    };

    const deleting = (id) => {
        axios.delete(`${base_url}/user/delete/${id}`, { headers: authHeader() }).then((res) => {
            console.log(res.data);
            window.location.reload();
            toast.success("Worker Deleted Successfully");
        }, (error) => {
            console.log(error);
            console.log("error");
            toast.error("Worker Deletion Failed");
        }
        );
    };

    const currentUser = authService.getCurrentUser();

    return <div> {
        correct ? (
        <div>
            <ToastContainer />
            <AdminNavbarProfile id={currentUser.id} name={currentUser.fName} />
            <div style={{ height: '150px', backgroundColor: 'grey' }}>
                <div className="text-center" style={{ color: 'white' }}>
                    <h2>Enter Customer Id</h2>
                    <div style={{ marginLeft: '930px' }}>
                        <Input style={{ width: '200px' }} type="number" value="id" name="id" value={id} onChange={inputEvent}
                        /><br />
                    </div>
                    <Button className="btn-primary" onClick={handleForm}>Search</Button>
                </div>
            </div>
            <div> {
                !status ? ("") : (
                    <div>{
                        !customerData ? (<h1 style={{ color: 'red' }} className="text-center">No Worker Found</h1>) : (
                            <Card style={{ backgroundColor: 'lightgreen', color: 'white', height: '550px', width: '500px' }}>
                                <CardBody style={{ textAlign: 'center', color: 'black' }}>
                                    <CardTitle style={{ color: 'black' }} tag="h2" >Name : {customerData.fName + " " + customerData.lName}</CardTitle>
                                    <hr />
                                    <h5>Email : {customerData.email}</h5>
                                    <h5>Date of Birth : {customerData.dob}</h5>
                                    <h5>Phone No.  : {customerData.phoneNo}</h5>
                                    <h5>Gender : {customerData.gender}</h5>
                                    <h5>Work Category : {customerData.workCategory}</h5>
                                    <hr />
                                    <CardTitle style={{ color: 'black' }} tag="h2" >Address  :</CardTitle>
                                    <h5>City : {customerData.address.city}</h5>
                                    <h5>House No : {customerData.address.houseNo}</h5>
                                    <h5>Street : {customerData.address.street}</h5>
                                    <hr />
                                    <Button className="btn-danger" onClick={handleDelete}>DELETE</Button>
                                </CardBody>
                            </Card>
                        )
                    }
                    </div>
                )
            }
            </div>
            <div className="text-center mt-3"><Link to="/profile/ADMIN" action><Button className="btn-warning btn">Back</Button></Link></div>
        </div>) : null }
    </div>
}
export default DeleteWorker;