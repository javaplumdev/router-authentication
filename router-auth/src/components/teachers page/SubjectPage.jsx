import React from 'react';
// React router DOM
import { useParams } from 'react-router-dom';
// React components
import TeachersNavbar from './TeachersNavbar';
// Context
import { useUserAuth } from '../../context/context-config';
// React bootstrap
import { Container } from 'react-bootstrap';

const SubjectPage = () => {
	const { id } = useParams();
	const { subjects } = useUserAuth();

	const sample1 = subjects.filter((item) => item.subjectID === id);

	return (
		<>
			<TeachersNavbar />
			<Container>
				{sample1.map((item) => {
					return (
						<div key={item.subjectID}>
							<h3>{item.subjectName}</h3>
						</div>
					);
				})}
			</Container>
		</>
	);
};

export default SubjectPage;
