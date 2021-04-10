import React, { useEffect, useState } from 'react';
import axios from 'axios';
import base_url from '../../../api/bootapi';
import authHeader from '../../../authentication/auth-header';
import { Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import authService from '../../../authentication/auth.service';
import AdminNavbarProfile from './AdminNavbarProfile';

const CustomerList = () => {

    const [customerData, setCustomerData] = useState();
    
    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (!currentUser || currentUser.category != 'ADMIN') {
            redirect();
        }
        axios.get(`${base_url}/user/list/CUSTOMER`, { headers: authHeader() }).then((res) => {
            console.log(res.data);
            setCustomerData(res.data);
        });
    }, []);

    let history = useHistory();

    const redirect = () => {
        history.push("/");
    }

    return <div>
        <div>{
        !customerData ? (<h1 className="text-center" style={{color : 'red'}}>No Customer Found</h1>) : (
            <div>
            <AdminNavbarProfile id={authService.getCurrentUser().id} name={authService.getCurrentUser().fName}/>
            <table className="table table-bordered table-success">
                <thead className="table-dark">
                    <tr>
                        <th className="text-center">EMP Code</th>
                        <th className="text-center">First Name</th>
                        <th className="text-center">Last Name</th>
                        <th className="text-center">Email</th>
                        <th className="text-center">Date of Birth</th>
                        <th className="text-center">Phone No.</th>
                        <th className="text-center">Gender</th>
                        
                    </tr>
                </thead>
                <tbody className="table-primary">
                    {
                        customerData.map((user, index) => (
                            <tr key={index}>
                                <td className="text-center">{user.userId}</td>
                                <td className="text-center">{user.fName}</td>
                                <td className="text-center">{user.lName}</td>
                                <td className="text-center">{user.email}</td>
                                <td className="text-center">{user.dob}</td>
                                <td className="text-center">{user.phoneNo}</td>
                                <td className="text-center">{user.gender}</td>
                                
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            </div>
        )
    }
       <div><br /><br/><br/><br/></div>
        <div className="text-center"><Link to="/profile/ADMIN" action><Button className="btn-light btn">Back</Button></Link></div>
        </div>
        </div>

}
export default CustomerList;