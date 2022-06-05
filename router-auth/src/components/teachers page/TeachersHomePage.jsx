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
import SubjectsHolder from './SubjectsHolder';

const TeachersHomePage = () => {
	return (
		<>
			<TeachersNavbar />
			<SubjectsHolder />
		</>
	);
};

export default TeachersHomePage;
