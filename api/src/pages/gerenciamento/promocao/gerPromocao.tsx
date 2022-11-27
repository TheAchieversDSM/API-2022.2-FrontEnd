import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Select from 'react-select';

const modeloPacote = [
    { value: '', label: '' }
];

type gerPromoModelo = { id: "", preco: "", pacote: {id: '', nome: ''} }

export default function GerPromocao() {
    const [ofertas, setOfertas] = useState(modeloPacote)

    let listaOfertas: gerPromoModelo[] = []

    const [formValue, setFormValue] = useState({
        promocaoNome: "",
        promocaoPreco: "",
        promocaoOfertas: listaOfertas
    });

    const handleChangePromocao = (event: any) => {
        var ofertasSelecionadas: gerPromoModelo[] = []
        for (let index = 0; index < event.length; index++) {
            let oferta = { id: event[index].value, pacote:event[index].pacote, preco: event[index].preco }
            ofertasSelecionadas.push(oferta)
        }

        setFormValue((prevState) => {
            return {
                ...prevState,
                promocaoOfertas: ofertasSelecionadas,
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
            axios.get(`http://localhost:8080/ofertas/pegarTodasOfertas`).then((res) => {
                var ofertas = []
                for (let index = 0; index < res.data.length; index++) {
                    let option = {
                        value: res.data[index].id,  
                        pacote: res.data[index].pacote,
                        preco: res.data[index].preco,
                        label: `${res.data[index].pacote.nome} - R$ ${res.data[index].preco}`
                    }
                    ofertas.push(option)
                }
                setOfertas(ofertas)
            })
        }
        render()
    }, [])

    const { promocaoNome, promocaoPreco, promocaoOfertas: promocaoPacotes } = formValue;

    const handleSubmit = (event: any) => {
        const promocao = {
            nome: promocaoNome,
            preco: promocaoPreco,
            ofertas: promocaoPacotes
        }

        event.preventDefault();

        axios.put(`http://localhost:8080/promocoes/atualizarPromocao`, promocao).then((res) => {
            alert('Promoção atualizada!');
        })

        let valores = {
            promocaoNome: "",
            promocaoPreco: "",
            promocaoOfertas: listaOfertas
        }

        setFormValue(valores);
    };

    return (
        <>
            <div className="container">
                <h1>Promoção</h1>
                <Row className="mb-3">

                    <Form.Group as={Col} md="6">
                        <Form.Label>Pacotes que compõem a Promoção</Form.Label>
                        <Select
                            isMulti
                            name="GerOfertaPacotes"
                            options={ofertas}
                            onChange={handleChangePromocao}
                            isClearable={true}
                            isSearchable={true}
                            closeMenuOnSelect={false}
                        />
                    </Form.Group>

                </Row>

                <Form>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Desconto da Promoção</Form.Label>
                            <Form.Control
                                required
                                name="promocaoPreco"
                                value={promocaoPreco}
                                onChange={handleChange}
                                type="number"
                                placeholder="Insira o valor de desconto da Promoção"
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
