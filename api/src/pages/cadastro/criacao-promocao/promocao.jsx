import { useEffect, useState } from "react";

import filter from '../../../functions/filter';

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import axios from "axios";

import "./promocao.css";

const modeloPromocao = [{ value: "", label: "", preco: "" }];
const promocaoModelo = { id: "", preco: "", nome: "" };

export default function Promocao() {
    const [pacotes, setPacotes] = useState([promocaoModelo]);

    let lista = [];

    const [formValue, setFormValue] = useState([{
        promocaoNome: "",
        promocaoPreco: "",
        promocaoPacote: lista
    }]);

    const handleChange = (index, event) => {
        let data = [...formValue];

        data[index][event.target.name] = event.target.value;

        setFormValue(data);
    };

    const handleChangePacotes = (index, event) => {
        let data = [...formValue];
        var promocaoPac = [];

        event.map((info) => {
            let pacote = {
                id: info.value,
                nome: info.label,
                preco: info.preco,
            };


            promocaoPac.push(pacote);
        })

        data[index].promocaoPacote = promocaoPac;

        setFormValue(data);
    };

    const { promocaoNome, promocaoPreco, promocaoPacote } = formValue;

    const handleSubmit = (event) => {
        let data = [...formValue];

        for (let i = 0; i < data.length; i++) {
            const promocao = {
                nome: data[i].promocaoNome,
                preco: data[i].promocaoPreco,
                pacotes: data[i].promocaoPacote,
            };

            event.preventDefault();

            axios.post(`http://localhost:8080/promocoes/criarPromocao`, promocao).then((res) => {
                alert("Promoção criada!");
            });
        }

        let valores = {
            promocaoNome: "",
            promocaoPreco: "",
            promocaoPacote: ""
        }

        setFormValue([valores])
    };


    const duplicarTab = (event) => {
        if (event.key === "Tab") {
            let newfield = { promocaoNome: "", promocaoPreco: "", promocaoPacote: "" };
            setFormValue([...formValue, newfield]);
        }
    };

    const duplicarClick = (event) => {
        let newfield = { produtoNome: "", produtoQuantidade: "", produtoCategoria: "", produtoDescricao: "" }
        setFormValue([...formValue, newfield])
    }

    const removerTab = (index) => {
        let data = [...formValue];

        data.splice(index, 1)

        setFormValue(data)
    }

    const topFunction = () => {
        document.documentElement.scrollTop = 0;
    }

    const bottomFunction = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        async function render() {
            axios.get(`http://localhost:8080/pacotes/pegarTodosPacotes`).then((res) => {
                var pac = [];

                for (let index = 0; index < res.data.length; index++) {
                    let option = {
                        value: res.data[index].id,
                        label: res.data[index].nome,
                        preco: res.data[index].preco,
                    };

                    pac.push(option);
                }

                setPacotes(pac);
            });
        }

        render();
    }, []);

    return (
        <>
            <Form id='myInputPromotion' className="d-flex">
                <Form.Group as={Col} md="6">
                    <Form.Label>Pesquisar</Form.Label>
                    <Form.Control id='pesquisar'
                        name="promocaoNome"
                        type="text"
                        onKeyUp={filter()}
                        placeholder="Insira o nome da promoção" />
                </Form.Group>
            </Form>

            <div className="container-promo">

                <h1>Cadastro de Promoções</h1>

                <Form id='myDivPromotion'>

                    {formValue.map((fields, index) => {

                        return (

                            <div key={index} id={`campoPromotion-${index}`} className="row">

                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Nome da promoção</Form.Label>
                                        <Form.Control
                                            id={`campoNomePromotion-${index}`}
                                            required
                                            name="promocaoNome"
                                            value={fields.promocaoNome}
                                            type="text"
                                            placeholder="Insira o nome da promoção"
                                            onChange={(event) => handleChange(index, event)}
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Valor do desconto</Form.Label>
                                        <Form.Control
                                            required
                                            name="promocaoPreco"
                                            value={fields.promocaoPreco}
                                            type="number"
                                            placeholder="Insira o valor de desconto da promoção"
                                            onChange={(event) => handleChange(index, event)}
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Pacotes que compõem a promoção</Form.Label>
                                        <Select
                                            isMulti
                                            name="promocaoPacote"
                                            options={pacotes}
                                            isLoading={false}
                                            isClearable={true}
                                            isSearchable={true}
                                            closeMenuOnSelect={false}
                                            onChange={(event) => handleChangePacotes(index, event)}
                                            onKeyDown={(event) => duplicarTab(event)}
                                        />
                                    </Form.Group>
                                </Row>

                                {index > 0 ?

                                    <Button onClick={removerTab}>
                                        Excluir campos
                                    </Button>

                                    :

                                    <>
                                    </>

                                }

                                <hr />

                            </div>

                        );

                    })}

                    <div className="campobotoes">

                        <Button type="submit" onClick={duplicarClick} className="submitpromo">
                            Criar mais campos!
                        </Button>

                        <Button type="submit" onClick={topFunction} className="criarpromo">
                            Scroll top!
                        </Button>

                        <Button onClick={botFunction} className="toppromo">
                            Scroll bottom
                        </Button>

                        <Button onClick={handleSubmit} className="botpromo">
                            Criar produto
                        </Button>

                    </div >

                </Form >

            </div >

        </>
    );
}