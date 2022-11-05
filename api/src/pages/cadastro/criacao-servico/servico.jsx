import React, { useEffect, useState } from 'react';
import Navigation from '../../../components/navbar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Sidebar from '../../../components/sidebar';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

import './servico.css'
import axios from 'axios';
import Tooltip from 'react-bootstrap/esm/Tooltip';
import TooltipDuvida from '../../../components/tooltip';
import Badge from 'react-bootstrap/esm/Badge';

const categorias = [
    { value: 'Meu Negócio', label: 'Meu Negócio' },
    { value: 'Streaming', label: 'Streaming' },
    { value: 'Música', label: 'Música' },
    { value: 'Segurança Digital', label: 'Segurança Digital' },
];

const modeloOptions = [{ value: '', label: '' }];


export default function Servico() {
    let lista = []

    const [options, setOptions] = useState(modeloOptions)
    const [optServ, setOptServ] = useState(modeloOptions)
    const [obrigatorios, setObrigatorios] = useState(lista)
    const [complementos, setComplementos] = useState(lista)

    const [formValue, setFormValue] = useState([{
        servicoNome: "",
        servicoDescricao: "",
        servicoCategoria: lista,
        servicoProduto: lista,
        servicoObrigatorios: lista,
        servicoComplementares: lista
    }]);

    const handleChange = (index, event) => {
        let data = [...formValue]
        data[index][event.target.name] = event.target.value
        setFormValue(data)
    };

    const handleChangeProdutos = (index, event) => {
        let data = [...formValue]
        var produtosSelecionados = []
        for (let i = 0; i < event.length; i++) {
            let produto = { id: event[i].value, nome: event[i].label }
            produtosSelecionados.push(produto)
        }
        data[index].servicoProduto = produtosSelecionados
        setFormValue(data)
    };

    const handleChangeCategoria = (index, event) => {
        let data = [...formValue]
        var categoriasSelecionadas = []
        for (let i = 0; i < event.length; i++) {
            let categoria = { value: event[i].value, label: event[i].label }
            categoriasSelecionadas.push(categoria)
        }
        data[index].servicoCategoria = categoriasSelecionadas
        setFormValue(data)
    };

    const handleChangeComplementares = (index, event) => {
        let data = [...formValue]
        var servicosSelecionados = []
        for (let i = 0; i < event.length; i++) {
            let servico = { id: event[i].value, nome: event[i].label }
            servicosSelecionados.push(servico)
        }
        data[index].servicoComplementares = servicosSelecionados
        setFormValue(data)
    };

    const handleChangeObrigatorios = (index, event) => {
        let data = [...formValue]
        var servicosSelecionados = []
        for (let i = 0; i < event.length; i++) {
            let servico = { id: event[i].value, nome: event[i].label }
            servicosSelecionados.push(servico)
        }
        data[index].servicoObrigatorios = servicosSelecionados
        setFormValue(data)
    };

    const { servicoNome, servicoProduto, servicoDescricao, servicoCategoria, servicoObrigatorios, servicoComplementares } = formValue;

    const handleSubmit = (event) => {
        let data = [...formValue]
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            let servico = {
                nome: data[i].servicoNome,
                descricao: data[i].servicoDescricao,
                produtos: data[i].servicoProduto,
                categoria: [data[i].servicoCategoria[0].label],
                complementares: data[i].servicoComplementares,
                servicosObrigatorios: data[i].servicoObrigatorios
            }

            console.log(servico);

            event.preventDefault();

            axios.post("http://localhost:8080/servicos/criarServico", servico).then((res) => {
                alert('Serviço Criado!')
            })
        }


        let valores = {
            servicoNome: "",
            servicoDescricao: "",
            servicoCategoria: "",
            servicoProduto: lista,
            servicoObrigatorios: lista,
            servicoComplementares: lista
        }

        setFormValue([valores]);
    };

    const duplicarTab = (event) => {
        if (event.key === 'Tab') {
            let newfield = { pacoteNome: "", pacoteDescricao: "", pacoteServicos: "" }
            setFormValue([...formValue, newfield])
        }
    }

    const topFunction = () => {
        document.documentElement.scrollTop = 0;
    }

    const bottomFunction = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    };

    function handleChange(index, event) {
        console.log(event.target);
        let data = [...formValue];
        data[index][event.target.name] = event.target.value;
        setFormValue(data)
        console.log(formValue);

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
            <div className='container-promo'>

                <h1>Cadastro de Serviços</h1>

                <Form>
                    {formValue.map((fields, index) => {
                        return (
                            <div key={index}>
                                <Row className="mb-3">

                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Nome do Serviço</Form.Label>
                                        <Form.Control
                                            required
                                            name="servicoNome"
                                            value={fields.servicoNome}
                                            onChange={event => handleChange(index, event)}
                                            type="text"
                                            placeholder="Insira o nome do Serviço"
                                        />
                                    </Form.Group>

                                </Row>

                                <Row className="mb-3">

                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Produtos que compõem o Serviço</Form.Label>
                                        <Select
                                            isMulti
                                            name="servicoProduto"
                                            onChange={event => handleChangeProdutos(index, event)}
                                            isClearable={true}
                                            value={fields.servicoProduto}
                                            isSearchable={true}
                                            closeMenuOnSelect={true}
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
                                            value={fields.produtoDescricao}
                                            onChange={event => handleChange(index, event)}
                                            as="textarea"
                                            type="text"
                                            placeholder="Insira a descrição do Serviço"
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">

                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Categoria do Serviço</Form.Label>
                                        <CreatableSelect
                                            isMulti
                                            name="serviçoCategoria"
                                            options={categorias}
                                            value={fields.servicoCategoria}
                                            onChange={event => handleChangeCategoria(index, event)}
                                            isClearable={true}
                                            isSearchable={true}
                                            closeMenuOnSelect={true}
                                            isLoading={false} />
                                    </Form.Group>

                                </Row>

                                {/* <Row className="mb-3">

                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Serviços Restringentes <TooltipDuvida mensagem="Escolha os serviços que não poderão ser obtidos em conjunto a este" /></Form.Label>
                                        <Select
                                            isMulti
                                            name="servicoProduto"
                                            onChange={handleChangeProdutos}
                                            isClearable={true}
                                            isSearchable={true}
                                            value={fields.servicoProduto}
                                            closeMenuOnSelect={false}
                                            isLoading={false}
                                            options={options}
                                        />
                                    </Form.Group>

                                </Row> */}

                                <Row className="mb-3">

                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Serviços Obrigatórios <TooltipDuvida mensagem="Escolha os serviços que serão obrigatórios o consumidor obter para a compra deste serviço" /></Form.Label>
                                        <Select
                                            isMulti
                                            name="servicoObrigatorios"
                                            onChange={event => handleChangeObrigatorios(index, event)}
                                            value={fields.servicoObrigatorios}
                                            options={optServ}
                                            isClearable={true}
                                            isSearchable={true}
                                            closeMenuOnSelect={true}
                                            isLoading={false}
                                        />
                                    </Form.Group>

                                </Row>

                                <Row className="mb-3">

                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Serviços Complementares</Form.Label>
                                        <Select
                                            isMulti
                                            name="servicoComplementares"
                                            onChange={event => handleChangeComplementares(index, event)}
                                            value={fields.servicoComplementares}
                                            options={optServ}
                                            isClearable={true}
                                            isSearchable={true}
                                            closeMenuOnSelect={true}
                                            isLoading={false}
                                            onKeyDown={event => duplicarTab(event)}
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
                            </div>
                        )
                    })}

                    <div class="campobotoes">

                        <Button type="submit" onClick={handleSubmit} className="submitpromo">
                            Criar serviço!
                        </Button>

                        <Button onClick={topFunction} className="toppromo">
                            Scroll top
                        </Button>

                        <Button onClick={bottomFunction} className="botpromo">
                            Scroll bottom
                        </Button>

                    </div>
                </Form>

            </div>

        </>
    )
}