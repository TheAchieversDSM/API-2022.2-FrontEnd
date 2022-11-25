import { useEffect, useState } from 'react';

import Navigation from "../../components/navbar";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Select from "react-select";
import axios from 'axios';
import './carrinho.css'

let modelo = [{ 'id': '', 'nome': '', 'descricao': '', }]
let modeloObrigatorio = [{ 'id': '', 'nome': '', 'descricao': '' }]
let modeloPreco = [{ 'id': '', 'nome': '', 'pacote': ''}]
let modeloPacoteServ = [{ 'id': '', 'nome': ''}]
const modeloOptions = [{ value: '', label: '' }];
let modeloOferta = [{'id': '', 'pacote':{ 'id': '', 'nome': ''}, 'preco': {'valor': '', 'periodo': ''}}]

var cont = 0

export default function Carrinho() {
    const { id } = useParams();
    const [servico, setServico] = useState(Object)
    const [complementos, setComplementos] = useState(Object)
    const [servicosObrigatorios, setservicosObrigatorios] = useState(Object)
    const [data, setData] = useState(modeloPreco)
    const [pacoteServ, setPacoteServ] = useState(modeloPacoteServ)
    const [oferta, setOferta] = useState(modeloOferta)
    const [preco, setPreco] = useState('')

    const handleChange = (event: any) => {
        setPreco(event.target.value)
        console.log(preco)
    }
    


    useEffect(() => {
        async function render() {
            axios.get(`http://localhost:8080/servicos/pegarServico/${id}`,).then((res) => {
                setServico(res.data)
            
                setComplementos(res.data.complementares)

                setservicosObrigatorios(res.data.servicosObrigatorios)
            })

            axios.get(`http://localhost:8080/pacotes/pegarPeloServico/${servico.id}`).then((res) => {
                setServico({ ...servico, pacotes: res.data })
            })

            axios.get(`http://localhost:8080/pacotes/pegarTodosPacotes`).then((res) => {
                const pacotesX = []
                const optionsX = []
                console.log(res.data)
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].servico.id == servico.id) {

                        let opt = { id: res.data[i].id, nome: res.data[i].nome}

                        let option = { value: res.data[i].nome, label: res.data[i].nome }

                        pacotesX.push(opt)
                        optionsX.push(option)
                    }
                }

                setPacoteServ(pacotesX)  
                         
            })

            axios.post(`http://localhost:8080/ofertas/pegarOfertasPacotes`, pacoteServ).then((res) => {
                setOferta(res.data)  
                setPreco(res.data[0].preco.valor)
                }        
            )
        }

        if (cont <= 5) {
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

                                    <div className="col-6">
                                        <Form.Label>Planos & Períodos</Form.Label>
                                        <Form.Select onChange={(event) => handleChange(event)}>
                                            {oferta.map((ofe: any) => 
                                                <option value={ofe.preco.valor}>{ofe.pacote.nome} - {ofe.preco.periodo}</option>
                                            )}  
                                        </Form.Select>
                                    </div>

                                    <div className="col-4 value">
                                        <h5>Valor: </h5>
                                        <p>R$ {preco? preco : null}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {servico.servicosObrigatorios?.length > 0 ?
                            <div>
                                {servicosObrigatorios != null ?
                                    servicosObrigatorios.map((servicoObrigatorio: any) =>
                                        <div className="card card1">
                                            <h5 className="card-header card-header1"><Form.Check disabled defaultChecked={true} label={servicoObrigatorio.nome} /></h5>
                                            <div className="card-body card-body1">
                                                <p className="card-text">{servicoObrigatorio.descricao}</p>
                                                <div className="row">
                                                    <div className="col-4">
                                                        <Form.Select>
                                                            <option disabled>Plano</option>

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
                                    complementos.map((complemento: any) =>
                                        <div className="card card1">
                                            <h5 className="card-header card-header1"><Form.Check label={complemento.nome} /></h5>
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
                            <li className="list-group-item"><Form.Check disabled defaultChecked={true} label={servico.nome} /></li>
                            {servico.servicosObrigatorios?.length > 0 ?
                                <div>
                                    {servicosObrigatorios != null ?
                                        servicosObrigatorios.map((obrigatorio: any) =>
                                            <li className="list-group-item"><Form.Check disabled defaultChecked={true} label={obrigatorio.nome} /></li>
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
                                        complementos.map((complemento: any) =>
                                            <li className="list-group-item"><Form.Check label={complemento.nome} /></li>
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