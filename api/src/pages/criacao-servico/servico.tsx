import React, { useEffect, useState } from 'react';
import Navigation from '../../components/navbar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Sidebar from '../../components/sidebar';
import Select from 'react-select';

import './servico.css'
import axios from 'axios';

const modeloOptions = [{ value: '', label: '' }];

type servicoModelo = { id: "", nome: "" }

export default function Servico() {
    let listaServicos: servicoModelo[] = []
    const [options, setOptions] = useState(modeloOptions)
    const [optServ, setOptServ] = useState(modeloOptions)
    const [obrigatorios, setObrigatorios] = useState(listaServicos)
    const [complementos, setComplementos] = useState(listaServicos)

    const [formValue, setFormValue] = useState({
        servicoNome: "",
        servicoPreco: "",
        servicoDescricao: "",
        servicoProduto: listaServicos,
        servicoObrigatorios: listaServicos,
        servicoComplementares: listaServicos
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

    const { servicoNome, servicoPreco, servicoProduto, servicoDescricao, servicoObrigatorios, servicoComplementares } = formValue;

    const handleChangeProdutos = (event: any) => {
        var produtosSelecionados: servicoModelo[] = []
        for (let index = 0; index < event.length; index++) {
            let produto = { id: event[index].value, nome: event[index].label }
            //console.log(produto)
            produtosSelecionados.push(produto)
        }
        setFormValue((prevState) => {
            return {
                ...prevState,
                servicoProduto: produtosSelecionados,
            };
        });
        //console.log(formValue)
    };

    const handleChangeComplementares = (event: any) => {
        var servicosSelecionados: servicoModelo[] = []
        for (let index = 0; index < event.length; index++) {
            let servico = { id: event[index].value, nome: event[index].label }
            //console.log(produto)
            servicosSelecionados.push(servico)
        }
        setComplementos(servicosSelecionados)
        console.log(complementos);
        
        setFormValue((prevState) => {
            return {
                ...prevState,
                servicoComplementares: complementos,
            };
        });
    };

    const handleChangeObrigatorios = (event: any) => {
        var servicosSelecionados: servicoModelo[] = []
        for (let index = 0; index < event.length; index++) {
            let servico = { id: event[index].value, nome: event[index].label }
            //console.log(produto)
            servicosSelecionados.push(servico)
        }
        setComplementos(servicosSelecionados)
        console.log(complementos);
        
        setFormValue((prevState) => {
            return {
                ...prevState,
                servicoComplementares: complementos,
            };
        });
    };

    const handleSubmit = (event: any) => {
        const servico = {
            nome: servicoNome,
            descricao: servicoDescricao,
            preco: servicoPreco,
            produtos: servicoProduto,
            servicoComplementares: complementos[0].id != '' ? complementos : [],
            servicoObrigatorios: complementos[0].id != '' ? complementos : []
        }
        axios.post("http://localhost:8080/servicos/criarServico", servico).then((res) => {
            alert('Serviço criado!')
        })

        event.preventDefault();

        let valores = {
            servicoNome: "",
            servicoDescricao: "",
            servicoPreco: ""
        }
    };

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
                setOptions(produtos)
            })
        }
        render()
    }, [])

    useEffect(() => {
        async function render() {
            axios.get(`http://localhost:8080/servicos/pegarTodosServicos`).then((res) => {
                var servicos = []
                for (let index = 0; index < res.data.length; index++) {
                    let option = {
                        value: res.data[index].id,
                        label: res.data[index].nome
                    }
                    servicos.push(option)
                }
                setOptServ(servicos)
            })
        }
        render()
    }, [])

    return (
        <>
            <Navigation />

            <Sidebar />

            <div className='container-prod'>

                <h1>Cadastro de Serviço</h1>

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
                            <Form.Label>Preço do Serviço</Form.Label>
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
                            <Form.Label>Produtos que compõem o Serviço</Form.Label>
                            <Select
                                isMulti
                                name="servicoProduto"
                                onChange={handleChangeProdutos}
                                isClearable={true}
                                isSearchable={true}
                                closeMenuOnSelect={false}
                                isLoading={false}
                                options={options}
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3 FormText" >

                        <Form.Group as={Col} md="6">
                            <Form.Label>Descrição do Serviço</Form.Label>
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

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Serviços Obrigatórios</Form.Label>
                            <Select
                                isMulti
                                name="servicoObrigatorios"
                                onChange={handleChangeObrigatorios}
                                options={optServ}
                                isClearable={true}
                                isSearchable={true}
                                closeMenuOnSelect={false}
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Serviços Complementares</Form.Label>
                            <Select
                                isMulti
                                name="servicoComplementares"
                                onChange={handleChangeComplementares}
                                options={optServ}
                                isClearable={true}
                                isSearchable={true}
                                closeMenuOnSelect={false}
                            />
                        </Form.Group>

                    </Row>

                    {/*<Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Serviços Restringentes</Form.Label>
                            <Select
                                isMulti
                                name="servicoRestringentes"
                                onChange={handleChange}
                                isClearable={true}
                                isSearchable={true}
                                closeMenuOnSelect={false}
                            />
                        </Form.Group>

                    </Row>*/}

                    <Button type="submit" onClick={handleSubmit}>Criar Servico!</Button>

                </Form>

            </div>

        </>
    )
}