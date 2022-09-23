import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Navigation from "../../components/navbar";
import Sidebar from "../../components/sidebar";

import "./listagens.css"

let modelo = [
    {
        'id':'',
        'nome':'',
        'preco':'',
        'descricao':''
    }
]

export default function Listagens() {
    const [produtos,setProdutos] = useState(modelo)

    useEffect(()=>{
        async function render() { 
            axios.get(`http://localhost:8080/produtos/pegarTodosProdutos`).then((res)=>{
                setProdutos(res.data)
            })
        }
        render()
    },[])

    return (
        <>
            <Navigation />
            <Sidebar />

            <div className="container-lista">
                <h1>Listagens</h1>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {/*<th></th>*/}
                            <th>Nome</th>
                            <th>Preço</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map(produto => 
                            <tr>
                                {/*<td><div className="lista-img"></div></td>*/}
                                <td>{produto.nome}</td>
                                <td>R$ {produto.preco}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </>
    )
}