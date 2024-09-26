import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function MyNavbar() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">Trucdle</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/guesser">Guesser</Nav.Link>
                        <Nav.Link as={Link} to="/silhouette">Silhouette</Nav.Link>
                        <Nav.Link as={Link} to="/citation">Citation</Nav.Link>
                        <Nav.Link as={Link} to="/arme">Arme</Nav.Link>
                        <Nav.Link as={Link} to="/flou">Flou</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;