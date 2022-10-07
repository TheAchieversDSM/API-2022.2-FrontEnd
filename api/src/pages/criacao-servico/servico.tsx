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
import Tooltip from 'react-bootstrap/esm/Tooltip';
import TooltipDuvida from '../../components/tooltip';
import Badge from 'react-bootstrap/esm/Badge';

const categorias = [
    { value: 'Meu Negócio', label: 'Meu Negócio' },
    { value: 'Streaming', label: 'Streaming' },
    { value: 'Música', label: 'Música' },
    { value: 'Segurança Digital', label: 'Segurança Digital' },
];

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
        servicoDescricao: "",
        servicoCategoria: "",
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

    const { servicoNome, servicoProduto, servicoDescricao, servicoCategoria, servicoObrigatorios, servicoComplementares } = formValue;

    const handleChangeProdutos = (event: any) => {
        var produtosSelecionados: servicoModelo[] = []
        for (let index = 0; index < event.length; index++) {
            let produto = { id: event[index].value, nome: event[index].label }
            produtosSelecionados.push(produto)
        }
        setFormValue((prevState) => {
            return {
                ...prevState,
                servicoProduto: produtosSelecionados,
            };
        });
    };

    const handleChangeCategoria = (event: any) => {
        setFormValue((prevState) => {
            return {
                ...prevState,
                servicoCategoria: event[0].value,
            };
        });
    };

    const handleChangeComplementares = (event: any) => {
        var servicosSelecionados: servicoModelo[] = []
        for (let index = 0; index < event.length; index++) {
            let servico = { id: event[index].value, nome: event[index].label }
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

        console.log(formValue);
    };

    const handleChangeObrigatorios = (event: any) => {
        var servicosSelecionados: servicoModelo[] = []
        for (let index = 0; index < event.length; index++) {
            let servico = { id: event[index].value, nome: event[index].label }
            servicosSelecionados.push(servico)
        }
        setObrigatorios(servicosSelecionados)
        console.log(obrigatorios);

        setFormValue((prevState) => {
            return {
                ...prevState,
                servicoObrigatorios: obrigatorios,
            };
        });

        console.log(formValue);

    };

    const handleSubmit = (event: any) => {
        const servico = {
            nome: servicoNome,
            descricao: servicoDescricao,
            produtos: servicoProduto,
            categoria: servicoCategoria,
            complementares: complementos ? complementos : [],
            servicosObrigatorios: obrigatorios ? obrigatorios : []
        }
        console.log(servico);

        axios.post("http://localhost:8080/servicos/criarServico", servico).then((res) => {
            alert('Serviço criado!')
        })

        event.preventDefault();

        let valores = {
            servicoNome: "",
            servicoDescricao: "",
            servicoCategoria: "",
            servicoProduto: listaServicos,
            servicoObrigatorios: listaServicos,
            servicoComplementares: listaServicos
        }

        setFormValue(valores);
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

                <Form>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Nome do serviço</Form.Label>
                            <Form.Control
                                required
                                name="servicoNome"
                                value={servicoNome}
                                onChange={handleChange}
                                type="text"
                                placeholder="Insira o nome do serviço"
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Produtos que compõem o serviço</Form.Label>
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
                            <Form.Label>Descrição do serviço</Form.Label>
                            <Form.Control
                                required
                                name="servicoDescricao"
                                value={servicoDescricao}
                                onChange={handleChange}
                                as="textarea"
                                type="text"
                                placeholder="Insira a descrição do serviço"
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Categoria do serviço</Form.Label>
                            <Select 
                                isMulti
                                name="servicoCategoria"
                                onChange={handleChangeCategoria}
                                options={categorias}
                                isClearable={true}
                                isSearchable={true}
                                closeMenuOnSelect={true}
                            />
                        </Form.Group>
                        
                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Serviços restringentes <TooltipDuvida mensagem="Escolha os serviços que não poderão ser obtidos em conjunto a este"/></Form.Label>
                            <Select 
                                isMulti
                                name="servicoProduto"
                                onChange={handleChangeProdutos}
                                isClearable={true}
                                isSearchable={true}
                                closeMenuOnSelect ={false}
                                isLoading={false}
                                options={options}
                            />
                        </Form.Group>
                        
                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Serviços obrigatórios <TooltipDuvida mensagem="Escolha os serviços que serão obrigatórios o consumidor obter para a compra deste serviço"/></Form.Label>
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
                            <Form.Label>Serviços complementares</Form.Label>
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

                    <Button type="submit" onClick={handleSubmit}>Criar servico!</Button>

                </Form>

            </div>

        </>
    )
}