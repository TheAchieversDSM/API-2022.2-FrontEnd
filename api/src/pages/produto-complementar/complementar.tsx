import React, { useEffect, useState } from 'react';
import Navigation from '../../components/navbar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Sidebar from '../../components/sidebar';
import Select from 'react-select';
import axios from 'axios';

import './complementar.css'
import { Table } from 'react-bootstrap';

const modeloOptions = [
    {
        value: '',
        label: 'Selecione um Produto Primeiro!'
    }
];

let modelo = [
    {
        'id': '',
        'nome': '',
        'categoria': '',
        'descricao': ''
    }
]

type produtoModelo = { id: "", nome: "" }

export default function Complementar() {
    const [complementos, setComplementos] = useState(modeloOptions)

    const [produtos, setProdutos] = useState(modeloOptions)

    let listaProduto: produtoModelo[] = []

    const [formValue, setFormValue] = useState({
        produto: "",
        produtosComplementares: listaProduto
    });

    const handleChangeProduto = (event: any) => {
        var produtosSelecionados: produtoModelo[] = []
        for (let index = 0; index < event.length; index++) {
            let produtos = { id: event[index].value, nome: event[index].label }
            console.log(produtos)
            produtosSelecionados.push(produtos)
        }
        setFormValue((prevState) => {
            return {
                ...prevState,
                produtosComplementares: produtosSelecionados,
            };
        });
    }


    async function complementosProdutoSelecionado() {
        axios.get(`http://localhost:8080/produtos/pegarTodosExcetoComplementos/${produto}`).then((res) => {
            var produtos = []
            for (let index = 0; index < res.data.length; index++) {
                let option = {
                    value: res.data[index].id,
                    label: res.data[index].nome
                }
                produtos.push(option)
            }
            setComplementos(produtos)
        })
    }

    const handleUpdate = () =>{
        complementosProdutoSelecionado()    
    }

    const handleChange = (event: any) => {
        if (event != null) {
            setFormValue((prevState) => {
                return {
                    ...prevState,
                    "produto": event.value,
                };
            });
        }
        return null;
    };

    const { produto, produtosComplementares } = formValue;


    useEffect(() => {
        async function render() {
            axios.get(`http://localhost:8080/produtos/pegarTodosProdutos`).then((res) => {
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
    },)

    const handleSubmit = (event: any) => {
        event.preventDefault();

        axios.put(`http://localhost:8080/produtos/atualizarComplementos/${produto}`, produtosComplementares).then((res) => {
            alert('Complemento inserido!');
        })

        let valores = {
            produto: "",
            produtosComplementares: listaProduto
        }

        setFormValue(valores);
    };

    return (
        <>
            <Navigation />

            <Sidebar />

            <div className='container-prod'>

                <h1>Inserir Produto Complementare</h1>

                <Form>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Selecione o Produto</Form.Label>
                            <Select
                                name="produto"
                                options={produtos}
                                onChange={handleChange}
                                isClearable={true}
                                isSearchable={true}
                                closeMenuOnSelect={true}
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Escolha os Produtos Complementares</Form.Label>
                            <Select
                                isMulti
                                name="produto"
                                options={complementos}
                                onFocus={handleUpdate}
                                onChange={handleChangeProduto}
                                isClearable={true}
                                isSearchable={true}
                                closeMenuOnSelect={false}
                            />
                        </Form.Group>

                    </Row>

                    <Button type="submit" onClick={handleSubmit}>Inserir Complementares!</Button>

                </Form>

            </div>

        </>
    )
}