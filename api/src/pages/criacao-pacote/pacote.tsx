import React, { useState } from 'react';
import Navigation from '../../components/navbar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Sidebar from '../../components/sidebar';
import Select from 'react-select';
import axios from 'axios';

import './pacote.css'

const options = [
    { value: 'produto 1', label: 'Produto 1' },
    { value: 'produto 2', label: 'Produto 2' },
    { value: 'produto 3', label: 'Produto 3' },
    { value: 'produto 4', label: 'Produto 4' },
];

export default function Produto() {

    const [formValue, setFormValue] = useState({
        pacoteNome: "",
        pacoteDescricao: "",
        pacoteServicos: ""
    });

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    const { pacoteNome, pacoteDescricao, pacoteServicos} = formValue;

    const handleSubmit = (event: any) => {
        const pacote = {
            nome: pacoteNome,
            descricao: pacoteDescricao
        }

        event.preventDefault();

        axios.post(`http://localhost:8080/pacotes/criarPacote`, pacote).then((res) => {
            alert('Pacote criado!');
        })

        let valores = {
            pacoteNome: "",
            pacoteDescricao: "",
            pacoteServicos: ""
        }
        
        setFormValue(valores);
    };

    return (
        <>
            <Navigation />
            
            <Sidebar />

            <div className='container-prod'>
            
                <h1>Criação de Pacote</h1>

                <Form /*noValidate validated={validated} onSubmit={handleSubmit}*/>

                    <Row className="mb-3">
                        
                        <Form.Group as={Col} md="6">
                            <Form.Label>Nome do Pacote</Form.Label>
                            <Form.Control
                                required
                                name="pacoteNome"
                                value={pacoteNome}
                                onChange={handleChange}
                                type="text"
                                placeholder="Nome do Pacote"
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Descrição do Pacote</Form.Label>
                            <Form.Control
                                required
                                name="pacoteDescricao"
                                value={pacoteDescricao}
                                onChange={handleChange}
                                as="textarea"
                                type="text"
                                placeholder="Descrição da Pacote"
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Categoria</Form.Label>
                            <Select
                                isMulti
                                name="pacoteServicos"
                                value={pacoteServicos}
                                onChange={handleChange}
                                isClearable={true}
                                isSearchable={true}
                                isLoading={false}
                            />
                        </Form.Group>
                        
                    </Row>

                    <Button type="submit" onClick={handleSubmit}>Criar Pacote!</Button>

                </Form>
            
            </div>

        </>
    )
}