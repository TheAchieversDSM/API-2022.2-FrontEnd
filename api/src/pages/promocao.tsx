import React from 'react';
import Navigation from '../components/navbar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import './style.css'

export default function Promocao() {
    return (
        <>
            <Navigation />

            <div className='container'>

                <h1>Criação de Promoção</h1>

                <Form /*noValidate validated={validated} onSubmit={handleSubmit}*/>

                    <Row className="mb-3">
                        
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>Nome da Promoção</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Nome da Promoção"
                                defaultValue=""
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                            <Form.Label>Preço da Promoção</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                placeholder="Preço da Promoção"
                                defaultValue=""
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                            <Form.Label>Produtos que compõem a promoção</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Lista de Produtos"
                                required
                            />
                        </Form.Group>
                        
                    </Row>

                    <Button type="submit">Criar Promoção!</Button>
                
                </Form>
            
            </div>

        </>
    )
}