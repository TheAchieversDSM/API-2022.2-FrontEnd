import { useEffect, useState } from "react";
import Select from 'react-select';
import { BsTrash } from "react-icons/bs"
import { Button, Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import Navigation from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import Check from "../../components/checkbox";
import axios from "axios";

import "./gerenciamento.css"
import Listagens from "../listagens/listagens";

const ofertasTipo = [
    { value: 'Mensal', label: 'Mensal' },
    { value: 'Anual', label: 'Anual' },
];

const servicosModelo = [{ value: '', label: '' }]

type servicosModelo = { id: "", nome: "" }

export default function Gerenciamento() {
    let listaServicos: servicosModelo[] = []

    const [servicos, setServicos] = useState(servicosModelo)
    const [pacotes, setPacotes] = useState(servicosModelo)

    const [servicosSelecionados, setServicosSelecionados] = useState(servicosModelo)

    const [formValue, setFormValue] = useState({
        ofertaPreco: "",
        ofertaTipo: "",
        pacotesSelecionados: listaServicos,
        servicosObrigatorios: listaServicos,
        servicosComplementares: listaServicos
    });

    const handleChangeSelecionados = (event: any) => {
        var pacotesSelecionados: servicosModelo[] = []
        for (let index = 0; index < event.length; index++) {
            let pacote = { id: event[index].value, nome: event[index].label }
            pacotesSelecionados.push(pacote)
        }
        setFormValue((prevState) => {
            return {
                ...prevState,
                pacotesSelecionados: pacotesSelecionados,
            };
        });
    };

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    }

    const handleChangeCategoria = (event: any) => {
        setFormValue((prevState) => {
            return {
                ...prevState,
                ofertaTipo: event[0].value,
            };
        });
    };

    const handleChangeObrigatorios = (event: any) => {
        var servicosSelecionados: servicosModelo[] = []
        for (let index = 0; index < event.length; index++) {
            let servico = { id: event[index].value, nome: event[index].label }
            servicosSelecionados.push(servico)
        }
        setFormValue((prevState) => {
            return {
                ...prevState,
                servicosObrigatorios: servicosSelecionados,
            };
        });
    };

    const handleChangeComplementares = (event: any) => {
        var servicosSelecionados: servicosModelo[] = []
        for (let index = 0; index < event.length; index++) {
            let servico = { id: event[index].value, nome: event[index].label }
            servicosSelecionados.push(servico)
        }
        setFormValue((prevState) => {
            return {
                ...prevState,
                servicosComplementares: servicosSelecionados,
            };
        });
    };

    const { ofertaPreco, ofertaTipo, servicosComplementares, servicosObrigatorios } = formValue;

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
            <Navigation />

            <Sidebar />

            <div className="container-prod container">
                <Tabs
                    defaultActiveKey="pacotesOfertas"
                    id="fill-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="pacotesOfertas" title="Pacotes/Ofertas" className="tab1">
                        <div className="gerencia-oferta">
                            <h1>Oferta</h1>

                            <Form>
                                <Row className="mb-3">
                                    <Form.Label>Pacotes que compõem a oferta</Form.Label>
                                    <Form.Group as={Col} md="6">
                                        <Select
                                            isMulti
                                            name="servicosObrigatorios"
                                            onChange={handleChangeSelecionados}
                                            options={pacotes}
                                            isClearable={true}
                                            isSearchable={true}
                                            closeMenuOnSelect={false}
                                            isLoading={false}
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Preço do Pacote</Form.Label>
                                        <Form.Control
                                            required
                                            name="precoPacote"
                                            onChange={handleChange}
                                            type="number"
                                            placeholder="Insira o preço do Pacote"
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Tipo de oferta</Form.Label>
                                        <Select
                                            isMulti
                                            name="ofertaTipo"
                                            options={ofertasTipo}
                                            onChange={handleChangeCategoria}
                                            isClearable={true}
                                            isSearchable={true}
                                            closeMenuOnSelect={true}
                                            isLoading={false}
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Incluir serviços obrigatórios</Form.Label>
                                        <Select
                                            isMulti
                                            name="servicosObrigatorios"
                                            onChange={handleChangeObrigatorios}
                                            options={servicos}
                                            isClearable={true}
                                            isSearchable={true}
                                            closeMenuOnSelect={false}
                                            isLoading={false}
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Incluir serviços complementares</Form.Label>
                                        <Select
                                            isMulti
                                            name="servicosComplementares"
                                            onChange={handleChangeComplementares}
                                            options={servicos}
                                            isClearable={true}
                                            isSearchable={true}
                                            closeMenuOnSelect={false}
                                            isLoading={false}
                                        />
                                    </Form.Group>
                                </Row>

                                {/*<Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Incluir serviços restringentes</Form.Label>
                                        <Select
                                            isMulti
                                            name="servicosRestringentes"
                                            isClearable={true}
                                            isSearchable={true}
                                            closeMenuOnSelect={false}
                                            isLoading={false}
                                        />
                                    </Form.Group>
                                </Row>*/}
                            </Form>

                        </div>

                    </Tab>
                    <Tab eventKey="servicos" title="Serviços" className="tab2">

                    </Tab>
                    <Tab eventKey="promocoes" title="Promoçoes" className="tab3">
                        <div className="container">
                            <div className="row">
                                <div className="col-4">
                                    <h2>Pacotes</h2>
                                    <Check titulo="Todos" />
                                    <Check titulo="Nome do pacote" />
                                </div>
                                <div className="col-8">
                                    <h1>Promoçao</h1>
                                    <Form /*noValidate validated={validated} onSubmit={handleSubmit}*/>

                                        <Row className="mb-3">

                                            <Form.Group as={Col} md="6">
                                                <Form.Label>Nome da Promoçao</Form.Label>
                                                <Form.Control
                                                    required

                                                />
                                            </Form.Group>

                                        </Row>

                                        <Row className="mb-3">

                                            <Form.Group as={Col} md="6">
                                                <Form.Label>Valor do desconto</Form.Label>
                                                <Form.Control
                                                    required

                                                />
                                            </Form.Group>

                                        </Row>

                                        <Button type="submit">Salvar!</Button>
                                        <Button type="submit">Cancelar!</Button>

                                    </Form>
                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="listagens" title="Listagens" className="tab4">
                        <Listagens />
                    </Tab>
                </Tabs>
            </div>
        </>
    )
}