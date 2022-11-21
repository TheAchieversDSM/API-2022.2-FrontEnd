import { Tab, Tabs } from "react-bootstrap";

import Navigation from "../../components/navbar";
import Sidebar from "../../components/sidebar";

import Promocao from "./criacao-promocao/promocao";
import Produto from "./criacao-produto/produto";
import Servico from "./criacao-servico/servico";
import Pacote from "./criacao-pacote/pacote";

export default function Cadastro() {
    return (
        <>
            <Navigation />

            <Sidebar />

            <div className="container-prod container">

{/*                 <div className="tab">
                    <button className="tablinks" ref="/criacao-produtos">London</button>
                    <button className="tablinks" ref="/criacao-servicos">Paris</button>
                    <button className="tablinks" ref="/criacao-pacotes">Tokyo</button>
                </div> */}

            </div>
        </>
    )
}