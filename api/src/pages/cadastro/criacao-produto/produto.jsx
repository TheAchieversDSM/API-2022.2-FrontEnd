import { useEffect, useState } from 'react';

import CreatableSelect from 'react-select/creatable';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

import './produto.css'

const categorias = [
    { value: 'Meu Negócio', label: 'Meu Negócio' },
    { value: 'Streaming', label: 'Streaming' },
    { value: 'Música', label: 'Música' },
    { value: 'Segurança Digital', label: 'Segurança Digital' },
];

const complementaresModelo = [{ value: '', label: '' }]

export default function Produto() {
    const [produtos, setProdutos] = useState(complementaresModelo)

    let lista = []

    const [formValue, setFormValue] = useState([{
        produtoNome: "",
        produtoQuantidade: "",
        produtoCategoria: lista,
        produtoDescricao: ""
    }]);

    const handleChange = (index, event) => {
        let data = [...formValue];

        data[index][event.target.name] = event.target.value;

        setFormValue(data)
    };

    const handleChangeCategoria = (index, event) => {
        let data = [...formValue]
        var categoria = []

        for (let i = 0; i < event.length; i++) {
            let cat = { id: event[i].value, nome: event[i].label }

            categoria.push(cat)
        }

        data[index].produtoCategoria = categoria

        setFormValue(data)
    }

    const { produtoNome, produtoQuantidade, produtoCategoria, produtoDescricao } = formValue;

    const handleSubmit = (event) => {
        let data = [...formValue]

        for (let i = 0; i < data.length; i++) {
            let produto = {
                nome: data[i].produtoNome,
                quantidade: data[i].produtoQuantidade,
                categoria: data[i].produtoCategoria[0].nome,
                descricao: data[i].produtoDescricao,
            }

            event.preventDefault();

            axios.post(`http://localhost:8080/produtos/criarProduto`, produto).then((res) => {
                alert('Produto(s) criado(s)!');
            })
        }

        let valores = {
            produtoNome: "",
            produtoQuantidade: "",
            produtoCategoria: "",
            produtoDescricao: ""
        }

        setFormValue([valores]);
    };

    const duplicarTab = (event) => {
        if (event.key === 'Tab') {
            let newfield = { produtoNome: "", produtoQuantidade: "", produtoCategoria: "", produtoDescricao: "" }
            setFormValue([...formValue, newfield])
        }
    }

    const duplicarClick = (event) => {
        let newfield = { produtoNome: "", produtoQuantidade: "", produtoCategoria: "", produtoDescricao: "" }
        setFormValue([...formValue, newfield])
    }

    const removerTab = (index) => {
        let data = [...formValue];

        data.splice(index, 1)

        setFormValue(data)
    }

    const topFunction = () => {
        document.documentElement.scrollTop = 0;
    }

    const bottomFunction = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
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
                                            type="text"
                                            placeholder="Insira o nome do produto"
                                            onChange={event => handleChange(index, event)}
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Quantidade do produto</Form.Label>
                                        <Form.Control
                                            required
                                            name="produtoQuantidade"
                                            value={fields.produtoQuantidade}
                                            type="number"
                                            placeholder="Insira a quantidade do produto"
                                            onChange={event => handleChange(index, event)}
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Categoria do produto</Form.Label>
                                        <CreatableSelect
                                            isMulti
                                            name="produtoCategoria"
                                            options={categorias}
                                            isLoading={false}
                                            isClearable={true}
                                            isSearchable={true}
                                            closeMenuOnSelect={true}
                                            onChange={event => handleChangeCategoria(index, event)}
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3 FormText">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Descrição do produto</Form.Label>
                                        <Form.Control
                                            required
                                            name="produtoDescricao"
                                            value={fields.produtoDescricao}
                                            type="text"
                                            as="textarea"
                                            placeholder="Insira a descrição do produto"
                                            onChange={event => handleChange(index, event)}
                                            onKeyDown={event => duplicarTab(event)}
                                        />
                                    </Form.Group>
                                </Row>

                                {index > 0 ?

                                    <Button onClick={removerTab}>
                                        Excluir campos
                                    </Button>

                                    :

                                    <>
                                    </>

                                }

                                <hr />

                            </div>

                        )

                    })}

                    <div className="campobotoes">

                        <Button type="submit" onClick={handleSubmit} className="submitpromo">
                            Criar produto!
                        </Button>

                        <Button type="submit" onClick={duplicarClick} className="criarpromo">
                            Criar mais campos!
                        </Button>

                        <Button onClick={topFunction} className="toppromo">
                            Voltar ao início!
                        </Button>

                        <Button onClick={bottomFunction} className="botpromo">
                            Voltar para o final da tela!
                        </Button>

                    </div>

                </Form>

            </div>

        </>
    )
}