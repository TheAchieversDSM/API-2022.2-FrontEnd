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
        label: 'Selecione um Serviço Primeiro!'
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

type servicoModelo = { id: "", nome: "" }

export default function Complementar() {
    const [complementos, setComplementos] = useState(modeloOptions)

    const [servicos, setServicos] = useState(modeloOptions)

    let listaServico: servicoModelo[] = []

    const [formValue, setFormValue] = useState({
        servico: "",
        servicosComplementares: listaServico
    });

    const handleChangeServico = (event: any) => {
        var servicosSelecionados: servicoModelo[] = []
        for (let index = 0; index < event.length; index++) {
            let servicos = { id: event[index].value, nome: event[index].label }
            console.log(servicos)
            servicosSelecionados.push(servicos)
        }
        setFormValue((prevState) => {
            return {
                ...prevState,
                produtosComplementares: servicosSelecionados,
            };
        });
    }

    async function complementosServicoSelecionado() {
        axios.get(`http://localhost:8080/servicos/pegarTodosExcetoComplementos/${servico}`).then((res) => {
            var servicos = []
            for (let index = 0; index < res.data.length; index++) {
                let option = {
                    value: res.data[index].id,
                    label: res.data[index].nome
                }
                servicos.push(option)
            }
            setComplementos(servicos)
        })
    }

    const handleUpdate = () =>{
        complementosServicoSelecionado()    
    }

    const handleChange = (event: any) => {
        if (event != null) {
            setFormValue((prevState) => {
                return {
                    ...prevState,
                    "servico": event.value,
                };
            });
        }
        return null;
    };

    const { servico, servicosComplementares } = formValue;


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
                setServicos(servicos)
            })
        }
        render()
    },)

    const handleSubmit = (event: any) => {
        event.preventDefault();

        axios.put(`http://localhost:8080/servicos/atualizarComplementos/${servico}`, servicosComplementares).then((res) => {
            alert('Complemento inserido!');
        })

        let valores = {
            servico: "",
            servicosComplementares: listaServico
        }

        setFormValue(valores);
    };

    return (
        <>
            <Navigation />

            <Sidebar />

            <div className='container-prod'>

                <h1>Inserir Serviços Complementares</h1>

                <Form>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Selecione o Serviço</Form.Label>
                            <Select
                                name="produto"
                                options={servicos}
                                onChange={handleChange}
                                isClearable={true}
                                isSearchable={true}
                                closeMenuOnSelect={true}
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Escolha os Serviços Complementares</Form.Label>
                            <Select
                                isMulti
                                name="produto"
                                options={complementos}
                                onFocus={handleUpdate}
                                onChange={handleChangeServico}
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