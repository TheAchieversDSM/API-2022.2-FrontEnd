import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import AlertaProm from "../../components/alerta";
import Navigation from "../../components/navbar";
import { BsFillTrashFill } from 'react-icons/bs'
import axios from 'axios';
import './carrinho.css'

let modeloPacote = [
    {
        id: '',
        preco: '',
        pacote: { id: '', nome: '', servicos: [{ 'id': '', 'nome': ''}] }
    }
]

let modelo = [{ 'id': '', 'nome': '', 'descricao': '' }]

let modeloObrigatorio = [{ 'id': '', 'nome': '', 'descricao': '' }]

export default function Carrinho() {
    const [servico, setServico] = useState(Object)
    const { id } = useParams();
    const [pacote, setPacotes] = useState(modeloPacote)
    const [complementos, setComplementos] = useState(modelo)
    const [obrigatorios, setObrigatorios] = useState(modeloObrigatorio)

    useEffect(() => {
        async function render() {
            axios.get(`http://localhost:8080/servicos/pegarServico/${id}`,).then((res) => {
                
                setServico(res.data)
                console.log(res.data.servico)
                setComplementos(res.data.complementares)
                console.log(res.data.complementares)
                setObrigatorios(res.data.obrigatorios)
                console.log(res.data.obrigatorios)
            })
        }
        render()
    }, [servico])



    return (
        <>
            <Navigation />

            <div className="cont1">
                <div className="row">
                    <div className="listac col-9">
                        <h3>Contratar {servico.nome}</h3>
                        <div className="card">
                            <h5 className="card-header">{servico.nome}</h5>
                            <div className="card-body">
                                <p className="card-text">{servico.descricao}</p>
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
                        {servico.obrigatorios?.length > 0 ?
                            <>
                                <div>
                                    {obrigatorios != null ?
                                        obrigatorios.map(obrigatorio =>
                                            <div className="card">
                                                <h5 className="card-header"><Form.Check defaultChecked={true} label={servico.obrigatorio}/></h5>
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
                                        )
                                        : <></>
                                    }
                                </div>
                            </>
                            :
                            <></>
                        }
                        {servico.complementares?.length > 0 ?
                            <div>
                                {complementos != null ?
                                    complementos.map(complemento =>
                                <div className="card">
                                    <h5 className="card-header"><Form.Check label={servico.complementar}/></h5>
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
                                )
                                : <></>
                            }
                        </div>
                        :
                        <></>
                    }
                        {/*<AlertaProm prom="Essa promoção contém os seguintes produtos/serviços/pacotes" />*/}
                    </div>

                    <div className="resumo col-3">
                        <ul className="list-group">
                            <li className="list-group-item"><h4>RESUMO</h4></li>
                            <li className="list-group-item"><Form.Check defaultChecked={true} label={servico.nome}/></li>
                            <div>
                                <li className="list-group-item"><Form.Check defaultChecked={true} label="A second item"/></li>
                            </div>
                            <div>
                                <li className="list-group-item"><Form.Check label="A second item"/></li>
                            </div>
                        </ul>
                        <h4 className="valor">Valor total: R$ 180,00</h4>
                        <Button>Finalizar compra!</Button>
                    </div>
                    
                </div>

            </div>
        </>
    )
}