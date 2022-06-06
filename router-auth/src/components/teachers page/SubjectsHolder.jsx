// React hooks
import React, { useState } from 'react';
// React bootstrap
import { Container, Button, Modal } from 'react-bootstrap';
import { InputGroup, Form } from 'react-bootstrap';
// Context
import { useUserAuth } from '../../context/context-config';

const SubjectsHolder = () => {
	const {
		addSubject,
		generateSubjectCode,
		setSubjectName,
		subjectCode,
		setSubjectCode,
	} = useUserAuth();
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<div className="mt-3">
			<Container>
				<div className="d-flex justify-content-between">
					<h3>Your classes</h3>
					<Button size="sm" onClick={handleShow}>
						Add class
					</Button>
				</div>
				<div className="p-3 mt-3 rounded bg-light ">
					<p>Subject Name</p>
					<small>10 Lessons</small>
					<small className="mx-2">2 Assignments</small>
					<small>256 Enrolled</small>
				</div>
			</Container>

			{/* Modal */}
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Create Subject</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Control
						type="text"
						placeholder="Subject name"
						onChange={(e) => setSubjectName(e.target.value)}
					/>
					<Form className="my-3 d-flex align-items-center border p-2 rounded">
						<h4 className=" rounded w-100 me-3">
							{subjectCode === null ? 'Generate code' : subjectCode}
						</h4>
						<Button
							variant="outline-primary"
							onClick={() => generateSubjectCode()}
						>
							Generate
						</Button>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-danger" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={addSubject}>
						Add
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default SubjectsHolder;
