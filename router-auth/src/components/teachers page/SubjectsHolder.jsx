// React hooks
import React, { useState, useEffect } from 'react';
// React bootstrap
import { Container, Button, Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
// Context
import { useUserAuth } from '../../context/context-config';
// React router dom
import { Link } from 'react-router-dom';

const SubjectsHolder = () => {
	const {
		addSubject,
		generateSubjectCode,
		setSubjectName,
		subjectCode,
		subjects,
		handleClose,
		handleShow,
		show,
	} = useUserAuth();

	return (
		<div className="mt-3">
			<Container>
				<div className="d-flex justify-content-between">
					<h3>Your classes</h3>
					<Button size="sm" onClick={handleShow}>
						Add class
					</Button>
				</div>

				{subjects.length === 0 ? (
					<div
						className="d-flex justify-content-center align-items-center "
						style={{ height: '70vh' }}
					>
						<h1 className="display-5 p-3">You haven't add subjects yet :(</h1>
					</div>
				) : (
					subjects.map((item) => {
						return (
							<Link
								to={`/subjectpage/${item.subjectID}`}
								key={item.subjectID}
								className="text-decoration-none text-black"
							>
								<div className="p-3 mt-3 rounded bg-white">
									<h6>{item.subjectName}</h6>
									<small className="me-2">
										{item.studentsEnrolled.length} Activities
									</small>

									<small>{item.studentsEnrolled.length} Enrolled</small>
								</div>
							</Link>
						);
					})
				)}
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
					<Button variant="primary" onClick={() => addSubject()}>
						Add
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default SubjectsHolder;
