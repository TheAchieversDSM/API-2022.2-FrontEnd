import Button from 'react-bootstrap/Button';
import LogoUol from '../assets/image/uol.svg';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

import './navbar.css'

function Navigation() {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Brand className="mobile-logo"><Link to="/"><img src={LogoUol}/></Link></Navbar.Brand>
                    <Navbar.Collapse id="navbarScroll" className="flex-row-reverse">
                    <Navbar.Brand className="desktop-logo"><Link to="/"><img src={LogoUol}/></Link></Navbar.Brand>
                        <Nav
                            className="ms-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link><Link to="/login">Login</Link></Nav.Link>
                            <Nav.Link>Assine UOL</Nav.Link>
                            <Nav.Link>Bate Papo</Nav.Link>
                            <NavDropdown title="Categorias" id="navbarScrollingDropdown">
                                <NavDropdown.Item>Meu Negócio</NavDropdown.Item>
                                <NavDropdown.Item>Streaming</NavDropdown.Item>
                                <NavDropdown.Item>Música</NavDropdown.Item>
                                <NavDropdown.Item>Segurança digital</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link>SAC</Nav.Link>
                            <Nav.Link><Link to="/carrinho">Carrinho</Link></Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Produto/Serviço"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Navigation;