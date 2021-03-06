// React
import React, { useState } from 'react';
// Bootstrap
import { Button } from 'react-bootstrap';
import { Alert, Form, ButtonGroup, ToggleButton } from 'react-bootstrap';
// Reacr router DOM
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/context-config';

const SignupComponent = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const { createAccount } = useUserAuth();
	const [radioValue, setRadioValue] = useState('1');

	const radios = [
		{ name: 'Teacher', value: '1' },
		{ name: 'Student', value: '2' },
	];

	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		setError('');

		try {
			await createAccount(email, password, radioValue);
			navigate('/');
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className=" bg-light p-3 rounded shadow-lg" style={{ width: 320 }}>
			<h2 className="text-center">Registration</h2>
			{error && <Alert variant="danger">{error}</Alert>}

			<Form onSubmit={handleSubmit}>
				<Form.Group className="my-3">
					<Form.Control
						type="email"
						placeholder="Email address"
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group className="my-3">
					<Form.Control
						type="text"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group>
					<ButtonGroup className="my-2 w-100">
						{radios.map((radio, idx) => (
							<ToggleButton
								key={idx}
								id={`radio-${idx}`}
								type="radio"
								variant={idx % 2 ? 'outline-primary' : 'outline-primary'}
								name="radio"
								value={radio.value}
								checked={radioValue === radio.value}
								onChange={(e) => setRadioValue(e.currentTarget.value)}
							>
								{radio.name}
							</ToggleButton>
						))}
					</ButtonGroup>
				</Form.Group>
				<div className="d-grid gap-2">
					<Button variant="primary" type="Submit">
						Sign up
					</Button>
				</div>
			</Form>
			<div className="text-center my-3">
				Already have an account? <Link to="/">Log in</Link>
			</div>
		</div>
	);
};

export default SignupComponent;
