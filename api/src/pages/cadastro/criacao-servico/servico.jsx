import { useEffect, useState } from 'react';

import filter from '../../../functions/filter';
import TooltipDuvida from '../../../components/tooltip';
import CreatableSelect from 'react-select/creatable';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import axios from 'axios';

import './servico.css'

const categorias = [
    { value: 'Meu Negócio', label: 'Meu Negócio' },
    { value: 'Streaming', label: 'Streaming' },
    { value: 'Música', label: 'Música' },
    { value: 'Segurança Digital', label: 'Segurança Digital' },
];

const modeloOptions = [{ value: '', label: '' }];

export default function Servico() {
    const [options, setOptions] = useState(modeloOptions)
    const [optServ, setOptServ] = useState(modeloOptions)

    let lista = []

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

        for (let i = 0; i < data.length; i++) {
            let servico = {
                nome: data[i].servicoNome,
                descricao: data[i].servicoDescricao,
                produtos: data[i].servicoProduto,
                categoria: data[i].servicoCategoria[0].label,
                complementares: data[i].servicoComplementares,
                servicosObrigatorios: data[i].servicoObrigatorios
            }

            event.preventDefault();

            axios.post("http://localhost:8080/servicos/criarServico", servico).then((res) => {
                alert('Serviço(s) criado(s)!')
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

    const duplicarClick = (event) => {
        let newfield = { produtoNome: "", produtoQuantidade: "", produtoCategoria: "", produtoDescricao: "" }
        setFormValue([...formValue, newfield])
    }

    const removerTab = (index) => {
        let data = [...formValue];

        data.splice(index, 1)

        setFormValue(data)
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

    return (
        <>
         <Form id='myInput' className="d-flex">
                    <Form.Group as={Col} md="6">
                        <Form.Label>Pesquisar</Form.Label>
                        <Form.Control id='pesquisar'
                            name="servicoNome"
                            type="text"
                            onKeyUp={filter()}
                            placeholder="Insira o nome do Serviço"/>
                    </Form.Group>

                    <Form.Group as={Col} md="6">
                                        <Form.Label>Categoria</Form.Label>
                                        <CreatableSelect
                                            name="serviçoCategoria"
                                            options={categorias}
                                            isClearable={true}
                                            isSearchable={true}
                                            closeMenuOnSelect={true}
                                            isLoading={false} />
                                    </Form.Group>
                </Form>
            <div className='container-promo'>

                <h1>Cadastro de Serviços</h1>

                <Form id='myDIV'>

                    {formValue.map((fields, index) => {

                        return (

                            <div key={index} id={`campo-${index}`}>

                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Nome do serviço</Form.Label>
                                        <Form.Control
                                            required
                                            id={`campoNome-${index}`}
                                            name="servicoNome"
                                            value={fields.servicoNome}
                                            type="text"
                                            placeholder="Insira o nome do serviço"
                                            onChange={event => handleChange(index, event)}
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Produtos que compõem o serviço</Form.Label>
                                        <Select
                                            isMulti
                                            name="servicoProduto"
                                            options={options}
                                            isLoading={true}
                                            isClearable={true}
                                            isSearchable={true}
                                            closeMenuOnSelect={false}
                                            onChange={event => handleChangeProdutos(index, event)}
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3 FormText" >
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Descrição do serviço</Form.Label>
                                        <Form.Control
                                            required
                                            name="servicoDescricao"
                                            value={fields.produtoDescricao}
                                            type="text"
                                            as="textarea"
                                            placeholder="Insira a descrição do serviço"
                                            onChange={event => handleChange(index, event)}
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Categoria do serviço</Form.Label>
                                        <CreatableSelect
                                            isMulti
                                            name="serviçoCategoria"
                                            options={categorias}
                                            isLoading={true}
                                            isClearable={true}
                                            isSearchable={true}
                                            closeMenuOnSelect={true}
                                            onChange={event => handleChangeCategoria(index, event)}
                                        />
                                    </Form.Group>
                                </Row>

                                {/* <Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Serviços restringentes <TooltipDuvida mensagem="Escolha os serviços que não poderão ser obtidos em conjunto a este" /></Form.Label>
                                        <Select
                                            isMulti
                                            name="servicoProduto"
                                            options={options}
                                            isLoading={true}
                                            isClearable={true}
                                            isSearchable={true}
                                            value={fields.servicoProduto}
                                            closeMenuOnSelect={false}
                                            onChange={event => handleChangeProdutos(index, event)} 
                                        />
                                    </Form.Group>
                                </Row> */}

                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Serviços obrigatórios <TooltipDuvida mensagem="Escolha os serviços que serão obrigatórios o consumidor obter para a compra deste serviço" /></Form.Label>
                                        <Select
                                            isMulti
                                            name="servicoObrigatorios"
                                            options={optServ}
                                            isLoading={true}
                                            isClearable={true}
                                            isSearchable={true}
                                            closeMenuOnSelect={false}
                                            onChange={event => handleChangeObrigatorios(index, event)}
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Serviços complementares</Form.Label>
                                        <Select
                                            isMulti
                                            name="servicoComplementares"
                                            options={optServ}
                                            isLoading={true}
                                            isClearable={true}
                                            isSearchable={true}
                                            closeMenuOnSelect={false}
                                            onChange={event => handleChangeComplementares(index, event)}
                                            onKeyDown={event => duplicarTab(event)}
                                        />
                                    </Form.Group>
                                </Row>

                                {index > 0 ?

                                    <Button onClick={removerTab}>
                                        Excluir campos
                                    </Button>

                                    :

                                    <>
                                    </>

                                }

                                <hr />

                            </div>

                        )

                    })}

                    <div className="campobotoes">

                        <Button type="submit" onClick={handleSubmit} className="submitpromo">
                            Criar serviço!
                        </Button>

                        <Button type="submit" onClick={duplicarClick} className="criarpromo">
                            Criar mais campos!
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