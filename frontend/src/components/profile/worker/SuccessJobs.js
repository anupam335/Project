import React, { useEffect, useState } from 'react';
import axios from 'axios';
import base_url from '../../../api/bootapi';
import authHeader from '../../../authentication/auth-header';
import authService from '../../../authentication/auth.service';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import WorkerNavbarProfile from './WorkerNavbarProfile';

const SuccessJobs = () => {

    const [workData, setWorkData] = useState();
    const [correct, setCorrect] = useState();

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (!currentUser || !(currentUser.category != 'CUSTOMER') || !(currentUser.category != 'ADMIN')) {
            redirect();
        }
        setCorrect(true);
        if (currentUser && (currentUser.category != 'CUSTOMER') && (currentUser.category != 'ADMIN')) {
            axios.get(`${base_url}/user/successJobs/${authService.getCurrentUser().id}`, { headers: authHeader() }).then((res) => {
                console.log(res.data);
                setWorkData(res.data);
            });
        }
    }, []);

    let history = useHistory();

    const redirect = () => {
        history.push("/");
    }


    return <div> {
        correct ? (
            <div className="text-center">
                <WorkerNavbarProfile id={authService.getCurrentUser().id} name={authService.getCurrentUser().fName} />
                <div>
                    {
                        !workData ? (<h1 style={{ color: 'red', marginTop: '50px' }}>You are not hired for any jobs till now</h1>) : (
                            <table className="table table-bordered">
                                <thead className="table-dark" style={{ backgroundColor: 'white' }}>
                                    <tr style={{ color: 'black' }}>
                                        <th className="text-center">Salary</th>
                                        <th className="text-center">Work Category</th>
                                        <th className="text-center">Location</th>
                                        <th className="text-center">Work Date</th>
                                        <th className="text-center">Customer Contact No</th>
                                    </tr>
                                </thead>
                                <tbody className="table-success" style={{ fontWeight: 'bold' }}>
                                    {
                                        workData.map((workHist, index) => (
                                            <tr key={index}>
                                                <td className="text-center">{workHist.salary}</td>
                                                <td className="text-center">{workHist.workCategory}</td>
                                                <td className="text-center">{workHist.location}</td>
                                                <td className="text-center">{workHist.workDate}</td>
                                                <td className="text-center">{workHist.contact}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>

                            </table>

                        )
                    }
                </div>
                <div>
                    <br /><br />
                </div>
                <div className="text-center">
                    <Link to="/profile/WORKER" action><Button color="warning">Back</Button></Link>
                </div>
            </div>) : null}
    </div>

}
export default SuccessJobs;