import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import { useEffect, useState } from "react";

import { Button, Col, Form, Row } from "react-bootstrap";
import { InputActionMeta } from "react-select";
import Select from 'react-select';

import axios from "axios";

import Navigation from "../../../components/navbar";
import Sidebar from "../../../components/sidebar";
import filter from "../../../functions/filter";

const modeloOferta = [
    { value: '', label: '' }
];

type ofertaModelo = { id: "", nome: "" }

export default function Oferta() {
    const navigate = useNavigate();

    const [ofertas, setOfertas] = useState(modeloOferta)

    let listaOfertas: ofertaModelo[] = []

    const [formValue, setFormValue] = useState({
        ofertaPreco: "",
        ofertaPacotes: listaOfertas
    });

    const { ofertaPreco, ofertaPacotes } = formValue;

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    const handleChangeOfertas = (event: any) => {
        console.log(event);
        var ofertasSelecionados: ofertaModelo[] = []
        let oferta = { id: event.value, nome: event.label, servicos: event.servicos }

        ofertasSelecionados.push(oferta)

        setFormValue((prevState) => {
            return {
                ...prevState,
                ofertaPacotes: ofertasSelecionados,
            };
        });

    };

    const handleSubmit = (event: any) => {
        const oferta = {
            preco: ofertaPreco,
            pacote: ofertaPacotes[0]
        }

        event.preventDefault();

        axios.post(`http://localhost:8080/ofertas/criarOferta`, oferta).then((res) => {
            alert('Oferta criada!');
        })

        let valores = {
            ofertaPreco: "",
            ofertaPacotes: listaOfertas
        }

        setFormValue(valores);

        navigate("/criacao-promocao")
    };

    useEffect(() => {
        async function render() {
            axios.get(`http://localhost:8080/pacotes/pegarTodosPacotes`).then((res) => {
                var ofertas = []
                for (let index = 0; index < res.data.length; index++) {
                    let option = {
                        value: res.data[index].id,
                        servicos: res.data[index].servicos,
                        label: res.data[index].nome
                    }
                    ofertas.push(option)
                }
                setOfertas(ofertas)
            })
        }
        render()
    }, [])

    return (
        <>

            <Navigation />

            <Sidebar />

            <div className='container-promo'>
                
                {/*<Form id='myInputOferta' className="d-flex">
                    <Form.Group as={Col} md="6">
                        <Form.Label>Pesquisar</Form.Label>
                        <Form.Control id='pesquisar'
                            name="ofertaNome"
                            type="text"
                            placeholder="Insira o nome da oferta"
                            onKeyUp={filter()}
                        />
                    </Form.Group>
                </Form> */}

                <div className="tab">
                    <Button href="/criacao-produto">Produto</Button>
                    <Button href="/criacao-servico">Serviço</Button>
                    <Button href="/criacao-pacote">Pacote</Button>
                    <Button href="/criacao-oferta" id="tab-ativa" disabled>Oferta</Button>
                    <Button href="/criacao-promocao">Promoção</Button>
                </div>

                <h1>Cadastro de Oferta</h1>

                <Form>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Preço da oferta</Form.Label>
                            <Form.Control
                                required
                                name="ofertaPreco"
                                value={ofertaPreco}
                                onChange={handleChange}
                                type="number"
                                placeholder="Inserir preço da oferta"
                                defaultValue=""
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Pacotes que compõem a oferta</Form.Label>
                            <Select
                                name="ofertaPacotes"
                                options={ofertas}
                                onChange={handleChangeOfertas}
                                isClearable={true}
                                isSearchable={true}
                                closeMenuOnSelect={false}
                            />
                        </Form.Group>

                    </Row>

                    <Button type="submit" onClick={handleSubmit}>Criar oferta!</Button>

                </Form>

            </div>

        </>
    )
}