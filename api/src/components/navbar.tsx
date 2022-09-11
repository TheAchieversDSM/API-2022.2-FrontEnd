import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navigation() {
    return (
        <>
            <Navbar bg="light" expand="lg" className="nav">
        <Container fluid>
        <Navbar.Brand href="#">UOL</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
        <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
        >
            <Nav.Link href="#action1">Home</Nav.Link>
            <NavDropdown title="Categorias" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3"></NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                Meu negócio
                </NavDropdown.Item>
                <NavDropdown.Item href="#action5">
                Streaming
                </NavDropdown.Item>
                <NavDropdown.Item href="#action5">
                Música
                </NavDropdown.Item>
                <NavDropdown.Item href="#action5">
                Segurança digital
                </NavDropdown.Item>
            </NavDropdown>
            </Nav>
            <Form className="d-flex">
            <Form.Control
                type="search"
                placeholder="Produto/Serviço"
                className="me-2"
                aria-label="Search"
            />
            <Button variant="outline-success">Procurar</Button>
            </Form>
        </Navbar.Collapse>
        </Container>
    </Navbar>
        </>
    )
}

export default Navigation;