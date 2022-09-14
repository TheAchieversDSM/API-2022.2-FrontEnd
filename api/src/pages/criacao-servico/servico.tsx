import React, { useState } from 'react';
import Navigation from '../../components/navbar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Sidebar from '../../components/sidebar';
import Select from 'react-select';

import './servico.css'

const options = [
    { value: 'servico 1', label: 'Servico 1' },
    { value: 'servico 2', label: 'Servico 2' },
    { value: 'servico 3', label: 'Servico 3' },
    { value: 'servico 4', label: 'Servico 4' },
];

export default function Servico() {

    const [formValue, setFormValue] = useState({
        servicoNome: "",
        servicoPreco: "",
        servicoProduto: "",
        servicoDescricao: ""
    });

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    const { servicoNome, servicoPreco, servicoProduto, servicoDescricao} = formValue;

    const handleSubmit = (event: any) => {
        alert('Serviço criado!');
        event.preventDefault();

        console.log("enviado");
    };

    return (
        <>
            <Navigation />
            
            <Sidebar />

            <div className='container-prod'>
            
                <h1>Criação de Serviço</h1>

                <Form /*noValidate validated={validated} onSubmit={handleSubmit}*/>

                    <Row className="mb-3">
                        
                        <Form.Group as={Col} md="6">
                            <Form.Label>Nome do Serviço</Form.Label>
                            <Form.Control
                                required
                                name="servicoNome"
                                value={servicoNome}
                                onChange={handleChange}
                                type="text"
                                placeholder="Nome do Serviço"
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Preço </Form.Label>
                            <Form.Control
                                required
                                name="servicoPreco"
                                value={servicoPreco}
                                onChange={handleChange}
                                type="number"
                                placeholder="Preço do Serviço"
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Produtos</Form.Label>
                            <Select 
                                isMulti
                                name="servicoProduto"
                                value={servicoProduto}
                                onChange={handleChange}
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
                                name="servicoDescricao"
                                value={servicoDescricao}
                                onChange={handleChange}
                                as="textarea"                                
                                type="text"
                                placeholder="Descrição do Serviço"
                            />                          
                        </Form.Group>

                    </Row>

                    <Button type="submit" onClick={handleSubmit}>Criar Servico!</Button>

                </Form>
            
            </div>

        </>
    )
}