// Context API
import { useUserAuth } from '../../context/context-config';
// react
import { useState, useEffect } from 'react';
// React bootstrap
import { Container } from 'react-bootstrap';
// Component
import TeachersNavbar from './TeachersNavbar';

const TeacherProfile = () => {
	const { user, userInfo } = useUserAuth();

	const [userContainer, setUserContainer] = useState([]);

	useEffect(() => {
		setUserContainer(userInfo.filter((doc) => doc.id === user.uid));
	}, [userInfo]);

	return (
		<>
			<TeachersNavbar />
			<Container>
				<p>{user && user.email}</p>
				{userContainer.map((item) => {
					return (
						<div key={item.id}>
							<p>{item.password}</p>
						</div>
					);
				})}
			</Container>
		</>
	);
};

export default TeacherProfile;
