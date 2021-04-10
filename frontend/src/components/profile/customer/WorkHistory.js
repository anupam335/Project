import React, { useEffect, useState } from 'react';
import axios from 'axios';
import base_url from '../../../api/bootapi';
import authHeader from '../../../authentication/auth-header';
import { Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import authService from '../../../authentication/auth.service';
import CustNavbarProfile from './CustNavbarProfile';

const WorkHistory = () => {

    const [workerData, setWorkerData] = useState();
    const [correct, setCorrect] = useState();

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (!currentUser || currentUser.category != 'CUSTOMER') {
            redirect();
        }
        setCorrect(true);
        if (currentUser && !(currentUser.category != 'CUSTOMER')) {
            axios.get(`${base_url}/user/getWorkHistoryTypeId/${authService.getCurrentUser().id}`, { headers: authHeader() }).then((res) => {
                console.log(res.data);
                setWorkerData(res.data);
            });
        }
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
                    !workerData ? (<h1 className="text-center" style={{ color: 'red' }}>No Work History Found</h1>) : (
                        <table className="table table-bordered table-success">
                            <thead className="table-dark">
                                <tr>
                                    <th className="text-center">Work Category</th>
                                    <th className="text-center">Work Date</th>
                                    <th className="text-center">Salary</th>
                                    <th className="text-center">Location</th>
                                    <th className="text-center">Worker Id</th>
                                </tr>
                            </thead>
                            <tbody className="table-primary">
                                {
                                    workerData.map((user, index) => (
                                        <tr key={index}>
                                            <td className="text-center">{user.workCategory}</td>
                                            <td className="text-center">{user.workDate}</td>
                                            <td className="text-center">{user.salary}</td>
                                            <td className="text-center">{user.location}</td>
                                            <td className="text-center">{user.worker}</td>
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
export default WorkHistory;