import React from 'react';
import { Button, Dropdown, DropdownButton, Form, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from './logo/logo.png';
const navbar = () => {

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home"><img src={logo} style={{height:'50px', width:'300px'}}/></Navbar.Brand>
            <Nav className="mr-auto"> </Nav>
            <Form inline>
            <Link to="/" action><Button className="mr-sm-2">Home</Button></Link>
                <Nav.Link className="mr-sm-2">Services</Nav.Link>
                <Nav.Link href="/contact" className="mr-sm-2">Contact</Nav.Link>
                <DropdownButton className="mr-sm-2" id="dropdown-basic-button" title="Register Here">
                    <Link tag="a" to="/add-customer" action><Dropdown.Item href="#/action-1">Register as Customer</Dropdown.Item></Link>
                    <Link tag="a" to="/add-worker" action><Dropdown.Item href="#/action-2">Register as Worker</Dropdown.Item></Link>
                </DropdownButton>
                <Link tag="a" to="/login" action><Button>Login</Button></Link>
            </Form>
        </Navbar>
    );
}

export default navbar;