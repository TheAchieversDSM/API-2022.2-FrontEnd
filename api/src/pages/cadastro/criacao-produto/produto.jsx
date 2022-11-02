import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import CreatableSelect from 'react-select/creatable';
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
    const [produtos, setProdutos] = useState(complementaresModelo)
    const [categoria, setCategoria] = useState(complementaresModelo)

    const [formValue, setFormValue] = useState([{
        produtoNome: "",
        produtoQuantidade: "",
        produtoCategoria: "",
        produtoDescricao: ""
    }]);

    const duplicarTab = (event) => {
        if (event.key === 'Tab') {
            let newfield = { produtoNome: "", produtoQuantidade: "", produtoCategoria: "", produtoDescricao: "" }
            setFormValue([...formValue, newfield])
        }
    }

    const handleChange = (index, event) => {
        let data = [...formValue];
        data[index][event.target.name] = event.target.value;
        setFormValue(data)

        console.log(formValue);
    };

    const handleChangeCategoria = (index, event) => {
        let data = [...formValue];
        data[index][event.label] = event.label;

        let categoria = { value: event.value, label: event.label }

        setFormValue([...formValue, categoria.label])
    }

    const [{ produtoNome, produtoQuantidade, produtoCategoria, produtoDescricao }] = formValue;

    const handleSubmit = (event) => {
        const produto = {
            nome: produtoNome,
            quantidade: produtoQuantidade,
            categoria: produtoCategoria,
            descricao: produtoDescricao,
        }

        event.preventDefault();

        axios.post(`http://localhost:8080/produtos/criarProduto`, produto).then((res) => {
            alert('Produto criado!');
        })

        let valores = {
            produtoNome: "",
            produtoQuantidade: "",
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
                                        <Form.Label>Quantidade do produto</Form.Label>
                                        <Form.Control
                                            required
                                            name="produtoQuantidade"
                                            value={fields.produtoQuantidade}
                                            onChange={event => handleChange(index, event)}
                                            type="number"
                                            placeholder="Insira a quantidade do produto" />
                                    </Form.Group>

                                </Row>

                                <Row className="mb-3">

                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Categoria do produto</Form.Label>
                                        <CreatableSelect
                                            name="produtoCategoria"
                                            value={fields.produtoCategoria}
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