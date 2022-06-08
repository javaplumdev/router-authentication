import React, { useState } from 'react';
// React router DOM
import { useParams, Link } from 'react-router-dom';
// React components
import TeachersNavbar from './TeachersNavbar';
// Context
import { useUserAuth } from '../../context/context-config';
// React bootstrap
import { Container, Button, Row, Col, Modal } from 'react-bootstrap';
import { DropdownButton, Dropdown } from 'react-bootstrap';

const SubjectPage = () => {
	const { id } = useParams();
	const { subjects } = useUserAuth();

	const sample1 = subjects.filter((item) => item.subjectID === id);

	// Lessons show
	const [addLessonShow, setAddLessonShow] = useState(false);

	return (
		<>
			<TeachersNavbar />
			<Container>
				{sample1.map((item) => {
					return (
						<div key={item.subjectID} className="mt-3">
							<div className="bg-white rounded w-100 p-3">
								<Row>
									<Col md={6}>
										<h3 className="display-6">{item.subjectName}</h3>
									</Col>
									<Col md={6}>
										<div className="d-flex justify-content-end align-items-center mt-2">
											<Button
												className="me-3"
												onClick={() => setAddLessonShow(true)}
											>
												Post Lessons
											</Button>
											<Link to={`/taskcreate/${item.subjectID}`}>
												<Button>Add Task</Button>
											</Link>
										</div>
									</Col>
								</Row>
							</div>
							<Row className="mt-3">
								<Col md={2}>
									<div className="bg-primary p-3 rounded text-white">
										<p>Students</p>
										<p>Assignments</p>
										<p>Activities</p>
										<p>Lessons</p>
										<p>Subject details</p>
									</div>
								</Col>

								<Col md={10}>
									<div className="bg-white">
										<p>Sample</p>
									</div>
								</Col>
							</Row>
						</div>
					);
				})}
			</Container>

			{/* Modal addLessonShow */}

			<Modal show={addLessonShow} onHide={() => setAddLessonShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>addLessonShow</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setAddLessonShow(false)}>
						Close
					</Button>
					<Button variant="primary" onClick={() => setAddLessonShow(false)}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>

			{/* Modal addLessonShow */}
		</>
	);
};

export default SubjectPage;
