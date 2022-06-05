// React
import React from 'react';
// React bootstrap
import { Navbar, Nav } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

const StudentNavbar = () => {
	return (
		<Navbar bg="light" expand="lg">
			<Container>
				<Navbar.Brand href="#home">Student Portal</Navbar.Brand>
				<div className="mr-auto">
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav>
							<Nav.Link href="#home">Home</Nav.Link>
							<Nav.Link href="#link">Link</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</div>
			</Container>
		</Navbar>
	);
};

export default StudentNavbar;
