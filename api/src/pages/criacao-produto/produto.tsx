import React, { useEffect, useState } from 'react';
import Navigation from '../../components/navbar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Sidebar from '../../components/sidebar';
import Select from 'react-select';
import axios from 'axios';

import './produto.css'

const categorias = [
    { value: 'Meu Negócio', label: 'Meu Negócio' },
    { value: 'Streaming', label: 'Streaming' },
    { value: 'Música', label: 'Música' },
    { value: 'Segurança Digital', label: 'Segurança Digital' },
];

const complementaresModelo = [
    {value:'', label:''}
]

type produtoModelo={id:"",nome:""}



export default function Produto() {
    let lista: produtoModelo[] = []

    const [produtos,setProdutos] = useState(complementaresModelo)

    const [complementos,setComplementos] = useState([{id:"",nome:""}])

    const [formValue, setFormValue] = useState({
        produtoNome: "",
        produtoPreco: "",
        produtoCategoria: "",
        produtoDescricao: "",
        produtoComplementares: lista
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

    const handleChangeCategoria = (event: any) => {
        const { name, value } = {name: 'produtoCategoria', value: event[0].value};
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
        console.log(formValue.produtoComplementares)
    };

    const handleChangeComplementares = (event: any) => {
        var produtosSelecionados:  produtoModelo[] =  []
        for (let index = 0; index < event.length; index++) {
            let produto = {id:event[index].value, nome:event[index].label}
            console.log(produto)
            produtosSelecionados.push(produto)
        }
        setComplementos(produtosSelecionados)
        console.log(formValue)
    };

    const { produtoNome, produtoPreco, produtoCategoria, produtoDescricao, produtoComplementares } = formValue;

    const handleSubmit = (event: any) => {
        const produto = {
            nome: produtoNome,
            preco: produtoPreco,
            /* produtoCategoria: produtoCategoria, */
            descricao: produtoDescricao
        }

        event.preventDefault();

        axios.post(`http://localhost:8080/produtos/criarProduto`, produto).then((res) => {
            alert('Produto criado!');
        })

        let valores = {
            produtoNome: "",
            produtoPreco: "",
            produtoCategoria: "",
            produtoDescricao: "",
            produtoComplementares:lista
        }

        setFormValue(valores);

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
                setProdutos(produtos)
            })
        }
        render()
    },[])

    return (
        <>
            <Navigation />

            <Sidebar />

            <div className='container-prod'>

                <h1>Criação de Produto</h1>

                <Form>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Nome do Produto</Form.Label>
                            <Form.Control
                                required
                                name="produtoNome"
                                value={produtoNome}
                                onChange={handleChange}
                                type="text"
                                placeholder="Nome do Produto"
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Preço do Produto</Form.Label>
                            <Form.Control
                                required
                                name="produtoPreco"
                                value={produtoPreco}
                                onChange={handleChange}
                                type="number"
                                placeholder="Preço da Promoção"
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Categoria do Produto</Form.Label>
                            <Select
                                isMulti = {true}
                                name="produtoCategoria"
                                options={categorias}
                                onChange={handleChangeCategoria}
                                isClearable={true}
                                isSearchable={true}
                                closeMenuOnSelect ={false}
                                isLoading={false}
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3 FormText" >

                        <Form.Group as={Col} md="6">
                            <Form.Label>Descrição do Produto</Form.Label>
                            <Form.Control
                                required
                                name="produtoDescricao"
                                value={produtoDescricao}
                                onChange={handleChange}
                                as="textarea"
                                type="text"
                                placeholder="Descrição do Produto"
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Produtos Complementares</Form.Label>
                            <Select
                                isMulti
                                name="produtoComplementares"
                                options={produtos}
                                onChange={handleChangeComplementares}
                                isClearable={true}
                                isSearchable={true}
                                closeMenuOnSelect ={false}
                                isLoading={false}
                            />
                        </Form.Group>

                    </Row>

                    <Button type="submit" onClick={handleSubmit}>Criar Produto!</Button>

                </Form>

            </div>

        </>
    )
}