// Context
import { useUserAuth } from '../../context/context-config';
// State
import { useState, useEffect } from 'react';
// React router DOM
import { useNavigate } from 'react-router-dom';
// Bootstrap
import { Container, Button } from 'react-bootstrap';
// Component
import StudentNavbar from './StudentNavbar';

const StudentHomePage = () => {
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
			<StudentNavbar />

			<Container>
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
			</Container>
		</>
	);
};

export default StudentHomePage;
