import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import AlertaProm from "../../components/alerta";
import Navigation from "../../components/navbar";
import { BsFillTrashFill } from 'react-icons/bs'
import axios from 'axios';
import './carrinho.css'

let modelo = [{ 'id': '', 'nome': '', 'descricao': '', }]

let modeloObrigatorio = [{ 'id': '', 'nome': '', 'descricao': '' }]

var cont = 0

export default function Carrinho() {
    const [servico, setServico] = useState(Object)
    const { id } = useParams();
    const [complementos, setComplementos] = useState(modelo)
    const [servicosObrigatorios, setservicosObrigatorios] = useState(modeloObrigatorio)

    useEffect(() => {
        async function render() {
            axios.get(`http://localhost:8080/servicos/pegarServico/${id}`,).then((res) => {

                
                setServico(res.data)
                console.log(res.data)

                setComplementos(res.data.complementares)
                console.log(res.data.complementares)

                setservicosObrigatorios(res.data.servicosObrigatorios)
                console.log(res.data.servicosObrigatorios)
                
             
                





            })

            axios.get(`http://localhost:8080/pacotes/pegarPeloServico/${servico.id}`).then((res)=>{
                setServico({...servico, pacotes: res.data})
                console.log(res.data)
            })
        }
        if(cont <=3){
            render()
            cont += 1
        }
        
    }, [servico])



    return (
        <>
            <Navigation />

            <div className="cont">
                <div className="row">
                    <div className="listac col-9">
                        <h3>Contratar {servico.nome}</h3>
                        <div className="card card1">
                            <h5 className="card-header card-header1">{servico.nome}</h5>
                            <div className="card-body card-body1">
                                <p className="card-text card-text1">{servico.descricao}</p>
                                <div className="row">
                                    <div className="col-4"> 
                                    <Form.Select>
                                        <option>Plano</option>
                                        {servico.pacote?.map((pacote: any)=>
                                                <option>{pacote.nome}</option>
                                            )}
                                        
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
                        {servico.servicosObrigatorios?.length > 0 ?
                            <div>
                                {servicosObrigatorios != null ?
                                    servicosObrigatorios.map(servicoObrigatorio =>
                                <div className="card card1">
                                    <h5 className="card-header card-header1"><Form.Check defaultChecked={true} label={servicoObrigatorio.nome}/></h5>
                                    <div className="card-body card-body1">
                                        <p className="card-text">{servicoObrigatorio.descricao}</p>
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
                        {servico.complementares?.length > 0 ?
                            <div>
                                {complementos != null ?
                                    complementos.map(complemento =>
                                <div className="card card1">
                                    <h5 className="card-header card-header1"><Form.Check label={complemento.nome}/></h5>
                                    <div className="card-body card-body1">
                                        <p className="card-text">{complemento.descricao}</p>
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
                    </div>

                    <div className="resumo col-3">
                        <ul className="list-group">
                            <li className="list-group-item"><h4>RESUMO</h4></li>
                            <li className="list-group-item"><Form.Check defaultChecked={true} label={servico.nome}/></li>
                            {servico.servicosObrigatorios?.length > 0 ?
                                <div>
                                    {servicosObrigatorios != null ?
                                    servicosObrigatorios.map(obrigatorio =>
                                    <li className="list-group-item"><Form.Check defaultChecked={true} label={obrigatorio.nome}/></li>
                                    )
                                    : <></>
                                }
                                    </div>
                                :
                                <></>
                            }
                            {servico.complementares?.length > 0 ?
                                <div>
                                    {complementos != null ?
                                    complementos.map(complemento =>
                                    <li className="list-group-item"><Form.Check label={complemento.nome}/></li>
                                    )
                                    : <></>
                                }
                                    </div>
                            :
                            <></>
                        }
                        </ul>
                        <h4 className="valor">Valor total: R$ 180,00</h4>
                        <Button>Finalizar compra!</Button>
                    </div>
                    
                </div>

            </div>
        </>
    )
}