import React, { useEffect, useState } from 'react';
import axios from 'axios';
import base_url from '../../../api/bootapi';
import authHeader from '../../../authentication/auth-header';
import { Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import authService from '../../../authentication/auth.service';
import CustNavbarProfile from './CustNavbarProfile';

const DisplayJobs = () => {

    const [workData, setWorkData] = useState();
    const [correct, setCorrect] = useState();

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (!currentUser || currentUser.category != 'CUSTOMER') {
            redirect();
        }
        setCorrect(true);
        if (currentUser && !(currentUser.category != 'CUSTOMER')) {
            axios.get(`${base_url}/user/getWorkDesc/${authService.getCurrentUser().id}`, { headers: authHeader() }).then((res) => {
                console.log(res.data);
                setWorkData(res.data);
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
                    !workData ? (<h1 className="text-center" style={{ color: 'red' }}>No Jobs Found</h1>) : (
                        <table className="table table-bordered table-success">
                            <thead className="table-dark">
                                <tr>
                                    <th className="text-center">Job Code</th>
                                    <th className="text-center">Work Amount</th>
                                    <th className="text-center">Work Description</th>
                                    <th className="text-center">Location</th>
                                    <th className="text-center">Work Category</th>

                                </tr>
                            </thead>
                            <tbody className="table-primary">
                                {
                                    workData.map((user, index) => (
                                        <tr key={index}>
                                            <td className="text-center">{user.workId}</td>
                                            <td className="text-center">{user.workAmount}</td>
                                            <td className="text-center">{user.description}</td>
                                            <td className="text-center">{user.location}</td>
                                            <td className="text-center">{user.category}</td>

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
export default DisplayJobs;