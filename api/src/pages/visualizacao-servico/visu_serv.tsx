import React, { useEffect, useState } from 'react';
import Botao from '../../components/button';
import Navigation from '../../components/navbar';
import Outline from '../../components/outlinebutton';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link, useParams } from "react-router-dom"
import { Button, Card } from 'react-bootstrap';
import Slider from 'react-slick'
import axios from 'axios';

import './visu.css'
import { BiCheck } from 'react-icons/bi';

let modelo = [{ 'id': '', 'nome': '' }]
const modeloPromocao = [{ id: '', nome: '', preco: '' }]

let modeloPacote = [
    {
        'id': '',
        'preco': '',
        'pacote': {'id': '','nome': ''}
    }
]

let modeloOferta = [
    {
        'id': '',
        'preco': '',
        'pacote': {}
    }
]

export default function VisualizacaoServ() {
    const [servico, setServico] = useState(Object)
    const [promocoes, setPromocoes] = useState(modeloPromocao)
    const [complementos, setComplementos] = useState(modelo)
    const [pacote, setPacotes] = useState(modeloPacote)
    const { id } = useParams();
    const [oferta, setOferta] = useState(modeloOferta)

    useEffect(() => {
        async function render() {
            axios.get(`http://localhost:8080/servicos/pegarServico/${id}`,).then((res) => {
                setServico(res.data)
                setComplementos(res.data.complementares)
            })
        }
        render()
    }, [servico])

    useEffect(()=>{
        function render() { 
          
            axios.post(`http://localhost:8080/servicos/pegarOfertas`, [servico]).then((res) => {
                setPacotes(res.data)
                console.log(res.data)
            })

            {/*axios.get(`http://localhost:8080/promocoes/pegarTodasPromocoes`,).then((res) => {
            setPromocoes(res.data)
            })*/}

        }
        render() 
    })
    
    const deletarCarrinho = () => {
        localStorage.removeItem('servicoCarrinho')
    }
    
    const adicionarCarrinho = (servicoCarrinho: any) => { 
        if(localStorage.getItem("servicoCarrinho") != undefined) {
            let carrinho = []
            carrinho = JSON.parse(localStorage.getItem('servicoCarrinho')!)
            carrinho.push(servicoCarrinho)       
      
            localStorage.setItem("servicoCarrinho",JSON.stringify(carrinho))
            console.log(JSON.parse(localStorage.getItem('servicoCarrinho')!))
        }       
        else {
            let carrinho = [servicoCarrinho]
            localStorage.setItem("servicoCarrinho",JSON.stringify(carrinho))
            console.log(localStorage.getItem("servicoCarrinho"))
        }  
    }

    const topFunction = () => {
        document.documentElement.scrollTop = 0;
    }

    const settings = {
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1
    };

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
                    {pacote.map((info: { id: string, preco: string, pacote: {id:string,nome:string} }) =>
                            <div className="col-4 pacotinho">
                                <div className="pact"></div>
                                <h3>{info.pacote.nome}</h3>
                                <h3>R$ {info.preco}</h3>              
                                <div>
                                    <p><BiCheck className="iconecheck" /></p>
                                </div>             
                                <Button onClick={() => adicionarCarrinho(info)} variant="outline-primary" className="promo">Assine agora</Button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="container-sugestoes">
                    <div className="sugestao-promocao">
                        <h2 className="sugestao">Promoções</h2>
                        <Slider {...settings}>
                            {promocoes.map((promocao) =>
                                <div>
                                    <Card style={{ width: '18rem' }}>
                                        <div className="card-imgserv"></div>
                                        <Card.Body>
                                            <Card.Title>{promocao.nome}</Card.Title>
                                            <Card.Text>
                                                {promocao.preco}
                                            </Card.Text>
                                            <Button variant="primary">Ver Promoção!</Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )}
                        </Slider>
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
            <h2 className="sugestao">Outras sugestões</h2>
            <AliceCarousel>

                <div className="yours-custom-class container">

                    <div className="row">
                        {
                            complementos != null ?
                                complementos.map(complemento =>
                                    <div className="card col-4">
                                        <div className="card-img"></div>
                                        <h4>{complemento.nome}</h4>
                                        <div className="card-botao">
                                            <Button onClick={topFunction} type="submit"><Link to={`/servico/${complemento.id}`}>Ver Produto!</Link></Button>
                                        </div>
                                        <a className='texto' onClick={() => { adicionarCarrinho(complemento) }} >Adicionar ao carrinho</a>
                                    </div>
                                )
                                :
                                <></>
                        }
                    </div>

                </div>

            </AliceCarousel >
        </>
    )
}