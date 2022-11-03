import React, { useEffect, useState } from 'react';
import Navigation from '../../../components/navbar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Sidebar from '../../../components/sidebar';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import axios from 'axios';

import './produto.css'

const categorias = [
    { value: 'Meu Negócio', label: 'Meu Negócio', name: 'Meu Negócio' },
    { value: 'Streaming', label: 'Streaming', name: 'Streaming' },
    { value: 'Música', label: 'Música', name: 'Música' },
    { value: 'Segurança Digital', label: 'Segurança Digital', name: 'Segurança Digital' },
];

const complementaresModelo = [
    { value: '', label: '' }
]

export default function Produto() {
    let listaProdutos = []

    const [produtos, setProdutos] = useState(complementaresModelo)

    const [formValue, setFormValue] = useState([{
        produtoNome: "",
        produtoCategoria: "",
        produtoDescricao: ""
    }]);

    const duplicarTab = (event) => {
        if (event.key === 'Tab') {
            let newfield = { produtoNome: "", produtoCategoria: "", produtoDescricao: "" }
            setFormValue([...formValue, newfield])
        }
    }

    const handleChange = (index, event) => {
        console.log(event.target);
        let data = [...formValue];
        data[index][event.target.name] = event.target.value;
        setFormValue(data)
        console.log(formValue);

    };

    const handleChangeCategoria = (index, event) => {
        let data = [...formValue]
        var categoriasSelecionadas = []
        for (let i = 0; i < event.length; i++) {
            let categoria = { value: event[i].value, label: event[i].label }
            categoriasSelecionadas.push(categoria)
        }
        data[index].servicoCategoria = categoriasSelecionadas
        setFormValue(data)
    };

    const [{ produtoNome, produtoCategoria, produtoDescricao }] = formValue;

    const handleSubmit = (event) => {
        const produto = {
            nome: produtoNome,
            categoria: produtoCategoria,
            descricao: produtoDescricao,
        }

        event.preventDefault();

        axios.post(`http://localhost:8080/produtos/criarProduto`, produto).then((res) => {
            alert('Produto criado!');
        })

        let valores = {
            produtoNome: "",
            produtoCategoria: "",
            produtoDescricao: ""
        }

        console.log(formValue)

        setFormValue([valores]);
    };

    useEffect(() => {
        async function render() {
            axios.get(`http://localhost:8080/produtos/pegarTodosProdutos`).then((res) => {
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
    }, [])

    return (
        <>

            <div className='container-promo'>

                <h1>Cadastro de Produtos</h1>

                <Form>
                    {formValue.map((fields, index) => {
                        return (
                            <div key={index}>
                                 <h6>{fields.produtoNome}</h6>

                                <Row className="mb-3">

                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Nome do produto</Form.Label>
                                        <Form.Control
                                            required
                                            name="produtoNome"
                                            value={fields.produtoNome}
                                            onChange={event => handleChange(index, event)}
                                            type="text"
                                            placeholder="Insira o nome do produto" />
                                    </Form.Group>

                                </Row>

                                <Row className="mb-3">

                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Categoria do produto</Form.Label>
                                        <Select
                                            name="produtoCategoria"
                                            options={categorias}
                                            onChange={event => handleChangeCategoria(index, event)}
                                            isClearable={true}
                                            isSearchable={true}
                                            closeMenuOnSelect={true}
                                            isLoading={false} />
                                    </Form.Group>

                                </Row><Row className="mb-3 FormText">

                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Descrição do produto</Form.Label>
                                        <Form.Control
                                            required
                                            name="produtoDescricao"
                                            value={fields.produtoDescricao}
                                            onChange={event => handleChange(index, event)}
                                            onKeyDown={event => duplicarTab(event)}
                                            as="textarea"
                                            type="text"
                                            placeholder="Insira a descrição do produto" />
                                    </Form.Group>

                                </Row>
                            </div>
                        )
                    })}

                    <Button type="submit" onClick={handleSubmit}>Criar produto!</Button>
                </Form>

            </div>

        </>
    )
}