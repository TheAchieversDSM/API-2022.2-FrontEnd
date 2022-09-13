import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navigation from '../../components/navbar';

import './style.css'

export default function Home() {
    const [produtos,setProdutos] = useState([Object])

    useEffect(()=>{
        async function render() { 
        axios.get(`http://localhost:8080/produtos/pegarTodosProdutos`, ).then((res)=>{
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
                        <h4>Nome do Produto</h4>
                        {/*<h4>{produto.nome}</h4>*/}
                    </div>
                      
                     <div className="card-botao">
                         <Button type="submit"><Link to="/">Ver Produto!</Link></Button>
                     </div>

                 </div>
                 </>
                )}
                   
                </div>
            
            </div>

        </>
    )
}