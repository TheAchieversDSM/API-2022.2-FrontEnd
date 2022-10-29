import { Tab, Tabs } from "react-bootstrap";

import Navigation from "../../components/navbar";
import Sidebar from "../../components/sidebar";

import Promocao from "./criacao-promocao/promocao";
import Produto from "./criacao-produto/produto";
import Servico from "./criacao-servico/servico";
import Pacote from "./criacao-pacote/pacote";
import Oferta from "./criacao-oferta/oferta";

export default function Cadastro() {
    return (
        <>
            <Navigation />

            <Sidebar />

            <div className="container-prod container">
                <Tabs
                    defaultActiveKey="produtos"
                    id="fill-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="produtos" title="Produtos" className="tab1">
                        <Produto />
                    </Tab>

                    <Tab eventKey="servicos" title="Serviços" className="tab2">
                        <Servico />
                    </Tab>

                    <Tab eventKey="pacotes" title="Pacotes" className="tab3">
                        <Pacote />
                    </Tab>

                    {/*<Tab eventKey="ofertas" title="Ofertas" className="tab4">
                        <Oferta />
                    </Tab>*/}

                    <Tab eventKey="promocoes" title="Promoções" className="tab4">
                        <Promocao />
                    </Tab>

                </Tabs>
            </div>
        </>
    )
}