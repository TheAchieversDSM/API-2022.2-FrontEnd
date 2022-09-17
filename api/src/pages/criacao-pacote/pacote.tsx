import React, { useEffect, useState } from 'react';
import Navigation from '../../components/navbar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Sidebar from '../../components/sidebar';
import Select from 'react-select';
import axios from 'axios';

import './pacote.css'

const modeloOptions = [
    { 
    value: '', 
    label: '' 
    }
];

type servicoModelo={id:"",nome:""}

export default function Pacote() {
    const [servicos, setServicos] = useState(modeloOptions)

    let listaServicos: servicoModelo[] = []

    const [formValue, setFormValue] = useState({
        pacoteNome: "",
        pacoteDescricao: "",
        pacoteServicos: listaServicos
    });

    const handleChangeServicos = (event: any) =>{
        var servicosSelecionados:  servicoModelo[] =  []
        for (let index = 0; index < event.length; index++) {
            let servico = {id:event[index].value, nome:event[index].label}
            console.log(servico)
            servicosSelecionados.push(servico)
        }
        setFormValue((prevState) => {
            return {
                ...prevState,
                pacoteServicos: servicosSelecionados,
            };
        });
    }

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

    
    useEffect(()=>{
        async function render() { 
        axios.get(`http://localhost:8080/servicos/pegarTodosServicos`).then((res)=>{
                var servicos = []
                for (let index = 0; index < res.data.length; index++) {             
                    let option = {
                        value: res.data[index].id,
                        label: res.data[index].nome
                    }           
                    servicos.push(option)
                }
                setServicos(servicos)
            })
        }
        render()
    },[])

    const handleSubmit = (event: any) => {
        const pacote = {
            nome: pacoteNome,
            descricao: pacoteDescricao,
            servicos: pacoteServicos
        }

        event.preventDefault();

        axios.post(`http://localhost:8080/pacotes/criarPacote`, pacote).then((res) => {
            alert('Pacote criado!');
        })

        let valores = {
            pacoteNome: "",
            pacoteDescricao: "",
            pacoteServicos: listaServicos
        }
        
        setFormValue(valores);
    };

    return (
        <>
            <Navigation />
            
            <Sidebar />

            <div className='container-prod'>
            
                <h1>Cadastro de Pacotes</h1>

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
                                onChange={handleChangeServicos}
                                isClearable={true}
                                isSearchable={true}
                                isLoading={false} 
                                options={servicos}
                                />
                        </Form.Group>
                        
                    </Row>

                    <Button type="submit" onClick={handleSubmit}>Criar Pacote!</Button>

                </Form>
            
            </div>

        </>
    )
}