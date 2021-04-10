import React, { useEffect, useState } from 'react';
import axios from 'axios';
import base_url from '../../../api/bootapi';
import authHeader from '../../../authentication/auth-header';
import { Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import authService from '../../../authentication/auth.service';
import CustNavbarProfile from './CustNavbarProfile';

const CustWorkerList = () => {

    const [workerData, setWorkerData] = useState();
    const [correct, setCorrect] = useState();

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (!currentUser || currentUser.category != 'CUSTOMER') {
            redirect();
        }
        setCorrect(true);
        axios.get(`${base_url}/user/list/WORKER`, { headers: authHeader() }).then((res) => {
            console.log(res.data);
            setWorkerData(res.data);
        });
    }, []);

    let history = useHistory();

    const redirect = () => {
        history.push("/");
    }


    const currentUser = authService.getCurrentUser();

    return <div> {
        correct ? (
            <div>
                <CustNavbarProfile id={currentUser.id} name={currentUser.fName} />
                <div>{
                    !workerData ? (<h1 className="text-center" style={{ color: 'red' }}>No Worker Found</h1>) : (
                        <table className="table table-bordered table-success">
                            <thead className="table-dark">
                                <tr>
                                    <th className="text-center">Worker Code</th>
                                    <th className="text-center">First Name</th>
                                    <th className="text-center">Last Name</th>
                                    <th className="text-center">Email</th>
                                    <th className="text-center">Date of Birth</th>
                                    <th className="text-center">Phone No.</th>
                                    <th className="text-center">Gender</th>
                                    <th className="text-center">Work Category</th>

                                </tr>
                            </thead>
                            <tbody className="table-primary">
                                {
                                    workerData.map((user, index) => (
                                        <tr key={index}>
                                            <td className="text-center">{user.userId}</td>
                                            <td className="text-center">{user.fName}</td>
                                            <td className="text-center">{user.lName}</td>
                                            <td className="text-center">{user.email}</td>
                                            <td className="text-center">{user.dob}</td>
                                            <td className="text-center">{user.phoneNo}</td>
                                            <td className="text-center">{user.gender}</td>
                                            <td className="text-center">{user.workCategory}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    )
                }
                    <div><br /><br /><br /><br /></div>
                    <div className="text-center"><Link to="/profile/CUSTOMER" action><Button className="btn-warning btn">Back</Button></Link></div>
                </div>
            </div>) : null}
    </div>

}
export default CustWorkerList;