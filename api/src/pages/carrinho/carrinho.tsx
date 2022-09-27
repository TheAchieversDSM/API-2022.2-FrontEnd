import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navigation from "../../components/navbar";
import './carrinho.css'


export default function Carrinho() {
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