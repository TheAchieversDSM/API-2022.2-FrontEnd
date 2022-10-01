import Navigation from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { BsTrash } from "react-icons/bs"
import { Button } from "react-bootstrap";

import "./gerenciamento.css"

export default function Gerenciamento(){
    return(
        <>
            <Navigation />

            <Sidebar />

            <div className="container-prod container">
                <div className="row">
                    <div className="col-8">
                        <h1>Serviços selecionados</h1>
                        <table className="table table-hover ">
                                <tbody>
                                    <tr>
                                        <td>Nome do serviço</td>
                                        <td><Button className="lixeira"><BsTrash className="lixo"/></Button></td>
                                    </tr>
                                </tbody>
                        </table>
                    </div>
                    
                </div>
                <div className="botoes ">
                        <Button variant="primary" size="lg" className="btn1">
                            Alterar regras de negócio
                        </Button>
                        <Button variant="primary" size="lg" className="btn2">
                            Atualizar dados de serviço
                        </Button>
                        <Button variant="primary" size="lg" className="btn3">
                            Finalizar
                        </Button>
                </div>
            </div>
        </>
    )
}