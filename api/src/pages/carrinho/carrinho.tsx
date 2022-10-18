import React, { useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AlertaProm from "../../components/alerta";
import Navigation from "../../components/navbar";
import { BsFillTrashFill } from 'react-icons/bs'
import axios from 'axios';
import './carrinho.css'

let modelo = [
    {
        'preco': '',
        'pacote': { 'id': '', 'nome': '', 'servicos': [{ 'id': '', 'nome': '' }] },
        'ofertas': [{ 'preco': '' }],
        'nome': '',
        'id': ''
    }
]

var mounted = 0

export default function Carrinho() {
    const [carrinho, setCarrinho] = useState(modelo)
    const [servicos, setServicos] = useState(Object)
    const [complementares, setComplementares] = useState([{ 'id': '', 'nome': '' }])
    const [pacotes, setPacotes] = useState(Object)


    useEffect(() => {

        function render() {
            if (localStorage.getItem("servicoCarrinho") != undefined) {
                setCarrinho(JSON.parse(localStorage.getItem("servicoCarrinho")!))
                for (let index = 0; index < carrinho.length; index++) {

                    if (carrinho[index].pacote?.nome != '') {
                        axios.post('http://localhost:8080/servicos/pegarComplementosParaCarrinho', carrinho[index].pacote?.servicos).then(res => {
                            setComplementares(res.data)
                        })
                    }

                }

                for (let index = 0; index < carrinho.length; index++) {
                    if (carrinho[index].pacote) {
                        for (let indexPac = 0; indexPac < carrinho[index].pacote.servicos.length; indexPac++) {
                            axios.get(`http://localhost:8080/servicos/todosServicosObrigatorios/${carrinho[index].pacote.servicos[indexPac].id}`).then(res => {
                                for (let indexServ = 0; indexServ < res.data.length; indexServ++) {
                                    for (let indexCarrinho = 0; indexCarrinho < carrinho.length; indexCarrinho++) {
                                        carrinho[indexCarrinho].pacote.servicos.map(servi => {
                                            if (res.data[indexServ].id === servi.id) {
                                                document.getElementsByClassName('limpar')[0].removeAttribute('disabled');
                                            } else {
                                                document.getElementsByClassName("limpar")[0].setAttribute("disabled", "disabled");
                                            }
                                        })
                                    }
                                }

                            }).catch((err) => {
                                console.log(err)
                            })
                        }
                    }
                }

                mounted += 1
            }

            else {
                setCarrinho(modelo)
            }
        }
        render()
    })


    function limparCarrinho() {
        localStorage.removeItem("servicoCarrinho")
        window.location.reload()
    }

    function deletar(id: string) {
        for (let index = 0; index < carrinho.length; index++) {
            if (carrinho[index].id == id) {
                //console.log(carrinho[index]);
                carrinho.splice(index, 1)
                localStorage.setItem("servicoCarrinho", JSON.stringify(carrinho))
            }
        }
        window.location.reload()
    }

    function soma() {
        var soma = 0
        for (let index = 0; index < carrinho.length; index++) {
            if (carrinho[index].nome === '') {
                soma += 0

            } else if (carrinho[index].ofertas) {

                let valorOriginal = 0
                for (let ofertaIndex = 0; ofertaIndex < carrinho[index].ofertas?.length; ofertaIndex++) {
                    valorOriginal += parseFloat(carrinho[index].ofertas[ofertaIndex].preco)


                }
                soma += (valorOriginal - (valorOriginal * parseFloat(carrinho[index].preco)) / 100)

            } else {
                soma += parseFloat(carrinho[index].preco)
            }
        }
        return soma.toFixed(2)
    }

    function precoPromocao(promocao: any) {
        var soma = 0
        for (let index = 0; index < promocao.ofertas.length; index++) {
            //console.log(parseFloat(carrinho[index].preco));

            soma += parseFloat(promocao.ofertas[index].preco)
        }
        return (soma - (soma * promocao.preco) / 100).toFixed(2)
    }

    return (
        <>
            <Navigation />
            <div className="cont1">
                <div className="row">
                    <div className="listac col-9">
                        <table className="table table-hover">
                            <tbody>
                                {
                                    carrinho[0] != undefined ?
                                        carrinho.map((carrinho) =>
                                            <div>
                                                <tr>
                                                    <th scope="row"><div className="iconeimg"></div></th>
                                                    <td>{carrinho.nome ? carrinho.nome : carrinho.pacote.nome}</td>
                                                    <td className="preco1">R$ {carrinho.nome ? precoPromocao(carrinho) : carrinho.preco}</td>
                                                    <td><BsFillTrashFill onClick={() => { deletar(carrinho.id) }} /></td>
                                                </tr>
                                            </div>
                                        )
                                        : <><h4>Você ainda não adicionou produtos ao seu carrinho!</h4></>
                                }

                            </tbody>
                        </table>
                        <h2 className="precototal">Preço total: R$ {carrinho[0] != undefined ? soma() : 0} </h2>
                        <Button onClick={() => { limparCarrinho() }} className="limpar">Finalizar compra!</Button>

                        {/*<AlertaProm prom="Essa promoção contém os seguintes produtos/serviços/pacotes" />*/}
                    </div>


                    {complementares?.length > 0 ?
                        <div className="sug col-3">
                            <div className="maissug">

                                <h3 className="titulosug">Sugestões</h3>

                                <div className="card sugest">
                                    <div className="card-imgc"></div>
                                    <div className="nome-prod">
                                        <h5>{complementares[0]?.nome}</h5>
                                    </div>
                                    <div className="card-botao">
                                        <Button type="submit"><a href={`http://localhost:3000/servico/${complementares[0]?.id}`}>Ver serviço!</a></Button>
                                    </div>
                                </div>

                            </div>
                        </div>
                        : <></>
                    }
                </div>

            </div>
        </>
    )
}