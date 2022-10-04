import React, { useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AlertaProm from "../../components/alerta";
import Navigation from "../../components/navbar";
import './carrinho.css'

let modelo = [
  {
      'preco':'',
      'nome':'',
      'id':'',
  }
]


export default function Carrinho() {
  const [carrinho,setCarrinho] = useState(modelo)
  console.log(localStorage.getItem("servicoCarrinho"))
  useEffect(()=>{
    if(localStorage.getItem("servicoCarrinho") != undefined){
      setCarrinho(modelo)
  }
  else{

    setCarrinho(JSON.parse(localStorage.getItem("servicoCarrinho")!))
  }
  
})

    return(
        <>
        <Navigation/>
        <div className="cont1">
            <div className="row">
                <div className="listac col-9">
                  <table className="table table-hover">
                  <tbody>
                    <tr>
                      <th scope="row">
                        <div className="iconeimg"></div>
                      </th>
                      {
                        carrinho[0].nome != ''?
                        carrinho.map((carrinho) =>
                              <div>
                                  <tr>
                                  <th scope="row"><div className="iconeimg"></div></th>
                                  <td>{carrinho.nome}</td>
                                  <td className="preco1">{carrinho.preco}</td>
                                  </tr>
                              </div>
                                )
                                : <></>
                                }
                      <td>Nome do prod/serv</td>
                      <td className="preco1">Preço</td>
                    </tr>
                    <tr>
                      <th scope="row"><div className="iconeimg"></div></th>
                      <td>Nome do prod/serv</td>
                      <td className="preco1">Preço</td>
                    </tr>
                    <tr>
                      <th scope="row"><div className="iconeimg"></div></th>
                      <td >Nome do prod/serv</td>
                      <td className="preco1">Preço</td>
                    </tr>
                  </tbody>
                  </table>
                  <h2 className="precototal">Preço total</h2>
                  <AlertaProm prom="Essa promoção contém os seguintes produtos/serviços/pacotes"/>
                </div>

                <div className="sug col-3">
                  <div className="maissug">
                    <h3 className="titulosug">Sugestões</h3>
                    <div className="card sugest">
                      <div className="card-imgc"></div>
                      <div className="nome-prod">
                        <h5>Nome do produto</h5>
                      </div>
                      <div className="card-botao">
                        <Button type="submit"><Link to={""} >Ver Produto!</Link></Button>
                      </div>
                    </div>
                    <div className="card sugest">
                      <div className="card-imgc"></div>
                      <div className="nome-prod">
                        <h5>Nome do produto</h5>
                      </div>
                      <div className="card-botao">
                        <Button type="submit"><Link to={""} >Ver Produto!</Link></Button>
                      </div>
                    </div>
                    <div className="card sugest">
                      <div className="card-imgc"></div>
                      <div className="nome-prod">
                        <h5>Nome do produto</h5>
                      </div>
                      <div className="card-botao">
                        <Button type="submit"><Link to={""} >Ver Produto!</Link></Button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
        </>
    )
}