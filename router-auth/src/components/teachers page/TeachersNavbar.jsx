import React, { useState } from 'react';
// React bootstrap
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
// Context
import { useUserAuth } from '../../context/context-config';
// React router DOM
import { Link, useNavigate } from 'react-router-dom';

const TeachersNavbar = () => {
	const { logOut } = useUserAuth();
	const [error, setError] = useState();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logOut();
			navigate('/');
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<Navbar bg="white" expand="lg">
			<Container>
				<Link to="/TeachersHomePage" className="text-decoration-none text-dark">
					Teacher Portal
				</Link>
				<div className="mr-auto my-2">
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav>
							<Link
								to="/TeacherProfile"
								className="text-decoration-none text-black"
							>
								Profile
							</Link>

							<Button
								variant="outline-primary"
								size="sm"
								onClick={handleLogout}
							>
								Log out
							</Button>
						</Nav>
					</Navbar.Collapse>
				</div>
			</Container>
		</Navbar>
	);
};

export default TeachersNavbar;
