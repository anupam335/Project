import React, { useEffect, useState } from 'react';
import axios from 'axios';
import base_url from '../../../api/bootapi';
import authHeader from '../../../authentication/auth-header';
import { Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import authService from '../../../authentication/auth.service';
import { Input } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import AdminNavbarProfile from './AdminNavbarProfile';

const SearchByWorkCat = () => {


    const [workCatData, setWorkCatData] = useState();
    const [cat, setCat] = useState();
    const [status, setStatus] = useState();
    const [correct, setCorrect] = useState();

    const handleForm = (e) => {
        searching(cat);
        setStatus(true)
    };

    const searching = (cat) => {
        axios.get(`${base_url}/user/listWorkType/${cat}`, { headers: authHeader() }).then((res) => {
            console.log(res.data);
            setWorkCatData(res.data);
            toast.success("Workers With Work Type " + cat + " loaded Successfully");
        },
            (error) => {
                setWorkCatData("")
            });
    };

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

    const currentUser = authService.getCurrentUser();


    return <div> {
        correct ? (
            <div>
                <ToastContainer />
                <AdminNavbarProfile id={currentUser.id} name={currentUser.fName} />
                <div style={{ height: '150px', backgroundColor: 'lightgray', opacity: '90%' }}>
                    <div className="text-center" style={{ color: 'black' }}>
                        <h2>Select Work Category</h2>
                        <div style={{ marginLeft: '810px' }}>
                            <Input type="select" name="category" style={{ width: '250px' }} onChange={(e) => {
                                setCat(e.target.value);
                            }} >
                                <option></option>
                                <option>PLUMBER</option>
                                <option>ELECTRICIAN</option>
                                <option>MECHANIC</option>
                                <option>CARPENTER</option>
                                <option>AUTOMOTIVE_TECHNICIAN</option>
                                <option>WELDER</option>
                                <option>PAINTER</option>
                                <option>HOUSE_CLEANING</option>
                                <option>ELECTRONIC_REPAIRER</option>
                            </Input>
                            <br />
                        </div>
                        <Button className="btn-primary" onClick={handleForm}>Search</Button>
                    </div>
                </div>
                <div>
                    {
                        !status ? ("") : (
                            <div>{
                                !workCatData ? (<h1 className="text-center" style={{ color: 'red' }}>No Worker Found</h1>) : (
                                    <table className="table table-bordered table-success">
                                        <thead className="table-dark">
                                            <tr>
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
                                                workCatData.map((user, index) => (
                                                    <tr key={index}>
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
                                <div className="text-center"><Link to="/profile/ADMIN" action><Button className="btn-light btn">Back</Button></Link></div>
                            </div>
                        )}
                </div>
            </div>) : null}
    </div>

}
export default SearchByWorkCat;