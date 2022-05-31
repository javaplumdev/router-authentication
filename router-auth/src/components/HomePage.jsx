// React
import React, { useState } from 'react';
// React bootstrap
import { Button } from 'react-bootstrap';
// React router
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/context-config';

const Homepage = () => {
	const { logOut, user } = useUserAuth();
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
		<>
			<p>Homepage</p>
			<br></br>
			<p>{user && user.email}</p>
			<Button variant="primary" onClick={handleLogout}>
				Log out
			</Button>
		</>
	);
};

export default Homepage;
