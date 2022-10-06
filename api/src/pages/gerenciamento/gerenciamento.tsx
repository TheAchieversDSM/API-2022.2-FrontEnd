import { useEffect, useState } from "react";
import Select from 'react-select';
import { BsTrash } from "react-icons/bs"
import { Button, Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import Navigation from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import Check from "../../components/checkbox";
import Listagens from "../listagens/listagens";
import axios from "axios";

import "./gerenciamento.css"
import GerOferta from "./oferta/oferta";

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

                    </Tab>
                    <Tab eventKey="promocoes" title="Promoções" className="tab3">

                    </Tab>
                    <Tab eventKey="listagens" title="Listagens" className="tab4">
                        <Listagens />
                    </Tab>
                </Tabs>
            </div>
        </>
    )
}