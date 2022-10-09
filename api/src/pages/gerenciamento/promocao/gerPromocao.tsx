import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Select from 'react-select';

const modeloPacote = [
    { value: '', label: '' }
];

type pacoteModelo = { id: "", nome: "",  }

export default function GerPromocao() {
    const [pacotes, setPacotes] = useState(modeloPacote)

    let listaPacotes: pacoteModelo[] = []

    const [formValue, setFormValue] = useState({
        promocaoNome: "",
        promocaoPreco: "",
        promocaoPacotes: listaPacotes
    });

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

    const { promocaoNome, promocaoPreco, promocaoPacotes } = formValue;

    const handleSubmit = (event: any) => {
        const promocao = {
            nome: promocaoNome,
            preco: promocaoPreco,
            pacotes: promocaoPacotes
        }

        event.preventDefault();

        axios.put(`http://localhost:8080/promocoes/atualizarPromocao`, promocao).then((res) => {
            alert('Promoção atualizada!');
        })

        let valores = {
            promocaoNome: "",
            promocaoPreco: "",
            promocaoPacotes: listaPacotes
        }

        setFormValue(valores);
    };

    return (
        <>
            <div className="container">
                <h1>Promoção</h1>
                <Row className="mb-3">

                    <Form.Group as={Col} md="6">
                        <Form.Label>Pacotes que compõem a promoção</Form.Label>
                        <Select
                            isMulti
                            name="GerOfertaPacotes"
                            options={pacotes}
                            onChange={handleChangePacotes}
                            isClearable={true}
                            isSearchable={true}
                            closeMenuOnSelect={false}
                        />
                    </Form.Group>

                </Row>

                <Form>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Novo nome da promoçao</Form.Label>
                            <Form.Control
                                required
                                name="promocaoNome"
                                value={promocaoNome}
                                onChange={handleChange}
                                type="text"
                                placeholder="Insira o novo nome da promoção"
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Desconto da promoção</Form.Label>
                            <Form.Control
                                required
                                name="promocaoPreco"
                                value={promocaoPreco}
                                onChange={handleChange}
                                type="number"
                                placeholder="Insira o valor de desconto da promoção"
                                defaultValue=""
                            />
                        </Form.Group>

                    </Row>

                    <Button type="submit" onClick={handleSubmit}>Salvar!</Button>

                </Form>
            </div>
        </>
    )
}
