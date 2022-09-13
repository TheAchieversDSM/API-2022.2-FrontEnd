import React, { useState } from 'react';
import Botao from '../../components/button';
import Navigation from '../../components/navbar';
import Outline from '../../components/outlinebutton';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import axios from 'axios';

import './visu.css'



export default function Visualizacao() {
    const [produto,setProduto] = useState({})
    const [pacote,setPacotes] = useState([{}])
    

    axios.post("http://localhost:8080/produtos/pegarProduto", "631291b2f726cc25058ad2e4").then((res)=>{
        setProduto(res.data)
        console.log(res.data)
    })

    return (
        <>
            <Navigation/>
            <div className="geral">
                <div className="principal">
                    <h1 className="name">NOME DO PRODUTO</h1>
                    <div className="descricao">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
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