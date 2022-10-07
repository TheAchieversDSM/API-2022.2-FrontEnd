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

const categorias = [
    { value: 'Meu Negócio', label: 'Meu Negócio' },
    { value: 'Streaming', label: 'Streaming' },
    { value: 'Música', label: 'Música' },
    { value: 'Segurança Digital', label: 'Segurança Digital' },
];

const complementaresModelo = [
    {value:'', label:''}
]

type produtoModelo={id:"",nome:""}

export default function Produto() {
    let listaProdutos: produtoModelo[] = []

    const [produtos,setProdutos] = useState(complementaresModelo)

    const [formValue, setFormValue] = useState({
        produtoNome: "",
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

    const handleChangeCategoria = (event: any) => {
        setFormValue((prevState) => {
            return {
                ...prevState,
                produtoCategoria: event[0].value,
            };
        });
    };

    const { produtoNome, produtoCategoria, produtoDescricao } = formValue;

    const handleSubmit = (event: any) => {
        const produto = {
            nome: produtoNome,
            categoria: produtoCategoria,
            descricao: produtoDescricao,
        }

        event.preventDefault();

        axios.post(`http://localhost:8080/produtos/criarProduto`, produto).then((res) => {
            alert('Produto criado!');
        })

        let valores = {
            produtoNome: "",
            produtoCategoria: "",
            produtoDescricao: ""
        }

        setFormValue(valores);
    };

    useEffect(()=>{
        async function render() { 
        axios.get(`http://localhost:8080/produtos/pegarTodosProdutos`).then((res)=>{
                var produtos = []
                for (let index = 0; index < res.data.length; index++) {
                    let option = {
                        value: res.data[index].id,
                        label: res.data[index].nome
                    }
                    produtos.push(option)
                }
                setProdutos(produtos)
            })
        }
        render()
    },[])

    return (
        <>
            <Navigation />

            <Sidebar />

            <div className='container-prod'>

                <h1>Cadastro de Produtos</h1>

                <Form>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Nome do produto</Form.Label>
                            <Form.Control
                                required
                                name="produtoNome"
                                value={produtoNome}
                                onChange={handleChange}
                                type="text"
                                placeholder="Insira o nome do produto"
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Categoria do produto</Form.Label>
                            <Select
                                isMulti = {true}
                                name="produtoCategoria"
                                options={categorias}
                                onChange={handleChangeCategoria}
                                isClearable={true}
                                isSearchable={true}
                                closeMenuOnSelect ={true}
                                isLoading={false}
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3 FormText" >

                        <Form.Group as={Col} md="6">
                            <Form.Label>Descrição do produto</Form.Label>
                            <Form.Control
                                required
                                name="produtoDescricao"
                                value={produtoDescricao}
                                onChange={handleChange}
                                as="textarea"
                                type="text"
                                placeholder="Insira a descrição do produto"
                            />
                        </Form.Group>

                    </Row>

                    <Button type="submit" onClick={handleSubmit}>Criar produto!</Button>

                </Form>

            </div>

        </>
    )
}