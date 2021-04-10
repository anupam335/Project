import React, { useEffect, useState } from 'react';
import axios from 'axios';
import base_url from '../../../api/bootapi';
import authHeader from '../../../authentication/auth-header';
import { Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import authService from '../../../authentication/auth.service';
import AdminNavbarProfile from './AdminNavbarProfile';
import { toast, ToastContainer } from 'react-toastify';
import { Input } from 'reactstrap';

const SearchCustWorkHist = () => {

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
    });

    let history = useHistory();

    const redirect = () => {
        history.push("/");
    }

    const handleForm = (e) => {
        searching(id);
        setStatus(true)
    };

    const searching = (id) => {
        axios.get(`${base_url}/user/getWorkHistoryTypeId/${id}`, { headers: authHeader() }).then((res) => {
            console.log(res.data);
            setCustomerData(res.data);
            toast.success("User With ID " + id + " loaded Successfully", { position: 'bottom-center', });
        },
            (error) => {
                setCustomerData("")
            });
    };

    const currentUser = authService.getCurrentUser();

    return <div> {
        correct ? (
            <div>
                <ToastContainer />
                <AdminNavbarProfile id={currentUser.id} name={currentUser.fName} />
                <div style={{ height: '150px', backgroundColor: 'lightgray', opacity: '90%' }}>
                    <div className="text-center" style={{ color: 'black' }}>
                        <h2>Enter User Id</h2>
                        <div style={{ marginLeft: '870px' }}>
                            <Input style={{ width: '200px' }} type="number" value={id} name="id" onChange={inputEvent}
                            /><br />
                        </div>
                        <Button className="btn-primary" onClick={handleForm}>Search</Button>
                    </div>
                </div>{
                    !status ? ("") : (
                        <div>{
                            !customerData ? (<h1 className="text-center" style={{ color: 'red' , marginTop:'30px'}}>No User Found</h1>) : (
                                <table className="table table-bordered table-success">
                                    <thead className="table-dark">
                                        <tr>
                                            <th className="text-center">Work Category</th>
                                            <th className="text-center">Work Date</th>
                                            <th className="text-center">Salary</th>
                                            <th className="text-center">Location</th>
                                            <th className="text-center">Customer Contact</th>                                            
                                        </tr>
                                    </thead>
                                    <tbody className="table-primary">
                                        {
                                            customerData.map((user, index) => (
                                                <tr key={index}>
                                                    <td className="text-center">{user.workCategory}</td>
                                                    <td className="text-center">{user.workDate}</td>
                                                    <td className="text-center">{user.salary}</td>
                                                    <td className="text-center">{user.location}</td>
                                                    <td className="text-center">{user.contact}</td>                                                   
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            )
                        }
                            <div><br /><br /><br /><br /></div>
                            <div className="text-center"><Link to="/profile/ADMIN" action><Button className="btn-light btn">Back</Button></Link></div>
                        </div>
                    )}
                </div>) : null}
    </div>

}
export default SearchCustWorkHist;