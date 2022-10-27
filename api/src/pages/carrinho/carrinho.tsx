import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from "react-bootstrap";
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
                        <div className="card">
                            <h5 className="card-header">Nome do serviço</h5>
                            <div className="card-body">
                                <p className="card-text">Nulla facilisi. Sed porttitor malesuada mi, nec finibus mi ornare non. Ut mattis tempus ante a ultrices. Aenean ornare massa eget ligula ultricies, vitae sagittis eros faucibus. Maecenas sed volutpat orci, quis euismod metus. Pellentesque mollis consectetur venenatis. Proin euismod risus sapien, ac tincidunt lectus porttitor a.</p>
                                <div className="row">
                                    <div className="col-4">
                                        <Form.Select>
                                            <option>Plano</option>
                                            <option>Básico</option>
                                            <option>Médio</option>
                                        </Form.Select>
                                    </div>
                                    <div className="col-4">
                                        <Form.Select>
                                            <option>Período</option>
                                            <option>Anual</option>
                                            <option>Mensal</option>
                                        </Form.Select>
                                    </div>
                                    <div className="col-4 value">
                                        <h5>Valor: </h5>
                                        <p>R$ 100,00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <h5 className="card-header"><Form.Check label="Nome do serviço obrigatório"/></h5>
                            <div className="card-body">
                                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac hendrerit ipsum. Vestibulum ullamcorper elit et lorem convallis, quis gravida arcu luctus. In hac habitasse platea dictumst. Mauris sed diam libero. Mauris at dolor fringilla, sagittis tellus id, faucibus odio. Curabitur egestas volutpat vestibulum. Sed erat eros, lobortis id volutpat sed, lobortis a leo.</p>
                                <div className="row">
                                    <div className="col-4">
                                        <Form.Select>
                                            <option>Plano</option>
                                            <option>Básico</option>
                                            <option>Médio</option>
                                        </Form.Select>
                                    </div>
                                    <div className="col-4">
                                        <Form.Select>
                                            <option>Período</option>
                                            <option>Anual</option>
                                            <option>Mensal</option>
                                        </Form.Select>
                                    </div>
                                    <div className="col-4 value">
                                        <h5>Valor: </h5>
                                        <p>R$ 100,00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*<AlertaProm prom="Essa promoção contém os seguintes produtos/serviços/pacotes" />*/}
                    </div>

                    <div className="resumo col-3">
                        <ul className="list-group">
                            <li className="list-group-item">RESUMO</li>
                            <li className="list-group-item"><Form.Check label="A second item"/></li>
                            <li className="list-group-item"><Form.Check label="A second item"/></li>
                            <li className="list-group-item"><Form.Check label="A second item"/></li>
                            <li className="list-group-item"><Form.Check label="A second item"/></li>
                        </ul>
                        <h4 className="valor">Valor total: R$ 180,00</h4>
                        <Button>Finalizar compra!</Button>
                    </div>
                    
                </div>

            </div>
        </>
    )
}