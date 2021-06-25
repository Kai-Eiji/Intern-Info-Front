import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import React, { Component } from "react";



class MyNavBar extends Component{
    render(){
        return(
            <Navbar bg="primary" variant="dark" expand="lg">
                <Navbar.Brand href="/">Tech Intern Info</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/search">Search</Nav.Link>
                    <Nav.Link href="/cpdata">Company</Nav.Link>
                    <Nav.Link href="/ranking">Ranking</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
        );
    }
}
export default MyNavBar;
