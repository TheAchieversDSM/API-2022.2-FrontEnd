import React from 'react';
import Navigation from '../../components/navbar';
import UolLogo from '../../assets/image/logo.svg';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import './login.css'
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <>
            <Navigation />

            <div className="flex">

                <div className='container-login'>

                    <h1>Login</h1>

                    <Form>

                        <Row className="mb-3">

                            <Form.Group as={Col} md="12">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                    placeholder="Insira seu e-mail"
                                    defaultValue=""
                                />
                            </Form.Group>

                        </Row>

                        <Row className="mb-3">

                            <Form.Group as={Col} md="12">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder="Insira sua senha"
                                    defaultValue=""
                                />
                            </Form.Group>

                        </Row>

                    </Form>

                    <Button type="submit"><Link to="/listagens">Entrar!</Link></Button>

                </div>

                <div className='display-login'><img src={UolLogo}/></div>

            </div>

        </>
    )
}