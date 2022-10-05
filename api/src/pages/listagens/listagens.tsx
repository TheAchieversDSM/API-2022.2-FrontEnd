import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Navigation from "../../components/navbar";
import Sidebar from "../../components/sidebar";

import "./listagens.css"

let modeloPromo = [
    {
        'id': '',
        'nome': '',
        'descricao': ''
    }
]

let modelo = [
    {
        'id': '',
        'nome': '',
        'preco': '',
        'descricao': ''
    }
]

export default function Listagens() {
    const [produtos, setProdutos] = useState(modelo)
    const [promocoes, setPromocoes] = useState(modeloPromo)

    useEffect(() => {
        let url = window.location.href.split("/")
        if (url[3] === "produtos") {
            axios.get(`http://localhost:8080/produtos/pegarTodosProdutos`).then((res) => {
                setProdutos(res.data)
            })
        }
        else if (url[3] === "servicos") {
            axios.get(`http://localhost:8080/servicos/pegarTodosServicos`).then((res) => {
                setProdutos(res.data)
            })
        }
        else if (url[3] === "pacotes") {
            axios.get(`http://localhost:8080/pacotes/pegarTodosPacotes`).then((res) => {
                setProdutos(res.data)
            })
        }
        else if (url[3] === "promocoes") {
            axios.get(`http://localhost:8080/promocoes/pegarTodasPromocoes`).then((res) => {
                setProdutos(res.data)
            })
        }
    })

    return (
        <>
            <div className="container-lista">
                <h1>Listagens</h1>

                <div className="button-collection">
                    {window.location.href.split("/")[3] == "produtos" ? 
                        <Button variant="outline-primary" href="produtos" disabled>Produtos</Button>
                        : 
                        <Button variant="outline-primary" href="produtos">Produtos</Button>
                    }    
                    {window.location.href.split("/")[3] == "servicos" ? 
                        <Button variant="outline-primary" href="servicos" disabled>Serviços</Button>
                        : 
                        <Button variant="outline-primary" href="servicos">Serviços</Button>
                    }  
                    {window.location.href.split("/")[3] == "pacotes" ? 
                        <Button variant="outline-primary" href="pacotes" disabled>Pacotes</Button>
                        : 
                        <Button variant="outline-primary" href="pacotes">Pacotes</Button>
                    }  
                    {window.location.href.split("/")[3] == "promocoes" ? 
                        <Button variant="outline-primary" href="promocoes" disabled>Promoções</Button>
                        : 
                        <Button variant="outline-primary" href="promocoes">Promoções</Button>
                    }                      
                </div>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            {window.location.href.split('/')[3] != 'pacotes' ?
                            <th>Descrição</th>
                            :
                            <th>Preço</th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map(produto =>
                            <tr>
                                <td>{produto.nome}</td>
                                {window.location.href.split('/')[3] != 'pacotes' ?
                                <td>{produto.descricao}</td>
                                :
                                <td>R$ {produto.preco}</td>
                                }
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </>
    )
}