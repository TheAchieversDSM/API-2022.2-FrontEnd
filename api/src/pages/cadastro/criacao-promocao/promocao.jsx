import { useEffect, useState } from "react";

import filter from '../../../functions/filter';

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import axios from "axios";

import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs'

import "./promocao.css";

import Navigation from '../../../components/navbar';
import Sidebar from '../../../components/sidebar';

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

            });
        }

        alert("Promo????o(??es) criada(s)!");

        let valores = {
            promocaoNome: "",
            promocaoPreco: "",
            promocaoPacote: ""
        }

        setFormValue([valores])

        window.location.reload()
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
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    const botFunction = () => {
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

            <Navigation />

            <Sidebar />

            <div className="container-promo">

                <div className="tab">
                    <Button href="/criacao-produto">Produto</Button>
                    <Button href="/criacao-servico">Servi??o</Button>
                    <Button href="/criacao-pacote">Pacote</Button>
                    <Button href="/criacao-oferta">Oferta</Button>
                    <Button href="/criacao-promocao" id="tab-ativa" disabled>Promo????o</Button>
                </div>

                <Form id='myInputPromotion' className="d-flex">
                    <Form.Group as={Col} md="6">
                        <Form.Label>Pesquisar</Form.Label>
                        <Form.Control id='pesquisar'
                            name="promocaoNome"
                            type="text"
                            placeholder="Insira o nome da promo????o"
                            onKeyUp={filter()}
                        />
                    </Form.Group>
                </Form>

                <h1>Cadastro de Promo????es</h1>

                <Form id='myDivPromotion'>

                    {formValue.map((fields, index) => {

                        return (

                            <div key={index} id={`campoPromotion-${index}`} className="row">

                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Nome da promo????o</Form.Label>
                                        <Form.Control
                                            id={`campoNomePromotion-${index}`}
                                            required
                                            name="promocaoNome"
                                            value={fields.promocaoNome}
                                            type="text"
                                            placeholder="Insira o nome da promo????o"
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
                                            placeholder="Insira o valor de desconto da promo????o"
                                            onChange={(event) => handleChange(index, event)}
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Pacotes que comp??em a promo????o</Form.Label>
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

                                    <Button id="botao-exluir-promo" onClick={removerTab}>
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

                        <Button onClick={duplicarClick} className="submitpromo">
                            Criar mais campos!
                        </Button>

                        <Button onClick={topFunction} className="criarpromo">
                            <BsFillArrowUpCircleFill />
                        </Button>

                        <Button onClick={botFunction} className="toppromo">
                            <BsFillArrowDownCircleFill />
                        </Button>

                        <Button type='submit' onClick={handleSubmit} className="botpromo">
                            Criar promo????o(??es)!
                        </Button>

                    </div >

                </Form >

            </div >

        </>
    );
}