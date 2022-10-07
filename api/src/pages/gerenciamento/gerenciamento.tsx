import { useEffect, useState } from "react";
import Select from 'react-select';
import { BsTrash } from "react-icons/bs"
import { Button, Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import Navigation from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import Listagens from "./listagens/listagens";
import GerOferta from "./oferta/oferta";
import GerPromocao from "./promocao/gerPromocao";
import GerServicos from "./servico/servico";

import "./gerenciamento.css"

export default function Gerenciamento() {
    return (
        <>
            <Navigation />

            <Sidebar />

            <div className="container-prod container">
                <Tabs
                    defaultActiveKey="pacotesOfertas"
                    id="fill-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="pacotesOfertas" title="Pacotes/Ofertas" className="tab1">
                        <GerOferta />
                    </Tab>
                    <Tab eventKey="servicos" title="Serviços" className="tab2">
                        <GerServicos/>
                    </Tab>
                    <Tab eventKey="promocoes" title="Promoções" className="tab3">
                        <GerPromocao/>
                    </Tab>
                    <Tab eventKey="listagens" title="Listagens" className="tab4">
                        <Listagens />
                    </Tab>
                </Tabs>
            </div>
        </>
    )
}