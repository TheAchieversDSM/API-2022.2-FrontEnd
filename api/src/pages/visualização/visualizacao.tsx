import React from 'react';
import Botao from '../../components/button';
import Navigation from '../../components/navbar';

import './visu.css'



export default function Visualizacao() {
    return (
        <>
            <Navigation/>
            <div>
                <h1>NOME DO PRODUTO</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                <h2>R$ 230,00</h2>
                <Botao/>
                <a>Adicionar ao carrinho</a>
            </div>
            <div>
                <h1>Confira nossos pacotes</h1>
                <div className="container">
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="col-3"></div>
                        <div className="col-3"></div>
                    </div>
                </div>
            </div>
            <div>
                <h1>Outras sugestões</h1>
            </div>
        </>
    )
}