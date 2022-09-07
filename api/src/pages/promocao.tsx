import React, { useState } from 'react';
import Navigation from '../components/navbar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import axios from 'axios';

import './style.css'
import { Alert } from 'react-bootstrap';

const options = [
    { value: 'produto 1', label: 'Produto 1' },
    { value: 'produto 2', label: 'Produto 2' },
    { value: 'produto 3', label: 'Produto 3' },
    { value: 'produto 4', label: 'Produto 4' },
    { value: 'produto 5', label: 'Produto 5' },
];

export default function Promocao() {
    
    const [formValue, setFormValue] = useState({
        promocaoNome: "",
        promocaoPreco: "",
        promocaoProdutos: "",
        promocaoProdutosComp: "",
        promocaoProdutosObrig: "",
        promocaoProdutosRestring: "",
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

    const { promocaoNome, promocaoPreco, promocaoProdutos, promocaoProdutosComp, promocaoProdutosObrig, promocaoProdutosRestring } = formValue;

    const handleSubmit = (event: any) => {
        alert('Produto criado!');
        event.preventDefault();

        console.log("enviado");
    };
    

    return (
        <>
            <Navigation />

            <div className='container'>

                <h1>Criação de Promoção</h1>

                <Form /*noValidate validated={validated} onSubmit={handleSubmit}*/>

                    <Row className="mb-3">
                        
                        <Form.Group as={Col} md="6">
                            <Form.Label>Nome da Promoção</Form.Label>
                            <Form.Control
                                required
                                name="promocaoNome"
                                value={promocaoNome}
                                onChange={handleChange}
                                type="text"
                                placeholder="Nome da Promoção"
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Preço da Promoção</Form.Label>
                            <Form.Control
                                required
                                name="promocaoPreco"
                                value={promocaoPreco}
                                onChange={handleChange}
                                type="number"
                                placeholder="Preço da Promoção"
                                defaultValue=""
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Produtos que compõem a promoção</Form.Label>
                            <Select 
                                isMulti
                                name="promocaoProdutos"
                                value={promocaoProdutos}
                                onChange={handleChange}
                                isClearable={true}
                                isSearchable={true}
                            />
                        </Form.Group>
                        
                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Produtos complementares</Form.Label>
                            <Select 
                                isMulti
                                name="promocaoProdutosComp"
                                value={promocaoProdutosComp}
                                onChange={handleChange}
                                isClearable={true}
                                isSearchable={true}
                                isLoading={false}
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Produtos obrigatórios</Form.Label>
                            <Select 
                                isMulti
                                name="promocaoProdutosObrig"
                                value={promocaoProdutosObrig}
                                onChange={handleChange}
                                isClearable={true}
                                isSearchable={true}
                            />
                        </Form.Group>
                        
                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Produtos restringentes</Form.Label>
                            <Select 
                                isMulti
                                name="promocaoProdutosRestring"
                                value={promocaoProdutosRestring}
                                onChange={handleChange}
                                isClearable={true}
                                isSearchable={true}
                            />
                        </Form.Group>
                        
                    </Row>

                    <Button type="submit" onClick={handleSubmit}>Criar Promoção!</Button>
                
                </Form>
            
            </div>

        </>
    )
}

function validateForm() {
    throw new Error('Function not implemented.');
}
