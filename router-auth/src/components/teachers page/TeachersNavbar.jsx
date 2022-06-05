// React bootstrap
import { Navbar, Nav } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

const TeachersNavbar = () => {
	return (
		<Navbar bg="light" variant="light">
			<Container>
				<Navbar.Brand href="#home">Navbar</Navbar.Brand>

				<Nav className="mr-auto">
					<Nav.Link href="#home">Home</Nav.Link>
					<Nav.Link href="#features">Features</Nav.Link>
					<Nav.Link href="#pricing">Pricing</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	);
};

export default TeachersNavbar;
