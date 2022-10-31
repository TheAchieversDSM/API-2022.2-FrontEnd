import React, { useEffect, useState } from 'react';
import Navigation from '../../../components/navbar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import axios from 'axios';

import './pacote.css'

const modeloOptions = [
    {
        value: '',
        label: ''
    }
];

const periodo = [
    { value: 'Diário', label: 'Diário' },
    { value: 'Semanal', label: 'Semanal' },
    { value: 'Quinzenal', label: 'Quinzenal' },
    { value: 'Mensal', label: 'Mensal' },
    { value: 'Semestral', label: 'Semestral' },
    { value: 'Anual', label: 'Anual' }
]

export default function Pacote() {
    const [servicos, setServicos] = useState(modeloOptions)
    const [pacotes, setPacotes] = useState(modeloOptions)
    const [produtos, setProdutos] = []
    let listaServicos = []

    const [formValue, setFormValue] = useState([{
        pacoteNome: "",
        pacoteDescricao: "",
        pacotePreco: "",
        pacotePeriodo: "",
        pacoteServicos: listaServicos,
        pacoteProdutos: listaServicos
    }]);

    const handleChangePeriodo = (index, event) => {
        let data = [...formValue];
        data[index][event.label] = event.label;

        let periodo = { value: event.value, label: event.label }

        setFormValue([...formValue, periodo.label])
    }

    const handleChangeServicos = (index, event) => {
        var servicosSelecionados = []

        for (let index = 0; index < event.length; index++) {
            let servico = { id: event[index].value, nome: event[index].label }
            servicosSelecionados.push(servico)

            console.log(servico)
        }
        setFormValue([...formValue, servicosSelecionados])
    }

    const duplicarTab = (event) => {
        if (event.key === 'Tab') {
            let newfield = { pacoteNome: "", pacoteDescricao: "", pacoteServicos: "" }
            setFormValue([...formValue, newfield])
        }
    }

    const handleChangeProdutos = (index, event) => {

    }

    const handleChange = (index, event) => {
        let data = [...formValue];
        data[index][event.target.name] = event.target.value;
        setFormValue(data)
        //console.log(formValue);
    };

    const { pacoteNome, pacoteDescricao, pacotePreco, pacotePeriodo, pacoteServicos, pacoteProdutos } = formValue;


    useEffect(() => {
        async function render() {
            axios.get(`http://localhost:8080/servicos/pegarTodosServicos`).then((res) => {
                console.log(res.data);
                var servicos = []

                for (let index = 0; index < res.data.length; index++) {
                    let option = {
                        value: res.data[index].id,
                        label: res.data[index].nome
                    }
                    servicos.push(option)
                }

                setServicos(servicos);
            })


            axios.get(`http://localhost:8080/servicos/todosProdutos/${servicos.id}`).then((res) => {
                var produtos = []
                for (let index = 0; index < res.data.length; index++) {
                    let option = {
                        value: res.data[index].id,
                        label: res.data[index].nome
                    }
                    produtos.push(option)
                }
                setProdutos(produtos)
                console.log(produtos);
            })

        }
        render()
    }, [])

    const handleSubmit = (event) => {
        const pacote = {
            nome: pacoteNome,
            descricao: pacoteDescricao,
            servicos: pacoteServicos
        }

        event.preventDefault();

        axios.post(`http://localhost:8080/pacotes/criarPacote`, pacote).then((res) => {
            alert('Pacote Criado!');
        })

        let valores = {
            pacoteNome: "",
            pacoteDescricao: "",
            pacoteServicos: listaServicos
        }

        setFormValue(valores);
    };

    useEffect(() => {
        async function render() {
            axios.get(`http://localhost:8080/pacotes/pegarTodosPacotes`).then((res) => {
                var pacotes = []
                for (let index = 0; index < res.data.length; index++) {
                    let option = {
                        value: res.data[index].id,
                        label: res.data[index].nome
                    }
                    pacotes.push(option)
                }
                setPacotes(pacotes)
            })
        }
        render()
    }, [])

    return (
        <>
            <div className='container-promo'>

                <h1>Cadastro de Pacotes</h1>

                <Form>
                    {formValue.map((fields, index) => {
                        return (
                            <div key={index}>
                                <h6>{fields.pacoteNome}</h6>

                                <Row className="mb-3">

                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Nome do Pacote</Form.Label>
                                        <Form.Control
                                            required
                                            name="pacoteNome"
                                            value={fields.pacoteNome}
                                            onChange={event => handleChange(index, event)}
                                            type="text"
                                            placeholder="Insira o nome do Pacote"
                                        />
                                    </Form.Group>

                                </Row>

                                <Row className="mb-3 FormText">

                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Descrição do Pacote</Form.Label>
                                        <Form.Control
                                            required
                                            name="pacoteDescricao"
                                            value={fields.produtoDescricao}
                                            onChange={event => handleChange(index, event)}
                                            as="textarea"
                                            type="text"
                                            placeholder="Insira a descrição da Pacote"
                                        />
                                    </Form.Group>

                                </Row>

                                <Row className="mb-3">

                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Preço do pacote</Form.Label>
                                        <Form.Control
                                            required
                                            name="pacotePreco"
                                            value={fields.pacotePreco}
                                            onChange={event => handleChange(index, event)}
                                            type="number"
                                            placeholder="Inserir preço do pacote"
                                            defaultValue=""
                                        />
                                    </Form.Group>

                                </Row>

                                <Row className="mb-3">

                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Período da oferta do pacote</Form.Label>
                                        <CreatableSelect
                                            name="periodoPacote"
                                            value={fields.pacotePeriodo}
                                            options={periodo}
                                            onChange={event => handleChangePeriodo(index, event)}
                                            isClearable={true}
                                            isSearchable={true}
                                            closeMenuOnSelect={false}
                                        />
                                    </Form.Group>

                                </Row>


                                <Row className="mb-3">

                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Serviços que compõem o pacote</Form.Label>
                                        <Select
                                            isMulti
                                            name="pacoteServicos"
                                            value={fields.pacoteServicos}
                                            onChange={event => handleChangeServicos(index, event)}
                                            isClearable={true}
                                            isSearchable={true}
                                            closeMenuOnSelect={true}
                                            isLoading={false}
                                            options={servicos}
                                        />
                                    </Form.Group>

                                </Row>

                                <Row className="mb-3">

                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Produtos que compõem o pacote</Form.Label>
                                        <Select
                                            isMulti
                                            name="pacoteProdutos"
                                            value={fields.pacoteProdutos}
                                            onChange={event => handleChangeProdutos(index, event)}
                                            onKeyDown={duplicarTab}
                                            isClearable={true}
                                            isSearchable={true}
                                            closeMenuOnSelect={true}
                                            isLoading={false}
                                            options={produtos}
                                        />
                                    </Form.Group>

                                </Row>

                            </div>
                        )
                    })}
                    <Button type="submit" onClick={handleSubmit}>Criar pacote!</Button>
                </Form>
            </div>
        </>
    )
}