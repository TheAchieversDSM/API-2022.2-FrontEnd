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

const categoriasOpt = [
    { value: 'Meu Negócio', label: 'Meu Negócio' },
    { value: 'Streaming', label: 'Streaming' },
    { value: 'Música', label: 'Música' },
    { value: 'Segurança Digital', label: 'Segurança Digital' },
];

const modeloOptions = [{ value: '', label: '' }];


export default function Servico() {
    let listaCategorias = []
    let listaServicos = []

    const [options, setOptions] = useState(modeloOptions)
    const [optServ, setOptServ] = useState(modeloOptions)
    const [categorias, setCategorias] = useState(listaCategorias)
    const [obrigatorios, setObrigatorios] = useState(listaServicos)
    const [complementos, setComplementos] = useState(listaServicos)

    const [formValue, setFormValue] = useState([{
        servicoNome: "",
        servicoDescricao: "",
        servicoCategoria: "",
        servicoProduto: listaServicos,
        servicoObrigatorios: listaServicos,
        servicoComplementares: listaServicos
    }]);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    var { servicoNome, servicoProduto, servicoDescricao, servicoCategoria, servicoObrigatorios, servicoComplementares } = formValue;

    const handleChangeProdutos = (event) => {
        var produtosSelecionados = []
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

    const handleChangeCategoria = (event) => {
        var categoriasSelecionadas = []
        for (let index = 0; index < event.length; index++) {
            let categoria = { value: event[index].value, label: event[index].label }
            categoriasSelecionadas.push(categoria)
        }
        setCategorias(categoriasSelecionadas)
        console.log(categorias);


        setFormValue((prevState) => {
            return {
                ...prevState,
                servicoCategoria: categorias,
            };
        });
    };

    const handleChangeComplementares = (event) => {
        var servicosSelecionados = []
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

    const handleChangeObrigatorios = (event) => {
        var servicosSelecionados = []
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

    const handleSubmit = (event) => {
        const servico = {
            nome: servicoNome,
            descricao: servicoDescricao,
            produtos: servicoProduto,
            categoria: servicoCategoria ? servicoCategoria : [],
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
            servicoCategoria: listaCategorias,
            servicoProduto: listaServicos,
            servicoObrigatorios: listaServicos,
            servicoComplementares: listaServicos
        }

        setFormValue(valores);
    };

    const duplicarTab = (event) => {
        if (event.key === 'Tab') {
            let newfield = { pacoteNome: "", pacoteDescricao: "", pacoteServicos: "" }
            setFormValue([...formValue, newfield])
        }
    }

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
                                <h6>{fields.servicoNome}</h6>
                                <Row className="mb-3">

                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Nome do Serviço</Form.Label>
                                        <Form.Control
                                            required
                                            name="servicoNome"
                                            value={servicoNome}
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
                                            isSearchable={true}
                                            closeMenuOnSelect={true}
                                            isLoading={false}
                                            options={options}
                                            value = {fields.servicoProduto}
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
                                            onKeyDown={event => duplicarTab(event)}
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
                                            name="serviçoCategoria"
                                            options={categorias}
                                            onChange={event => handleChangeCategoria(index, event)}
                                            isClearable={true}
                                            isSearchable={true}
                                            closeMenuOnSelect={true}
                                            isLoading={false} />
                                    </Form.Group>

                                </Row>

                                <Row className="mb-3">

                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Serviços Restringentes <TooltipDuvida mensagem="Escolha os serviços que não poderão ser obtidos em conjunto a este" /></Form.Label>
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

                                <Row className="mb-3">

                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Serviços Obrigatórios <TooltipDuvida mensagem="Escolha os serviços que serão obrigatórios o consumidor obter para a compra deste serviço" /></Form.Label>
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
                            </div>
                        )
                    })}

                    <Button type="submit" onClick={handleSubmit}>Criar Servico!</Button>
                </Form>

            </div>

        </>
    )
}