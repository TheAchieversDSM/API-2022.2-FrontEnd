import React from 'react';
import Navigation from '../../components/navbar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Sidebar from '../../components/sidebar';
import Select from 'react-select';

import './produto.css'

const options = [
    { value: 'produto 1', label: 'Produto 1' },
    { value: 'produto 2', label: 'Produto 2' },
    { value: 'produto 3', label: 'Produto 3' },
    { value: 'produto 4', label: 'Produto 4' },
];

export default function Produto() {
    return (
        <>
            <Navigation />
            
            <Sidebar />

            <div className='container-prod'>
            
                <h1>Criação de Produto</h1>

                <Form /*noValidate validated={validated} onSubmit={handleSubmit}*/>

                    <Row className="mb-3">
                        
                        <Form.Group as={Col} md="6">
                            <Form.Label>Nome do Produto</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Nome do Produto"
                                defaultValue=""
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Preço </Form.Label>
                            <Form.Control
                                required
                                type="number"
                                placeholder="Preço da Promoção"
                                defaultValue=""
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Categoria</Form.Label>
                            <Select 
                                isMulti
                                options={options} 
                                isClearable={true}
                                isSearchable={true}
                                isLoading={false}
                            />
                        </Form.Group>
                        
                    </Row>

                    <Row className="mb-3 FormText" >
                        
                        <Form.Group as={Col} md="6">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control 
                                required
                                as="textarea"                                
                                type="text"
                                placeholder="Descrição"
                                defaultValue=""
                            />                          
                        </Form.Group>

                    </Row>

                    <Button type="submit">Criar Produto!</Button>

                </Form>
            
            </div>

        </>
    )
}