import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import base_url from '../../../api/bootapi';
import authHeader from '../../../authentication/auth-header';
import authService from '../../../authentication/auth.service';
import { toast, ToastContainer } from 'react-toastify';

const WorkerListByType = () => {

    const [workData, setWorkData] = useState();

    let btnRef = useRef();
    let btnRefs = useRef();

    var url=`${base_url}/user/getWorkDescCat/${authService.getCurrentUser().category}`;

    useEffect(() => {
        axios.get(url,{headers:authHeader()}).then((res) => {
            console.log(res.data);
            setWorkData(res.data);
        });
    },[url]);

    const applyJob=(workId)=>{
        axios.get(`${base_url}/user/applyForJob/${authService.getCurrentUser().id}/${workId}`,{headers:authHeader()}).then((res) => {
            console.log(res.data);
            toast.success("Applied For Job Successfully");
        },(error)=>{
            toast.error("Already Applied");
        });
        
        if(btnRef.current){
            btnRef.current.setAttribute("disabled", "disabled");
          }
    }

    const cancelJob=(workIds)=>{
        axios.delete(`${base_url}/user/deleteAppliedJob/${authService.getCurrentUser().id}/${workIds}`,{headers:authHeader()}).then((res) => {
            console.log(res.data);
            toast.success("Applied Job Cancelled Successfully");
        },(error)=>{
            toast.error("Not Applied for the Job ");
        });
        
        if(btnRefs.current){
            btnRefs.current.setAttribute("disabled", "disabled");
          }
    }

    return <div>
        <ToastContainer />
        {
        !workData ? (<h1 className="text-center" style={{color : 'red'}}>No Work Found</h1>) : (
            <table className="table table-bordered">
                <thead className="table-dark" style={{backgroundColor:'white'}}>
                    <tr style={{color:'black'}}>
                        <th className="text-center">Salary</th>
                        <th className="text-center">Work</th>
                        <th className="text-center">Location</th>
                        <th className="text-center">Work Type</th>
                        <th className="text-center">Click To Apply</th>
                        <th className="text-center">Click To Cancel</th>
                    </tr>
                </thead>
                <tbody className="table-success" style={{fontWeight:'bold'}}>
                    {
                        workData.map((workDescription, index) => (
                            <tr key={index}>
                                <td className="text-center">{workDescription.workAmount}</td>
                                <td className="text-center">{workDescription.description}</td>
                                <td className="text-center">{workDescription.location}</td>
                                <td className="text-center">{workDescription.category}</td>
                                <td className="text-center"><Button ref={btnRef} type="button" onClick={()=>{applyJob(workDescription.workId)}}>Apply</Button></td>
                                <td className="text-center"><Button ref={btnRefs} type="button" onClick={()=>{cancelJob(workDescription.workId)}}>Cancel</Button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }
    </div>

}
export default WorkerListByType;