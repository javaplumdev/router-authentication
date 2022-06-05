// Context
import { useUserAuth } from '../../context/context-config';
// State
import { useState, useEffect } from 'react';
// React router DOM
import { useNavigate } from 'react-router-dom';
// Bootstrap
import { Button, Container } from 'react-bootstrap';
// Components
import TeachersNavbar from './TeachersNavbar';

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
			<TeachersNavbar />

			<Container>
				<p>{user && user.email}</p>
				<p>{user.radioValue === '1' ? 'Teacher' : 'Student'}</p>
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
			</Container>
		</>
	);
};

export default TeachersHomePage;
