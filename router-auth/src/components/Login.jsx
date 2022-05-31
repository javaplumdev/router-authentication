// React
import React, { useState, useContext } from 'react';
// Google Button
import GoogleButton from 'react-google-button';
// Bootstrap
import { Button } from 'react-bootstrap';
import { Alert, Form } from 'react-bootstrap';
// Reacr router DOM
import { Link, useNavigate } from 'react-router-dom';
// Context
import { useUserAuth } from '../context/context-config.js';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const { logIn, googleSignIn } = useUserAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		try {
			await logIn(email, password);
			navigate('/Homepage');
		} catch (err) {
			setError(err.message);
		}
	};

	const handleGoogleSignIn = async (e) => {
		e.preventDefault();

		try {
			await googleSignIn();
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className="bg-light p-3 rounded shadow-lg" style={{ width: 320 }}>
			<h2 className="text-center">Log in page</h2>
			{error && <Alert variant="danger">{error}</Alert>}
			<Form onSubmit={handleSubmit}>
				<Form.Group className="my-3">
					<Form.Control
						type="email"
						placeholder="Email address"
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Control
						type="text"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<div>
					<Button className="w-100" variant="primary" type="Submit">
						Log in
					</Button>
				</div>
			</Form>

			<hr></hr>
			<div>
				<GoogleButton
					className="g-btn w-100 my-3"
					type="dark"
					onClick={handleGoogleSignIn}
				/>
			</div>
			<p className="text-center">
				Don't have account? <Link to="/SignupComponent">Sign up</Link>
			</p>
		</div>
	);
};

export default Login;
