import { useEffect, useState } from "react";
import Select from 'react-select';
import { Col, Form, Row, Button } from "react-bootstrap";
import axios from "axios";

const ofertasTipo = [
    { value: 'Mensal', label: 'Mensal' },
    { value: 'Anual', label: 'Anual' },
];

const ofertasModelo = [{ value: '', label: '' }]

type ofertaModelo = { id: "", nome: "" }

export default function GerOferta() {

    let listaPacotes: ofertaModelo[] = []

    const [pacotes, setPacotes] = useState(ofertasModelo)

    const [formValue, setFormValue] = useState([{
        ofertaPreco: "",
        ofertaTipo: "",
        pacotesSelecionados: listaPacotes
    }]);

    const handleChangeSelecionados = (event: any) => {
        var pacotesSelecionados: ofertaModelo[] = []
        for (let index = 0; index < event.length; index++) {
            let pacote = { id: event[index].value, nome: event[index].label, servicos: event[index].servicos }
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

    const addFields = (event: any) => {
        if (event.key === 'Tab') {
            let newfield = { ofertaPreco: "", ofertaTipo: "", pacotesSelecionados: listaPacotes }
            setFormValue([...formValue, newfield])
        }
    }

    const [{ ofertaPreco, ofertaTipo, pacotesSelecionados }] = formValue;

    const handleSubmit = (event: any) => {
        for (let index = 0; index < pacotesSelecionados.length; index++) {             
            const novaOferta = {                 
                preco: ofertaPreco,                 
                pacote: pacotesSelecionados[index]             
            }                      
            axios.post(`http://localhost:8080/ofertas/criarOferta`, novaOferta).then((res) => {

            })
        }

        alert('Ofertas Inseridas!');

        event.preventDefault();

        let valores = {
            ofertaPreco: "",
            ofertaTipo: "",
            pacotesSelecionados: listaPacotes
        }

        setFormValue([valores]);
    };

    useEffect(() => {
        async function render() {
            axios.get(`http://localhost:8080/pacotes/pegarTodosPacotes`).then((res) => {
                var pacotes = []
                for (let index = 0; index < res.data.length; index++) {
                    let option = {
                        servicos: res.data[index].servicos,
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
        <div className="gerencia-oferta">
            <h1>Oferta</h1>

            <Form>
                <Row className="mb-3">
                    <Form.Label>Pacotes que compõem a Oferta</Form.Label>
                    <Form.Group as={Col} md="6">
                        <Select
                            isMulti
                            name="pacotesSelecionados"
                            onChange={handleChangeSelecionados}
                            options={pacotes}
                            isClearable={true}
                            isSearchable={true}
                            closeMenuOnSelect={true}
                            isLoading={false}
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} md="6">
                        <Form.Label>Valor da Oferta</Form.Label>
                        <Form.Control
                            required
                            name="ofertaPreco"
                            onChange={handleChange}
                            type="number"
                            placeholder="Insira o valor da Oferta"
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} md="6">
                        <Form.Label>Tipo de Oferta</Form.Label>
                        <Select
                            isMulti
                            name="ofertaTipo"
                            options={ofertasTipo}
                            onChange={handleChangeCategoria}
                            isClearable={true}
                            isSearchable={true}
                            closeMenuOnSelect={true}
                            isLoading={false}
                            onKeyDown={event => addFields(event)}  
                        />
                    </Form.Group>
                </Row>

                <Button type="submit" onClick={handleSubmit}>Salvar!</Button>

            </Form>

        </div>
    )
}