// React
import React, { useState, useEffect } from 'react';
// React bootstrap
import { Button } from 'react-bootstrap';
// React router
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/context-config';

const Homepage = () => {
	const { logOut, user, userInfo } = useUserAuth();
	const [error, setError] = useState();
	const [userContainer, setUserContainer] = useState([]);
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logOut();
			navigate('/');
		} catch (error) {
			setError(error.message);
		}
	};

	useEffect(() => {
		setUserContainer(userInfo.filter((doc) => doc.id === user.uid));
	}, [userInfo]);

	return (
		<div>
			<p>Homepage</p>

			<br></br>
			<p>{user && user.email}</p>
			{userContainer.map((item) => {
				return (
					<div key={item.id}>
						<p>{item.password}</p>
						<p>{item.radioValue === '1' ? 'teacher' : 'student'}</p>
					</div>
				);
			})}
			<Button variant="primary" onClick={handleLogout}>
				Log out
			</Button>
		</div>
	);
};

export default Homepage;
