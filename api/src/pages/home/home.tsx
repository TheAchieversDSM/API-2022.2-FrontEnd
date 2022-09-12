import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navigation from '../../components/navbar';

import './style.css'

export default function Home() {
    return (
        <>
            <Navigation />

            <div className='display'></div>

            <div className='container'>

                <div className="colecao-categorias">
                    
                    <div className="categoria"></div>
                    <div className="categoria"></div>
                    <div className="categoria"></div>
                    <div className="categoria"></div>
                    <div className="categoria"></div>

                </div>

                <div className="feed">

                    <div className="card">

                        <div className="card-img"></div>

                        <div className="card-botao">
                            <Button type="submit"><Link to="/">Ver Produto!</Link></Button>
                        </div>

                    </div>

                    <div className="card">

                        <div className="card-img"></div>

                        <div className="card-botao">
                            <Button type="submit"><Link to="/">Ver Produto!</Link></Button>
                        </div>

                    </div>

                    <div className="card">

                        <div className="card-img"></div>

                        <div className="card-botao">
                            <Button type="submit"><Link to="/">Ver Produto!</Link></Button>
                        </div>

                    </div>

                    <div className="card">

                        <div className="card-img"></div>

                        <div className="card-botao">
                            <Button type="submit"><Link to="/">Ver Produto!</Link></Button>
                        </div>

                    </div>

                    <div className="card">

                        <div className="card-img"></div>

                        <div className="card-botao">
                            <Button type="submit"><Link to="/">Ver Produto!</Link></Button>
                        </div>

                    </div>

                    <div className="card">

                        <div className="card-img"></div>

                        <div className="card-botao">
                            <Button type="submit"><Link to="/">Ver Produto!</Link></Button>
                        </div>

                    </div>

                    <div className="card">

                        <div className="card-img"></div>

                        <div className="card-botao">
                            <Button type="submit"><Link to="/">Ver Produto!</Link></Button>
                        </div>

                    </div>

                    <div className="card">

                        <div className="card-img"></div>

                        <div className="card-botao">
                            <Button type="submit"><Link to="/">Ver Produto!</Link></Button>
                        </div>

                    </div>

                </div>
            
            </div>

        </>
    )
}