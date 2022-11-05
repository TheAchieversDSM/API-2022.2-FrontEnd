import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { InputActionMeta } from "react-select";
import Select from 'react-select';
import Navigation from "../../../components/navbar";
import Sidebar from "../../../components/sidebar";

const modeloOferta = [
    { value: '', label: '' }
];

type ofertaModelo = { id: "", nome: "" }

export default function Oferta() {
    const [ofertas, setOfertas] = useState(modeloOferta)

    let listaOfertas: ofertaModelo[] = []

    const [formValue, setFormValue] = useState({
        ofertaPreco: "",
        ofertaPacotes: listaOfertas
    });

    const { ofertaPreco, ofertaPacotes } = formValue;

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

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

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