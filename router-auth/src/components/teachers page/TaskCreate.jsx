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
// React DOM
import { useParams } from 'react-router-dom';

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
	const { id } = useParams();

	return (
		<>
			<TeachersNavbar />
			<Container>
				<Row className="my-4">
					<Col md={4}>
						<div className="bg-white p-3 rounded">
							<p>Details</p>
							<Button
								variant="outline-primary"
								className="me-3"
								onClick={() => addQuestion(id)}
							>
								Add question
							</Button>
							<Button>Save</Button>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default TaskCreate;
