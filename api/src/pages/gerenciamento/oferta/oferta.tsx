import { useEffect, useState } from "react";
import Select from 'react-select';
import { Col, Form, Row, Button } from "react-bootstrap";
import axios from "axios";

const ofertasTipo = [
    { value: 'Mensal', label: 'Mensal' },
    { value: 'Anual', label: 'Anual' },
];

const servicosModelo = [{ value: '', label: '' }]

type servicosModelo = { id: "", nome: "" }

export default function GerOferta() {
    let listaPacotes: servicosModelo[] = []

    const [servicos, setServicos] = useState(servicosModelo)
    const [pacotes, setPacotes] = useState(servicosModelo)
    const [servicosSelecionados, setServicosSelecionados] = useState(servicosModelo)

    const [formValue, setFormValue] = useState({
        ofertaPreco: "",
        ofertaTipo: "",
        pacotesSelecionados: listaPacotes
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

    const { ofertaPreco, ofertaTipo, pacotesSelecionados } = formValue;

    const handleSubmit = (event: any) => {
        const promocao = {
            preco: ofertaPreco,
            pacote: listaPacotes
        }

        event.preventDefault();

        axios.put(`http://localhost:8080/promocoes/atualizarPromocao`, promocao).then((res) => {
            alert('Promoção atualizada!');
        })

        let valores = {
            ofertaPreco: "",
            ofertaTipo: "",
            pacotesSelecionados: listaPacotes
        }

        setFormValue(valores);
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
        <div className="gerencia-oferta">
            <h1>Oferta</h1>

            <Form>
                <Row className="mb-3">
                    <Form.Label>Pacotes que compõem a oferta</Form.Label>
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

                <Button type="submit" onClick={handleSubmit}>Salvar!</Button>

            </Form>

        </div>
    )
}