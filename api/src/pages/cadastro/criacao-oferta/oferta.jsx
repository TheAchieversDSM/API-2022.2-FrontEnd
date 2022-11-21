import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { InputActionMeta } from "react-select";
import CreatableSelect from 'react-select/creatable';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import filter from '../../../functions/filter';

import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs'

import './oferta.css'

const periodo = [
    { value: 'Diário', label: 'Diário' },
    { value: 'Semanal', label: 'Semanal' },
    { value: 'Quinzenal', label: 'Quinzenal' },
    { value: 'Mensal', label: 'Mensal' },
    { value: 'Semestral', label: 'Semestral' },
    { value: 'Anual', label: 'Anual' }
]

const ofertaModelo = [{ id: "", nome: "" }];

export default function Oferta() {
    const [ofertas, setOfertas] = useState(modeloOferta)
    const [pacotes, setPacotes] = useState(modeloOptions)
    const [produto, setProduto] = useState([{ value: '', label: '' }])

    let listaOfertas = []

    const [formValue, setFormValue] = useState([{
        ofertaNome: "",
        ofertaDescricao: "",
        ofertaPacotes: listaOfertas
    }]);

    const { ofertaNome, ofertaDescricao, ofertaPacotes } = formValue;

    const handleChangeOfertas = (index, event) => {
        let data = [...formValue];

        data[index][event.target.name] = event.target.value;

        setFormValue(data)
    };

    

    const handleChange = = (index, event) => {
        let data = [...formValue];

        data[index][event.target.name] = event.target.value;

        setFormValue(data)
    };

    const handleChangePeriodo = (index, event) => {
        let data = [...formValue]
        var periodo = []

        for (let i = 0; i < event.length; i++) {
            let per = { id: event[i].value, nome: event[i].label }
            periodo.push(per)
        }

        data[index].pacotePeriodo = periodo

        setFormValue(data)
    }

    useEffect(() => {
        async function render() {
            axios.get(`http://localhost:8080/pacotes/pegarTodosPacotes`).then((res) => {
                var ofertas = []
                for (let index = 0; index < res.data.length; index++) {
                    let option = {
                        value: res.data[index].id ,
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

    const handleSubmit = (event: any) => {
        const oferta = {
            preco: ofertaPreco,
            pacote: ofertaPacotes[0]
        }
        console.log(oferta)

        event.preventDefault();

        axios.post(`http://localhost:8080/ofertas/criarOferta`, oferta).then((res) => {
            alert('Oferta criada!');
        })

        let valores = {
            ofertaPreco: "",
            ofertaPacotes: listaOfertas
        }

        setFormValue(valores);
    };



    return (
        <>
            <div className='container-promo'>
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