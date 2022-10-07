import React, { useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AlertaProm from "../../components/alerta";
import Navigation from "../../components/navbar";
import { BsFillTrashFill } from 'react-icons/bs'
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
  
  useEffect(()=>{
      if(localStorage.getItem("servicoCarrinho") != undefined){
        setCarrinho(JSON.parse(localStorage.getItem("servicoCarrinho")!))
        console.log(carrinho)
        
      }
      else{
        setCarrinho(modelo)
      }
      
  
  },[])

  function deletar(id: string){
    for (let index = 0; index < carrinho.length; index++) {
      if(carrinho[index].id == id){ 
          console.log(carrinho[index]);
          carrinho.splice(index,1)
          localStorage.setItem("servicoCarrinho",JSON.stringify(carrinho))
      }
  }
    window.location.reload()
  }
  
  function soma(){
    var soma = 0
    for (let index = 0; index < carrinho.length; index++) {
      console.log(parseFloat(carrinho[index].preco));
      
      soma += parseFloat(carrinho[index].preco)
    }
    return soma
  }

    return(
        <>
        <Navigation/>
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
                                  <td>{carrinho.nome}</td>
                                  <td className="preco1">R$ {carrinho.preco}</td>
                                  <td><BsFillTrashFill onClick={()=>{deletar(carrinho.id)}} /></td>
                                  </tr>
                              </div>
                                )
                                : <><h4>Você ainda não adicionou produtos ao seu carrinho!</h4></>
                                }
                     
                  </tbody>
                  </table>
                  <h2 className="precototal">R$ {carrinho[0] != undefined ? soma() : 0} Preço total</h2>
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