import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { InputActionMeta } from "react-select";
import Select from 'react-select';
import Navigation from "../../components/navbar";
import Sidebar from "../../components/sidebar";

const modeloPacote = [
    { value: '', label: '' }
];

type pacoteModelo = { id: "", nome: "" }

export default function Oferta() {
    const [pacotes, setPacotes] = useState(modeloPacote)

    let listaPacotes: pacoteModelo[] = []

    const [formValue, setFormValue] = useState({
        ofertaPreco: "",
        ofertaPacotes: listaPacotes
    });

    const { ofertaPreco, ofertaPacotes } = formValue;

    const handleChangePacotes = (event: any) => {
        var pacotesSelecionados: pacoteModelo[] = []
        for (let index = 0; index < event.length; index++) {
            let pacote = { id: event[index].value, nome: event[index].label }
            console.log(pacote)
            pacotesSelecionados.push(pacote)
        }

        setFormValue((prevState) => {
            return {
                ...prevState,
                ofertaPacotes: pacotesSelecionados,
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

    const handleSubmit = (event: any) => {
        const oferta = {
            preco: ofertaPreco,
            pacotes: ofertaPacotes
        }

        event.preventDefault();

        axios.post(`http://localhost:8080/ofertas/criarOferta`, oferta).then((res) => {
            alert('Oferta criada!');
        })

        let valores = {
            ofertaPreco: "",
            ofertaPacotes: listaPacotes
        }

        setFormValue(valores);
    };



    return (
        <>
            <Navigation />
            <Sidebar />

            <div className='container-promo'>
                <h1>Cadastro de Oferta</h1>

                <Form>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Preço da Oferta</Form.Label>
                            <Form.Control
                                required
                                name="ofertaPreco"
                                value={ofertaPreco}
                                onChange={handleChange}
                                type="number"
                                placeholder="Preço da Oferta"
                                defaultValue=""
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Pacotes que compõem a Oferta</Form.Label>
                            <Select
                                isMulti
                                name="ofertaPacotes"
                                options={pacotes}
                                onChange={handleChangePacotes}
                                isClearable={true}
                                isSearchable={true}
                                closeMenuOnSelect={false}
                            />
                        </Form.Group>

                    </Row>

                    <Button type="submit" onClick={handleSubmit}>Criar Oferta!</Button>

                </Form>

            </div>

        </>
    )
}