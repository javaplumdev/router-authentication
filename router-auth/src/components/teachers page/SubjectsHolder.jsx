import { Container, Button } from 'react-bootstrap';

const SubjectsHolder = () => {
	return (
		<div className="mt-3">
			<Container>
				<div className="d-flex justify-content-between">
					<h3>Your classes</h3>
					<Button size="sm">Add class</Button>
				</div>
				<div className="p-3 mt-3 rounded bg-light ">
					<p>Subject Name</p>
					<small>10 Lessons</small>
					<small className="mx-2">2 Assignments</small>
					<small>256 Enrolled</small>
				</div>
			</Container>
		</div>
	);
};

export default SubjectsHolder;
