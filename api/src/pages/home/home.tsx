import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navigation from '../../components/navbar';
import { BsFilterCircle, BsBriefcase, BsPlayBtn, BsMusicPlayer, BsBug } from "react-icons/bs"

import './home.css'

let modelo = [
    {
        'id': '',
        'nome': '',
        'preco': '',
        'descricao': ''
    }
]

export default function Home() {
    const [servicos, setServicos] = useState(modelo)

    function filtrar(categoria: string) {
        if(categoria === 'Todos') {
            axios.get(`http://localhost:8080/servicos/pegarTodosServicos`).then((res) => {
                setServicos(res.data)
                console.log(res.data)
            })
        }else{
            axios.get(`http://localhost:8080/servicos//todosServicosPelaCategoria/${categoria}`).then((res) => {
                setServicos(res.data)
                console.log(res.data)
            })
        }
    }

    useEffect(() => {
        async function render() {
            axios.get(`http://localhost:8080/servicos/pegarTodosServicos`).then((res) => {
                setServicos(res.data)
                console.log(res.data)
            })
        }
        render()
    }, [])

    return (
        <>
            <Navigation />

            <div className='display'></div>
            <div className="area" >
                <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>

            <div className='container'>

                <div className="colecao-categorias">

                    <div className="categoria">
                            <BsFilterCircle onClick={()=>filtrar("Todos")} />
                            <h4>Todos</h4>
                    </div>

                    <div className="categoria">
                        <BsBriefcase onClick={()=>filtrar("Meu Negócio")} />
                        <h4>Meu Negócio</h4>
                    </div>

                    <div className="categoria">
                        <BsPlayBtn onClick={()=>filtrar("Streaming")} />
                        <h4>Streaming</h4>
                    </div>

                    <div className="categoria">
                        <BsMusicPlayer onClick={()=>filtrar("Música")} />
                        <h4>Música</h4>
                    </div>

                    <div className="categoria">
                        <BsBug onClick={()=>filtrar("Segurança Digital")} />
                        <h4>Segurança Digital</h4>
                    </div> 

                </div>

                <div className="feed">
                    {servicos.map(servico =>
                        <>
                            <div className="card">

                                <div className="card-imghome"></div>

                                <div className="nome-prod">
                                    <h4>{servico.nome}</h4>
                                </div>

                                <div className="card-botao">
                                    <Button type="submit"><Link to={`/servico/${servico.id}`}>Ver Serviço!</Link></Button>
                                </div>

                            </div>
                        </>
                    )}

                </div>

            </div>

        </>
    )
}