// React
import { useEffect, useState } from 'react';
// Navbar react
import TeachersNavbar from './TeachersNavbar';
// React bootstrap
import {
	Container,
	FloatingLabel,
	Form,
	Row,
	Col,
	Button,
} from 'react-bootstrap';
// Context
import { useUserAuth } from '../../context/context-config';
// React DOM
import { useParams } from 'react-router-dom';

const TaskCreate = () => {
	const { addQuestion, setQuestionInfo } = useUserAuth();
	const { id } = useParams();

	const [activityName, setActivityName] = useState('');

	return (
		<>
			<TeachersNavbar />
			<Container>
				<Row className="my-4">
					<Col md={4}>
						<div className="bg-white p-3 rounded">
							<p>Question details</p>
							<Button
								variant="outline-primary"
								onClick={() => addQuestion(id, activityName)}
							>
								Add question
							</Button>
							<Button className="mx-3">Save</Button>
						</div>
					</Col>
					<Col md={8}>
						<div className="bg-white p-3 rounded">
							<Form.Control
								type="text"
								placeholder="Activity name"
								className="mb-3"
								onChange={(e) => setActivityName(e.target.value)}
							/>
							<Form.Control
								as="textarea"
								placeholder="Leave a question here"
								style={{ resize: 'none' }}
							/>
							<Form.Control
								type="text"
								placeholder="A"
								className="my-3"
								onChange={(e) =>
									setQuestionInfo((prevState) => {
										return {
											...prevState,
											a: e.target.value,
										};
									})
								}
							/>
							<Form.Control
								type="text"
								placeholder="B"
								className="my-3"
								onChange={(e) =>
									setQuestionInfo((prevState) => {
										return {
											...prevState,
											b: e.target.value,
										};
									})
								}
							/>
							<Form.Control
								type="text"
								placeholder="C"
								className="my-3"
								onChange={(e) =>
									setQuestionInfo((prevState) => {
										return {
											...prevState,
											c: e.target.value,
										};
									})
								}
							/>
							<Form.Control
								type="text"
								placeholder="D"
								className="my-3"
								onChange={(e) =>
									setQuestionInfo((prevState) => {
										return {
											...prevState,
											d: e.target.value,
										};
									})
								}
							/>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default TaskCreate;
