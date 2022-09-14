import React, { useEffect, useState } from 'react';
import Navigation from '../../components/navbar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Sidebar from '../../components/sidebar';
import Select from 'react-select';
import axios from 'axios';

import './produto.css'

const options = [
    { value: 'produto 1', label: 'Produto 1' },
    { value: 'produto 2', label: 'Produto 2' },
    { value: 'produto 3', label: 'Produto 3' },
    { value: 'produto 4', label: 'Produto 4' },
];

export default function Produto() {

    const [formValue, setFormValue] = useState({
        produtoNome: "",
        produtoPreco: "",
        produtoCategoria: "",
        produtoDescricao: ""
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

    const { produtoNome, produtoPreco, produtoCategoria, produtoDescricao } = formValue;

    const handleSubmit = (event: any) => {
        const produto = {
            nome: produtoNome,
            preco: produtoPreco,
            /* produtoCategoria: produtoCategoria, */
            descricao: produtoDescricao
        }

        event.preventDefault();

        axios.post(`http://localhost:8080/produtos/criarProduto`, produto).then((res) => {
            alert('Produto criado!');
        })

        let valores = {
            produtoNome: "",
            produtoPreco: "",
            produtoCategoria: "",
            produtoDescricao: ""
        }
        
        setFormValue(valores);

    };

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
                                name="produtoNome"
                                value={produtoNome}
                                onChange={handleChange}
                                type="text"
                                placeholder="Nome do Produto"
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Preço </Form.Label>
                            <Form.Control
                                required
                                name="produtoPreco"
                                value={produtoPreco}
                                onChange={handleChange}
                                type="number"
                                placeholder="Preço da Promoção"
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Categoria</Form.Label>
                            <Select
                                isMulti
                                name="produtoCategoria"
                                value={produtoCategoria}
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
                                name="produtoDescricao"
                                value={produtoDescricao}
                                onChange={handleChange}
                                as="textarea"
                                type="text"
                                placeholder="Descrição do Produto"
                            />
                        </Form.Group>

                    </Row>

                    <Button type="submit" onClick={handleSubmit}>Criar Produto!</Button>

                </Form>

            </div>

        </>
    )
}