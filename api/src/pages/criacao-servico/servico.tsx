import React, { useEffect, useState } from 'react';
import Navigation from '../../components/navbar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Sidebar from '../../components/sidebar';
import Select from 'react-select';

import './servico.css'
import axios from 'axios';

const modeloOptions = [
    { 
    value: '', 
    label: '' 
    }
];

type produtoModelo={id:"",nome:""}

export default function Servico() {
    let listaProdutos: produtoModelo[] = []
    
    const [options, setOptions] = useState(modeloOptions)

    const [formValue, setFormValue] = useState({
        servicoNome: "",
        servicoPreco: "",
        servicoProduto: listaProdutos,
        servicoDescricao: ""
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
    

    const { servicoNome, servicoPreco, servicoProduto, servicoDescricao } = formValue;

    const handleChangeProdutos = (event: any) => {
        var produtosSelecionados:  produtoModelo[] =  []
        for (let index = 0; index < event.length; index++) {
            let produto = {id:event[index].value, nome:event[index].label}
            console.log(produto)
            produtosSelecionados.push(produto)
        }
        setFormValue((prevState) => {
            return {
                ...prevState,
                servicoProduto: produtosSelecionados,
            };
        });
        console.log(formValue)
    };

    const handleSubmit = (event: any) => {
        const servico = {
            nome: servicoNome,
            descricao: servicoDescricao,
            preco: servicoPreco,
            produtos: servicoProduto,
        }
        axios.post("http://localhost:8080/servicos/criarServico",servico).then((res)=>{
            alert('Serviço criado!')
        })
        
        event.preventDefault();
    };

    useEffect(()=>{
        async function render() { 
        axios.get(`http://localhost:8080/produtos/pegarTodosProdutos`).then((res)=>{
                var produtos = []
                for (let index = 0; index < res.data.length; index++) {
                    let option = {
                        value: res.data[index].id,
                        label: res.data[index].nome
                    }
                    produtos.push(option)
                }
                setOptions(produtos)
            })
        }
        render()
    },[])

    return (
        <>
            <Navigation />
            
            <Sidebar />

            <div className='container-prod'>
            
                <h1>Criação de Serviços</h1>

                <Form /*noValidate validated={validated} onSubmit={handleSubmit}*/>

                    <Row className="mb-3">
                        
                        <Form.Group as={Col} md="6">
                            <Form.Label>Nome do Serviço</Form.Label>
                            <Form.Control
                                required
                                name="servicoNome"
                                value={servicoNome}
                                onChange={handleChange}
                                type="text"
                                placeholder="Nome do Serviço"
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Preço </Form.Label>
                            <Form.Control
                                required
                                name="servicoPreco"
                                value={servicoPreco}
                                onChange={handleChange}
                                type="number"
                                placeholder="Preço do Serviço"
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Produtos</Form.Label>
                            <Select 
                                isMulti
                                name="servicoProduto"
                                onChange={handleChangeProdutos}
                                isClearable={true}
                                isSearchable={true}
                                closeMenuOnSelect ={false}
                                isLoading={false}
                                options={options}
                            />
                        </Form.Group>
                        
                    </Row>

                    <Row className="mb-3 FormText" >
                        
                        <Form.Group as={Col} md="6">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control 
                                required
                                name="servicoDescricao"
                                value={servicoDescricao}
                                onChange={handleChange}
                                as="textarea"                                
                                type="text"
                                placeholder="Descrição do Serviço"
                            />                          
                        </Form.Group>

                    </Row>

                    <Button type="submit" onClick={handleSubmit}>Criar Servico!</Button>

                </Form>
            
            </div>

        </>
    )
}