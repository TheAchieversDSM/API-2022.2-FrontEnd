import Navigation from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { Tab, Tabs } from "react-bootstrap";

import "./gerenciamento.css"

import GerPromocao from "./promocao/gerPromocao";
import GerServicos from "./servico/servico";

export default function Gerenciamento(){
    return(
        <>
            <Navigation />

            <Sidebar />

            <div className="container-prod container">
                <Tabs
                defaultActiveKey="profile"
                id="fill-tab-example"
                className="mb-3"
                >
                    <Tab eventKey="pacotesOfertas" title="Pacotes/Ofertas" className="tab1">

                    </Tab>
                    <Tab eventKey="servicos" title="Serviços" className="tab2">
                        <GerServicos/>
                    </Tab>
                    <Tab eventKey="promocoes" title="Promoçoes" className="tab3">
                        <GerPromocao/>
                    </Tab>
                    <Tab eventKey="listagens" title="Listagens" className="tab4">

                    </Tab>
                </Tabs>
            </div>
        </>
    )
}