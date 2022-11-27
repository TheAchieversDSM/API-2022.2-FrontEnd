import { useEffect, useState } from 'react';

import Navigation from "../../components/navbar";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Select from "react-select";
import axios from 'axios';
import './carrinho.css'

let modelo = [{ 'id': '', 'nome': '', 'descricao': '', }]
let modeloObrigatorio = [{ 'id': '', 'nome': '', 'descricao': '' }]
let modeloPreco = [{ 'id': '', 'nome': '', 'pacote': '' }]
let modeloPacoteServ = [{ 'id': '', 'nome': '' }]
const modeloOptions = [{ value: '', label: '' }];
let modeloServico = [{ 'descricao': "", 'id': "", 'nome': "", 'pacotes': [{/*  'id': '', 'nome': ''  */ }], 'ofertas': [{}] }]
let modeloOferta = [{ 'id': '', 'pacote': { 'id': '', 'nome': '' }, 'preco': { 'valor': '', 'periodo': '' } }]

var cont = 0

export default function Carrinho() {
    const { id } = useParams();
    const [servico, setServico] = useState(Object)
    const [complementos, setComplementos] = useState(Object)
    const [servicosObrigatorios, setServicosObrigatorios] = useState(modeloServico)
    const [pacoteServObrig, setPacoteServObrig] = useState(modeloPacoteServ)
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
            let serv = {}

            axios.get(`http://localhost:8080/servicos/pegarServico/${id}`,).then((res) => {
                serv = { descricao: res.data.descricao, id: res.data.id, nome: res.data.nome, complementares: res.data.complementares, obrigatorios: res.data.servicosObrigatorios }
                setServico(serv)
                console.log(servico);

                //setComplementos(res.data.complementares)

                axios.get(`http://localhost:8080/servicos/pegarTodosServicos`).then((res) => {
                    let obrig = []

                    for (let i = 0; i < servico.obrigatorios?.length; i++) {
                        for (let index = 0; index < res.data.length; index++) {
                            if (servico.obrigatorios[i].id == res.data[index].id) {
                                let servObrig = { id: res.data[index].id, nome: res.data[index].nome, descricao: res.data[index].descricao, pacotes: res.data[index].pacotes, ofertas: res.data[index].ofertas }

                                axios.get(`http://localhost:8080/pacotes/pegarTodosPacotes`).then((res) => {
                                    const pacotes = res.data

                                    for (let inde = 0; inde < pacotes.length; inde++) {
                                        if (pacotes[inde].servico.id == servObrig.id) {
                                            servObrig.pacotes = [{ id: pacotes[inde].id, nome: pacotes[inde].nome }]
                                        }
                                    }

                                    let pacotinhos = servObrig.pacotes

                                    axios.post(`http://localhost:8080/ofertas/pegarOfertasPacotes`, pacotinhos).then((res) => {
                                        servObrig.ofertas = res.data
                                    })
                                })

                                obrig.push(servObrig)
                            }
                        }
                    }

                    setServicosObrigatorios(obrig)
                    
                    console.log(servicosObrigatorios[0].ofertas);
                })
            })

            // SERVIÇO PRINCIPAL ✨
            axios.get(`http://localhost:8080/pacotes/pegarPeloServico/${servico.id}`).then((res) => {
                setServico({ ...servico, pacotes: res.data })
            })

            axios.get(`http://localhost:8080/pacotes/pegarTodosPacotes`).then((res) => {
                const pacotesX = []
                const optionsX = []

                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].servico.id == servico.id) {

                        let opt = { id: res.data[i].id, nome: res.data[i].nome }

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
            })
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
                                        <p>R$ {preco ? preco : null}</p>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {servico.obrigatorios?.length > 0 ?
                            <div>
                                {servicosObrigatorios != null ?
                                    servicosObrigatorios.map((obrigatorio: any) =>
                                        <div className="card card1">
                                            <h5 className="card-header card-header1"><Form.Check disabled defaultChecked={true} label={obrigatorio.nome} /></h5>
                                            <div className="card-body card-body1">
                                                <p className="card-text">{obrigatorio.descricao}</p>
                                                <div className="row">
                                                    <div className="col-4">

                                                       <Form.Select onChange={(event) => handleChange(event)}>
                                                            {obrigatorio.ofertas?.map((ofe: any) =>
                                                                <option value={ofe.preco?.valor}>{ofe.preco?.valor}</option>
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
                                    )
                                    :
                                    <></>
                                }
                            </div>
                            :
                            <h2>oiiii</h2>
                        }

                        {/* {servico.complementares?.length > 0 ?
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
                        } */}
                    </div>

                    <div className="resumo col-3">
                        <ul className="list-group">
                            <li className="list-group-item"><h4>RESUMO</h4></li>
                            <li className="list-group-item"><Form.Check disabled defaultChecked={true} label={servico.nome} /></li>
                            {/*{servico.servicosObrigatorios?.length > 0 ?
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
                            } */}
                        </ul>
                        <h4 className="valor">Valor total: R$ 180,00</h4>
                        <Button>Finalizar compra!</Button>
                    </div>

                </div>

            </div>
        </>
    )
}