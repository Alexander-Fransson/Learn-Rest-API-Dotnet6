import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav,Navbar } from 'react-bootstrap';

class Navigation extends Component {
    state = {  } 
    render() { 
        return (
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'/>
                <Nav>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/">
                        Home
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/Department">
                        Department
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/Employee">
                        Employee
                    </NavLink>
                </Nav>
            </Navbar>
        );
    }
}
 
export default Navigation;