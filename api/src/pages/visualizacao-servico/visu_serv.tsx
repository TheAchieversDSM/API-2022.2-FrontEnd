import { useEffect, useState } from 'react';

import { Alert, Button, Card } from 'react-bootstrap';
import 'react-alice-carousel/lib/alice-carousel.css';
import Navigation from '../../components/navbar';
import AliceCarousel from 'react-alice-carousel';
import { Link, useParams } from "react-router-dom"
import { BiCheck } from 'react-icons/bi';
import axios from 'axios';

import './visu.css'

let modelo = [{ 'id': '', 'nome': '' }]

let modeloPacote = [
    {
        'id': '',
        'preco': '',
        'nome': '',
        'produtos': [{ 'id': '', 'nome': '' }]
    }
]

const modeloPromocao = [{ id: '', nome: '', preco: '', pacotes: [{ 'id': '', 'nome': '', 'preco': '' }] }]

export default function VisualizacaoServ() {
    const [servico, setServico] = useState(Object)
    const [promocoes, setPromocoes] = useState(Object)
    const [complementos, setComplementos] = useState(modelo)
    const [pacote, setPacotes] = useState(modeloPacote)
    const [pacoteServ, setPacoteServ] = useState(modeloPacote)

    const { id } = useParams();

    function soma(ofertas: any) {
        var soma = 0

        for (let index = 0; index < ofertas.length; index++) {
            soma += parseFloat(ofertas[index].preco)
        }

        return soma
    }

    function desconto(desconto: any, valorTotal: any) {
        return (valorTotal - (valorTotal * parseFloat(desconto)) / 100).toFixed(2)
    }

    function adicionarCarrinho(servicoCarrinho: any) {
        if (localStorage.getItem("servicoCarrinho") != undefined) {
            let carrinho = []
            carrinho = JSON.parse(localStorage.getItem('servicoCarrinho')!)
            carrinho.push(servicoCarrinho)

            localStorage.setItem("servicoCarrinho", JSON.stringify(carrinho))
        }
        else {
            let carrinho = [servicoCarrinho]
            localStorage.setItem("servicoCarrinho", JSON.stringify(carrinho))
        }

        <Alert variant="success">
            <p>Item adicionado ao carrinho!</p>
        </Alert>
    }

    const topFunction = () => {
        document.documentElement.scrollTop = 0;
    }

    useEffect(() => {
        async function render() {
            axios.get(`http://localhost:8080/servicos/pegarServico/${id}`,).then((res) => {

                setServico(res.data)

                setPacotes(res.data.pacotes)

                setComplementos(res.data.complementares)
            })

            axios.get(`http://localhost:8080/pacotes/pegarTodosPacotes`).then((res) => {
                const pacotesX = []

                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].servico.id == servico.id) {

                        let opt = { id: res.data[i].id, nome: res.data[i].nome, periodo: res.data[i].periodo, preco: res.data[i].preco, produtos: res.data[i].produtos }

                        pacotesX.push(opt)
                    }
                }

                setPacoteServ(pacotesX)                
            })

            axios.get(`http://localhost:8080/promocoes/pegarTodasPromocoes`).then((res) => {
                const promocoesX = []
                console.log(res.data);
                console.log(pacoteServ);
                

                for (let i = 0; i < res.data.length; i++) {
                    for (let ind = 0; ind < res.data[i].pacotes.length; ind++) {
                        for (let index = 0; index < pacoteServ.length; index++) {
                            if (res.data[i].pacotes[ind].id == pacoteServ[index].id) {

                                let opt = { id: res.data[i].pacotes[ind].id, nome: res.data[i].nome, preco: res.data[i].preco }
                                
                                promocoesX.push(opt)
                            }
                        }
                    }
                }

                setPromocoes(promocoesX)
            })
        }

        render()
    }, [servico])

    useEffect(() => {
        function render() {
            /*axios.post(`http://localhost:8080/servicos/pegarPacotes`, [servico]).then((res) => { 
                setPacotes(res.data)
            }) */

            /*axios.post(`http://localhost:8080/servicos/pegarPromocoes`, [servico]).then((res) =>{              
                setPromocoes(res.data)
            }).catch(error => {
                console.log(error.message);
            }) */
        }

        render()
    })

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
                        <Button onClick={() => adicionarCarrinho({ id: servico.id, nome: servico.nome })} className="botaocarrinho"><Link to={`/carrinho/servico/${servico.id}`}>Ver Serviço!</Link></Button>
                    </div>
                </div>

                <div className="prom">
                    <h2 className="confira">Confira nossos pacotes</h2>
                    <div className="row">
                        {pacoteServ.map((info: any) =>
                            <div className="col-4 pacotinho">
                                <div className="pact"></div>
                                <h3>{info.nome}</h3>
                                {info.produtos.map((produto: { id: string, nome: string }) =>
                                    <div>
                                        <p><BiCheck className="iconecheck" />{produto.nome}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {servico.servicosObrigatorios?.length > 0 ?
                    <>
                        <p>*Para adquirir um {servico.nome} é preciso ter o(s) seguinte(s) serviço(s):</p>
                        {servico.servicosObrigatorios.map((servicoObrig: { id: string, nome: string }) =>
                            <div className="servico-obrig-link">
                                <Link to={`/servico/${servicoObrig.id}`}><p>{servicoObrig.nome}</p></Link>
                            </div>
                        )}
                    </>
                    :
                    <>
                    </>
                }

                <div className="container-sugestoes">
                    <div>
                        {promocoes?.length > 0 ?
                            <>
                                <h2 className="sugestao">Promoções</h2>
                                <AliceCarousel>
                                    <div className="yours-custom-class container">
                                        <div className="row sugestao-promocao-servico">
                                            {promocoes != null ?
                                                promocoes.map((promocao:any) =>
                                                    <div className="card col-4">
                                                        <div className="card-imgserv"></div>
                                                        <h4>{promocao.nome}</h4>
                                                        <h5>{promocao.preco}% OFF</h5>
                                                        {/* {promocao.ofertas.map(info =>
                                                            <>
                                                                <p><BiCheck className="iconecheck" />{info.pacote.nome} - R$ {info.preco}</p>
                                                            </>
                                                        )} 
                                                        <p>Preço original: R$ {soma(promocao.ofertas)} </p>

                                                        <p>Preço Com Desconto: R$ {desconto(promocao.preco, soma(promocao.ofertas))} </p>*/}

                                                    </div>
                                                )
                                                : <></>
                                            }
                                        </div>
                                    </div>
                                </AliceCarousel>
                            </>
                            :
                            <></>
                        }
                    </div>

                    <div>
                        {servico.complementares?.length > 0 ?
                            <>
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
                                                            <Button onClick={topFunction} type="submit"><Link to={`/servico/${complemento.id}`}>Ver serviço!</Link></Button>
                                                        </div>
                                                        <a className='texto'>Adicionar ao carrinho</a>
                                                    </div>
                                                )
                                                : <></>
                                            }
                                        </div>
                                    </div>
                                </AliceCarousel>
                            </>
                            :
                            <></>
                        }
                    </div>
                </div>
            </div>

        </>
    )
}