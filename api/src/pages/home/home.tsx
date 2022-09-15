import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navigation from '../../components/navbar';

import './home.css'


let modelo = [
    {
        'id':'',
        'nome':'',
        'preco':'',
        'descricao':''
    }
]

export default function Home() {
    const [produtos,setProdutos] = useState(modelo)

    useEffect(()=>{
        async function render() { 
        axios.get(`http://localhost:8080/produtos/pegarTodosProdutos`).then((res)=>{
            setProdutos(res.data)
            console.log(res.data)
            })
        }
        render()
    },[])

    return (
        <>
            <Navigation />

            <div className='display'></div>

            <div className='container'>

                <div className="colecao-categorias">
                    
                    <div className="categoria"></div>
                    <div className="categoria"></div>
                    <div className="categoria"></div>
                    <div className="categoria"></div>
                    <div className="categoria"></div>

                </div>

                <div className="feed">
                {produtos.map(produto =>
                    <>
                        <div className="card">

                        <div className="card-img"></div>

                        <div className="nome-prod">
                        <h4>{produto.nome}</h4>
                    </div>
                        
                        <div className="card-botao">
                            <Button type="submit"><Link to={`/produto/${produto.id}`} >Ver Produto!</Link></Button>
                        </div>

                    </div>
                    </>
                )}
                    
                </div>
            
            </div>

        </>
    )
}