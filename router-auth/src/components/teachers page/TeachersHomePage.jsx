// Context
import { useUserAuth } from '../../context/context-config';
// State
import { useState, useEffect } from 'react';
// React router DOM
import { useNavigate } from 'react-router-dom';
// Bootstrap
import { Button } from 'react-bootstrap';

const TeachersHomePage = () => {
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
		<>
			<p>Homepage</p>

			<br></br>
			<p>{user && user.email}</p>
			{userContainer.map((item) => {
				return (
					<div key={item.id}>
						<p>{item.password}</p>
					</div>
				);
			})}
			<Button variant="primary" onClick={handleLogout}>
				Log out
			</Button>
		</>
	);
};

export default TeachersHomePage;
