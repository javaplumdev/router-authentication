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
// Teacher Component
import TeacherProfile from './components/teachers page/TeachersProfile';
import SubjectPage from './components/teachers page/SubjectPage';
// Protected Route
import ProtectedRoute from './components/ProtectedRoute';
// Context
import { ContextProvider } from './context/context-config';
// Router
import { BrowserRouter as Router } from 'react-router-dom';
// React toast
import { Toaster } from 'react-hot-toast';

function App() {
	return (
		<Router>
			<ContextProvider>
				<div className="App">
					<Toaster />
					<Routes>
						<Route
							path="/"
							element={
								<div className="authForm">
									<Login />
								</div>
							}
						/>
						<Route
							path="/SignupComponent"
							element={
								<div className="authForm">
									<SignupComponent />
								</div>
							}
						/>

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
						<Route
							path="/TeacherProfile"
							element={
								<ProtectedRoute>
									<TeacherProfile />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/subjectpage/:id"
							element={
								<ProtectedRoute>
									<SubjectPage />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</div>
			</ContextProvider>
		</Router>
	);
}

export default App;
