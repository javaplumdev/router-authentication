// React
import React, { useState, useEffect } from 'react';
// React router
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/context-config';

const Homepage = () => {
	const { user, userInfo } = useUserAuth();
	const [userContainer, setUserContainer] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		setUserContainer(userInfo.filter((doc) => doc.id === user.uid));
	}, [userInfo]);

	return (
		<div>
			{useEffect(() => {
				userContainer.map((item) => {
					return item.radioValue === '1'
						? navigate('/TeachersHomePage')
						: navigate('/StudentHomePage');
				});
			}, [userContainer])}
		</div>
	);
};

export default Homepage;
