import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import authHeader from '../../../authentication/auth-header';
import base_url from '../../../api/bootapi';
import authService from '../../../authentication/auth.service';
import { useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const TotalWorkerList = () => {


    const [workData, setWorkData] = useState();
    const [correct, setCorrect] = useState();

    let btnRef = useRef();
    let btnRefs = useRef();


    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (!currentUser || !(currentUser.category != 'CUSTOMER') || !(currentUser.category != 'ADMIN')) {
            redirect();
        }
        setCorrect(true);
        if (currentUser && (currentUser.category != 'CUSTOMER') && (currentUser.category != 'ADMIN')) {
            axios.get(`${base_url}/user/getTotalWorkDesc/${authService.getCurrentUser().category}`, { headers: authHeader() }).then((res) => {
                console.log(res.data);
                setWorkData(res.data);
            });
        }
    }, []);

    let history = useHistory();

    const redirect = () => {
        history.push("/");
    }

    const applyJob = (workId) => {
        axios.get(`${base_url}/user/applyForJob/${authService.getCurrentUser().id}/${workId}`, { headers: authHeader() }).then((res) => {
            console.log(res.data);
            toast.success("Applied For Job Successfully");
        }, (error) => {
            toast.error("Already Applied");
        });

        if (btnRef.current) {
            btnRef.current.setAttribute("disabled", "disabled");
        }
    }

    const cancelJob = (workIds) => {
        axios.delete(`${base_url}/user/deleteAppliedJob/${authService.getCurrentUser().id}/${workIds}`, { headers: authHeader() }).then((res) => {
            console.log(res.data);
            toast.success("Applied Job Cancelled Successfully");
        }, (error) => {
            toast.error("Not Applied for the Job ");
        });

        if (btnRefs.current) {
            btnRefs.current.setAttribute("disabled", "disabled");
        }
    }


    return <div>
        <ToastContainer />
        {
            !workData ? (<h1 className="text-center" style={{ color: 'red' }}>No Work Found</h1>) : (
                <table className="table table-bordered" style={{ color: 'black' }}>
                    <thead className="table-dark" style={{ backgroundColor: 'white' }}>
                        <tr style={{ color: 'black' }}>
                            <th className="text-center">Salary</th>
                            <th className="text-center">Work</th>
                            <th className="text-center">Location</th>
                            <th className="text-center">Work Type</th>
                            <th className="text-center">Click To Apply</th>
                            <th className="text-center">Click To Cancel</th>
                        </tr>
                    </thead>
                    <tbody className="table-primary" style={{ fontWeight: 'bold' }}>
                        {
                            workData.map((workDescription, index) => (
                                <tr key={index}>
                                    <td className="text-center">{workDescription.workAmount}</td>
                                    <td className="text-center">{workDescription.description}</td>
                                    <td className="text-center">{workDescription.location}</td>
                                    <td className="text-center">{workDescription.category}</td>
                                    <td className="text-center"><Button ref={btnRef} type="button" onClick={() => { applyJob(workDescription.workId) }}>Apply</Button></td>
                                    <td className="text-center"><Button ref={btnRefs} type="button" onClick={() => { cancelJob(workDescription.workId) }}>Cancel</Button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            )
        }
    </div>

}
export default TotalWorkerList;