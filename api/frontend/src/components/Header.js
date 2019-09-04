import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

export class Header extends Component {
    render() {
        return (
          <Navbar bg="light" expand="lg">
              <Navbar.Brand>Upload File</Navbar.Brand>
        </Navbar>
        )
    }
}


export default Header
