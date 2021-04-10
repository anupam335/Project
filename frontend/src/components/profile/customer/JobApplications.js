import React, { useEffect, useState } from 'react';
import axios from 'axios';
import base_url from '../../../api/bootapi';
import authHeader from '../../../authentication/auth-header';
import { Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import authService from '../../../authentication/auth.service';
import CustNavbarProfile from './CustNavbarProfile';
import { toast, ToastContainer } from 'react-toastify';

const JobApplications = () => {

    const [customerData, setCustomerData] = useState();
    const [correct, setCorrect] = useState();

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (!currentUser || currentUser.category != 'CUSTOMER') {
            redirect();
        }
        setCorrect(true);
        if (currentUser && !(currentUser.category != 'CUSTOMER')) {
            axios.get(`${base_url}/user/jobApplications/${authService.getCurrentUser().id}`, { headers: authHeader() }).then((res) => {
                console.log(res.data);
                setCustomerData(res.data);
            });
        }
    }, []);

    
    let history = useHistory();
    
    let historys = useHistory();

    const redirect = () => {
        history.push("/");
    }

    const hireWorker = (workId, workerId) => {
        axios.get(`${base_url}/user/hireWorker/${workId}/${authService.getCurrentUser().id}/${workerId}`, { headers: authHeader() }).then((res) => {
            console.log(res.data);
            window.alert("Worker with ID "+ workerId+ " hired Successfully");
            historys.push("/profile/CUSTOMER");
            
        }, (error) => {
            toast.error("error");
        });
    }

    return <div> {
        correct ? (
            <div>
                <ToastContainer />
                <div>{
                    !customerData ? (<h1 className="text-center" style={{ color: 'red' }}>No Job Applications</h1>) : (
                        <div>
                            <CustNavbarProfile id={authService.getCurrentUser().id} name={authService.getCurrentUser().fName} />
                            <table className="table table-bordered table-success">
                                <thead className="table-dark">
                                    <tr>
                                        <th className="text-center">Worker Name</th>
                                        <th className="text-center">Contact No</th>
                                        <th className="text-center">Category</th>
                                        <th className="text-center">Work Id</th>
                                        <th className="text-center">Worker Id</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="table-primary">
                                    {
                                        customerData.map((worker, index) => (
                                            <tr key={index}>
                                                <td className="text-center">{worker.fName} {worker.lName}</td>
                                                <td className="text-center">{worker.phoneNo}</td>
                                                <td className="text-center">{worker.category}</td>
                                                <td className="text-center">{worker.workId}</td>
                                                <td className="text-center">{worker.workerId}</td>
                                                <td className="text-center"><Button type="button" className="btn-success" onClick={() => { hireWorker(worker.workId, worker.workerId) }}>HIRE</Button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    )
                }
                    <div><br /><br /><br /><br /></div>
                    <div className="text-center"><Link to="/profile/CUSTOMER" action><Button className="btn-warning btn">Back</Button></Link></div>
                </div>
            </div>) : null}
    </div>

}
export default JobApplications;