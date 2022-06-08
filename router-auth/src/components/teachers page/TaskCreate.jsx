// React
import { useState } from 'react';
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

const TaskCreate = () => {
	// const [questions, setQuestions] = useState([]);

	// const [questionText, setQuestionText] = useState({
	// 	question: '',
	// 	a: '',
	// 	b: '',
	// 	c: '',
	// 	d: '',
	// 	correctAnswer: '',
	// });

	// const addQuestion = () => {
	// 	setQuestions((prevState) => {
	// 		return [...prevState, questionText];
	// 	});
	// };

	// const saveQuestion = () => {
	// 	console.log(questions);
	// };

	const { addQuestion } = useUserAuth();

	return (
		<>
			<TeachersNavbar />
			<Container>
				<Row className="my-4">
					<Col md={4}>
						<div className="bg-white p-3 rounded">
							<p>Details</p>
							<Button variant="outline-primary" className="me-3">
								Add question
							</Button>
							<Button>Save</Button>
						</div>
					</Col>
					{/* <Col md={8}>
						{questions.map(() => {
							return (
								<div className="p-3 border rounded mb-4">
									<FloatingLabel
										controlId="floatingTextarea"
										label="Put a question"
									>
										<Form.Control
											style={{ resize: 'none', height: '75px' }}
											as="textarea"
										/>
										<div className="mt-3">
											<div className="d-flex">
												<p className="me-3">A.) </p>
												<Form.Control type="text" />
											</div>
											<div className="d-flex my-3">
												<p className="me-3">B.) </p>
												<Form.Control type="text" />
											</div>
											<div className="d-flex my-3">
												<p className="me-3">C.) </p>
												<Form.Control type="text" />
											</div>
											<div className="d-flex">
												<p className="me-3">D.) </p>
												<Form.Control type="text" />
											</div>
											<div className="d-flex mt-3">
												<p className="me-3">Correct Answer: </p>
												<Form.Control type="text" />
											</div>
										</div>
									</FloatingLabel>
								</div>
							);
						})}
					</Col> */}
				</Row>
			</Container>
		</>
	);
};

export default TaskCreate;
