import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Nav, Tab, Table, Tabs } from "react-bootstrap";
import Navigation from "../../../components/navbar";
import Sidebar from "../../../components/sidebar";

import "./listagens.css"

let modelo = [
    {
        'id': '',
        'nome': '',
        'descricao': ''
    }
]

let modeloPromocao = [
    {
        'id': '',
        'nome': '',
        'preco': ''
    }
]

let modeloOferta = [
    {
        'id': '',
        'preco': '',
        'pacote': {'id': '', 'nome': '' }
    }
]

export default function Listagens() {
    const [produtos, setProdutos] = useState(modelo)
    const [servicos, setServicos] = useState(modelo)
    const [pacotes, setPacotes] = useState(modelo)
    const [ofertas, setOfertas] = useState(modeloOferta)
    const [promocoes, setPromocoes] = useState(modeloPromocao)

    useEffect(() => {
        async function render() {
            axios.get(`http://localhost:8080/produtos/pegarTodosProdutos`).then(res => {
                setProdutos(res.data)
            })

            axios.get(`http://localhost:8080/ofertas/pegarTodasOfertas`).then(res => {
                setOfertas(res.data)
            })

            axios.get(`http://localhost:8080/servicos/pegarTodosServicos`).then(res => {
                setServicos(res.data)
            })

            axios.get(`http://localhost:8080/pacotes/pegarTodosPacotes`).then(res => {
                setPacotes(res.data)
            })

            axios.get(`http://localhost:8080/promocoes/pegarTodasPromocoes`).then(res => {
                setPromocoes(res.data)
            })
        }
        render()
        console.log(promocoes);
        
    }, [])

    return (
        <>
            <div className="container-lista">
                <h1>Listagens</h1>

                <Tabs
                    defaultActiveKey="pacotesOfertas"
                    id="fill-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="pacotesOfertas" title="Produto" className="tab1">

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                </tr>
                            </thead>
                            <tbody>
                                {produtos.map(produto =>
                                    <tr>
                                        <td>{produto.nome}</td>
                                        <td>{produto.descricao}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>

                    </Tab>

                    <Tab eventKey="servicos" title="Serviços" className="tab2">

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                </tr>
                            </thead>
                            <tbody>
                                {servicos.map(servico =>
                                    <tr>
                                        <td>{servico.nome}</td>
                                        <td>{servico.descricao}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>

                    </Tab>

                    <Tab eventKey="pacotes" title="Pacotes" className="tab3">

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pacotes.map(pacotes =>
                                    <tr>
                                        <td>{pacotes.nome}</td>
                                        <td>{pacotes.descricao}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>

                    </Tab>

                    <Tab eventKey="ofertas" title="Ofertas" className="tab3">

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Preço</th>
                                    <th>Pacote</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ofertas.map(oferta =>
                                    <tr>
                                        <td>R$ {oferta.preco}</td>
                                        <td>{oferta?.pacote?.nome}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>

                    </Tab>

                    <Tab eventKey="promocoes" title="Promoção" className="tab3">

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Desconto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {promocoes.map(promocao =>
                                    <tr>
                                        <td>{promocao.nome}</td>
                                        <td>{promocao.preco}%</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>

                    </Tab>

                </Tabs>
            </div>
        </>
    )
}