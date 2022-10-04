import React, { useEffect, useState } from 'react';
import Botao from '../../components/button';
import Navigation from '../../components/navbar';
import Outline from '../../components/outlinebutton';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link, useParams } from "react-router-dom"
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';

import './visu.css'

let modelo = [
    {
        'id': '',
        'nome': '',
    }
]

export default function VisualizacaoServ() {
    const [servico, setServico] = useState(Object)
    const [complementos, setComplementos] = useState(modelo)
    const [pacote, setPacotes] = useState([{}])
    const { id } = useParams();

    useEffect(() => {
        async function render() {
            axios.get(`http://localhost:8080/servicos/pegarServico/${id}`,).then((res) => {
                setServico(res.data)
                setComplementos(res.data.complementares)
                console.log(complementos);

            })
        }
        render()
    }, [servico])

    const topFunction = () => {
        document.documentElement.scrollTop = 0;
    }

    return (
        <>
            <Navigation />
            <div className="geral">
                    <div className="principal">
                        <div className="subcont">
                            <h1 className="name">{servico.nome}</h1>
                            <div className="descricao">
                                <p>{servico.descricao}</p>
                            </div>
                        </div>
                    </div>

                    <div className="prom">
                        <h2 className="confira">Confira nossos pacotes</h2>
                        <div className="row">
                            <div className="col-4">
                                <div className="pact"></div>
                                <h3>Nome do pacote</h3>
                                <h3>R$ 180,00</h3>
                                <Outline />
                            </div>
                            <div className="col-4">
                                <div className="pact"></div>
                                <h3>Nome do pacote</h3>
                                <h3>R$ 180,00</h3>
                                <Outline />
                            </div>
                            <div className="col-4">
                                <div className="pact"></div>
                                <h3>Nome do pacote</h3>
                                <h3>R$ 180,00</h3>
                                <Outline />
                            </div>
                        </div>
                    </div>

                
                <div className="container-sugestoes">
                    <div className="sugestao-promocao">
                        <h2 className="sugestao">Promoções</h2>
                        <Card style={{ width: '18rem' }}>
                            <div className="card-imgserv"></div>
                            <Card.Body>
                                <Card.Title>Nome da Promoção</Card.Title>
                                <Card.Text>
                                    Preço da promoção
                                </Card.Text>
                                <Button variant="primary">Ver Promoção!</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div>
                        <h2 className="sugestao">Outras sugestões</h2>
                        <AliceCarousel>
                            <div className="yours-custom-class container">
                                <div className="row">
                                    {complementos != null ?
                                        complementos.map(complemento =>
                                            <div className="card col-4">
                                                <div className="card-img"></div>
                                                <h4>{complemento.nome}</h4>
                                                <div className="card-botao">
                                                    <Button onClick={topFunction} type="submit"><Link to={`/produto/${complemento.id}`}>Ver Produto!</Link></Button>
                                                </div>
                                                <a className='texto'>Adicionar ao carrinho</a>
                                            </div>
                                        )
                                        : <></>
                                    }
                                </div>
                            </div>
                        </AliceCarousel>
                    </div>
                </div>
            </div>
        </>
    )
}