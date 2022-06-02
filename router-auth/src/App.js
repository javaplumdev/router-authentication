import './App.css';
// React Router DOM
import { Route, Routes } from 'react-router-dom';
// React bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// Components
import Homepage from './components/HomePage';
import Login from './components/Login';
import SignupComponent from './components/SignupComponent';
import StudentHomePage from './components/student page/StudentHomePage';
import TeachersHomePage from './components/teachers page/TeachersHomePage';
// Protected Route
import ProtectedRoute from './components/ProtectedRoute';
// Bootstrap
import { Container } from 'react-bootstrap';
// Context
import { ContextProvider } from './context/context-config';
// Router
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
	return (
		<Router>
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
							<Route
								path="/StudentHomePage"
								element={
									<ProtectedRoute>
										<StudentHomePage />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/TeachersHomePage"
								element={
									<ProtectedRoute>
										<TeachersHomePage />
									</ProtectedRoute>
								}
							/>
							<Route path="/SignupComponent" element={<SignupComponent />} />
						</Routes>
					</div>
				</Container>
			</ContextProvider>
		</Router>
	);
}

export default App;
