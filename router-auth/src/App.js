import './App.css';
// React Router DOM
import { Route, Routes } from 'react-router-dom';
// React bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// Components
import Homepage from './components/HomePage';
import Login from './components/Login';
import SignupComponent from './components/SignupComponent';
// Protected Route
import ProtectedRoute from './components/ProtectedRoute';
// Bootstrap
import { Container } from 'react-bootstrap';
// Context
import { ContextProvider } from './context/context-config';

function App() {
	return (
		<ContextProvider>
			<Container>
				<div className="App">
					<Routes>
						<Route path="/" element={<Login />} />
						<Route
							path="/Homepage"
							element={
								<ProtectedRoute>
									<Homepage />
								</ProtectedRoute>
							}
						/>
						<Route path="/SignupComponent" element={<SignupComponent />} />
					</Routes>
				</div>
			</Container>
		</ContextProvider>
	);
}

export default App;
