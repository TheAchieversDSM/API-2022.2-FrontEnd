import React, { useEffect, useState } from 'react';
import Botao from '../../components/button';
import Navigation from '../../components/navbar';
import Outline from '../../components/outlinebutton';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useParams } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import axios from 'axios';

import './visualizacao.css'



export default function Visualizacao() {
    const [produto,setProduto] = useState(Object)
    const [pacote,setPacotes] = useState([{}])
    const {id} = useParams();
    console.log(id);
    useEffect(()=>{
        async function render() { 
        axios.get(`http://localhost:8080/produtos/pegarProduto/${id}`, ).then((res)=>{
            setProduto(res.data)
            console.log(res.data)
            })
        }
        render()
    },[])
    
    

    return (
        <>
            <Navigation/>
            <div className="geral">
                <div className="principal">
                    <h1 className="name">{produto.nome}</h1>
                    <div className="descricao">
                            <p>{produto.descricao}</p>
                    </div>
                    <h2 className="preço">R$ 230,00</h2>
                    <Botao/>
                    <a className='texto'>Adicionar ao carrinho</a>
                </div>
                <div className="prom">
                    <h2 className="confira">Confira nossos pacotes</h2>
                    <div className="container">
                        <div className="row">
                            <div className="col-3">
                                <div className="pacotes"></div>
                                <h3>R$ 180,00</h3>
                                <Outline/>
                            </div>
                            <div className="col-3">
                                <div className="pacotes"></div>
                                <h3>R$ 180,00</h3>
                                <Outline/>
                            </div>
                            <div className="col-3">
                                <div className="pacotes"></div>
                                <h3>R$ 180,00</h3>
                                <Outline />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="sugestao">Outras sugestões</h2>
                    <AliceCarousel>
                        <div className="yours-custom-class container">
                            <div className="row">
                                <div className="card col-4">
                                    <div className="card-img"></div>
                                    <div className="card-botao">
                                    </div>
                                </div>
                                <div className="card col-4">
                                    <div className="card-img"></div>
                                    <div className="card-botao">
                                    </div>
                                </div>
                                <div className="card col-4">
                                    <div className="card-img"></div>
                                    <div className="card-botao">
                                    </div>
                                </div>
                                <div className="card col-4">
                                    <div className="card-img"></div>
                                    <div className="card-botao">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="yours-custom-class container">
                            <div className="row">
                                <div className="card col-4">
                                    <div className="card-img"></div>
                                    <div className="card-botao">
                                    </div>
                                </div>
                                <div className="card col-4">
                                    <div className="card-img"></div>
                                    <div className="card-botao">
                                    </div>
                                </div>
                                <div className="card col-4">
                                    <div className="card-img"></div>
                                    <div className="card-botao">
                                    </div>
                                </div>
                                <div className="card col-4">
                                    <div className="card-img"></div>
                                    <div className="card-botao">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="yours-custom-class container">
                            <div className="row">
                                <div className="card col-4">
                                    <div className="card-img"></div>
                                    <div className="card-botao">
                                    </div>
                                </div>
                                <div className="card col-4">
                                    <div className="card-img"></div>
                                    <div className="card-botao">
                                    </div>
                                </div>
                                <div className="card col-4">
                                    <div className="card-img"></div>
                                    <div className="card-botao">
                                    </div>
                                </div>
                                <div className="card col-4">
                                    <div className="card-img"></div>
                                    <div className="card-botao">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="yours-custom-class container">
                            <div className="row">
                                <div className="card col-4">
                                    <div className="card-img"></div>
                                    <div className="card-botao">
                                    </div>
                                </div>
                                <div className="card col-4">
                                    <div className="card-img"></div>
                                    <div className="card-botao">
                                    </div>
                                </div>
                                <div className="card col-4">
                                    <div className="card-img"></div>
                                    <div className="card-botao">
                                    </div>
                                </div>
                                <div className="card col-4">
                                    <div className="card-img"></div>
                                    <div className="card-botao">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AliceCarousel>
                </div>
            </div>
        </>
    )
}