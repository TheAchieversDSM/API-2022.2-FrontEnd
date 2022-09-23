import { Table } from "react-bootstrap";
import Navigation from "../../components/navbar";
import Sidebar from "../../components/sidebar";

import "./listagens.css"

export default function Listagens() {
    return (
        <>
            <Navigation />
            <Sidebar />

            <div className="container-lista">
                <h1>Listagens</h1>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {/*<th></th>*/}
                            <th>Nome</th>
                            <th>Preço</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {/*<td><div className="lista-img"></div></td>*/}
                            <td className="img-top">Mark</td>
                            <td className="img-top">Otto</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </>
    )
}