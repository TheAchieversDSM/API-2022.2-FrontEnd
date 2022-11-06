import { useEffect, useState } from 'react';

import filter from '../../../functions/filter';

import CreatableSelect from 'react-select/creatable';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import axios from 'axios';

import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs'

import './pacote.css'

const periodo = [
    { value: 'Diário', label: 'Diário' },
    { value: 'Semanal', label: 'Semanal' },
    { value: 'Quinzenal', label: 'Quinzenal' },
    { value: 'Mensal', label: 'Mensal' },
    { value: 'Semestral', label: 'Semestral' },
    { value: 'Anual', label: 'Anual' }
]

const modeloOptions = [{ value: '', label: '' }];

export default function Pacote() {
    const [servicos, setServicos] = useState(modeloOptions)
    const [pacotes, setPacotes] = useState(modeloOptions)
    const [produto, setProduto] = useState([{ value: '', label: '' }])

    let lista = []

    const [formValue, setFormValue] = useState([{
        pacoteNome: "",
        pacoteDescricao: "",
        pacoteOferta: "",
        pacotePeriodo: lista,
        pacoteServicos: lista,
        pacoteProdutos: lista
    }]);

    const handleChange = (index, event) => {
        let data = [...formValue];

        data[index][event.target.name] = event.target.value;

        setFormValue(data)
    };

    const handleChangePeriodo = (index, event) => {
        let data = [...formValue]
        var periodo = []

        for (let i = 0; i < event.length; i++) {
            let per = { id: event[i].value, nome: event[i].label }
            periodo.push(per)
        }

        data[index].pacotePeriodo = periodo

        setFormValue(data)
    }

    const handleChangeServicos = (index, event) => {
        let data = [...formValue]
        var pacoteServicos = []

        for (let i = 0; i < event.length; i++) {
            let servico = { id: event[i].value, nome: event[i].label }

            pacoteServicos.push(servico)

            axios.get(`http://localhost:8080/servicos/todosProdutos/${servico.id}`).then((res) => {
                var produtosLista = []

                for (let iProd = 0; iProd < res.data.length; iProd++) {

                    let option = {
                        value: res.data[iProd].id,
                        label: res.data[iProd].nome
                    }

                    produtosLista.push(option)
                }

                setProduto(produtosLista)
            })
        }

        data[index].pacoteServicos = pacoteServicos

        setFormValue(data)
    }

    const handleChangeProdutos = (index, event) => {
        let data = [...formValue]
        var pacoteProdutosX = []

        for (let i = 0; i < event.length; i++) {
            let produto = { id: event[i].value, nome: event[i].label }
            pacoteProdutosX.push(produto)
        }

        data[index].pacoteProdutos = pacoteProdutosX

        setFormValue(data)
    }

    const { pacoteNome, pacoteDescricao, pacoteOferta, pacotePeriodo, pacoteServicos, pacoteProdutos } = formValue;

    const handleSubmit = (event) => {
        let data = [...formValue]

        for (let i = 0; i < data.length; i++) {

            var pacote = {
                id: undefined,
                nome: data[i].pacoteNome,
                descricao: data[i].pacoteDescricao,
                preco: data[i].pacoteOferta,
                periodo: data[i].pacotePeriodo[0].nome,
                servico: data[i].pacoteServicos[0],
                produtos: data[i].pacoteProdutos
            }

            console.log(pacote);

            event.preventDefault();

            axios.post(`http://localhost:8080/pacotes/criarPacote`, pacote).then((res) => {
                alert('Pacote(s) criado(s)!');

                console.log(res.data);

                pacote.id = res.data
            })

            console.log(pacote);

            axios.post(`http://localhost:8080/servicos/atualizarPacotes/${pacote.servico.id}`, pacote)
        }

        let valores = {
            pacoteNome: "",
            pacoteDescricao: "",
            pacoteOferta: "",
            pacotePeriodo: "",
            pacoteServicos: "",
            pacoteProdutos: ""
        }

        setFormValue([valores]);
    };

    const duplicarTab = (event) => {
        if (event.key === 'Tab') {
            let newfield = { pacoteNome: "", pacoteOferta: "", pacoteDescricao: "", pacoteServicos: "" }
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
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    const botFunction = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        async function render() {
            axios.get(`http://localhost:8080/pacotes/pegarTodosPacotes`).then((res) => {
                var pacotes = []

                for (let index = 0; index < res.data.length; index++) {
                    let option = {
                        value: res.data[index].id,
                        label: res.data[index].nome
                    }

                    pacotes.push(option)
                }

                setPacotes(pacotes)
            })

            axios.get(`http://localhost:8080/servicos/pegarTodosServicos`).then((res) => {
                var servicos = []

                for (let index = 0; index < res.data.length; index++) {
                    let option = {
                        value: res.data[index].id,
                        label: res.data[index].nome
                    }

                    servicos.push(option)
                }

                setServicos(servicos);
            })
        }

        render()
    }, [])

    return (
        <>
            <Form id='myInputPackage' className="d-flex">
                <Form.Group as={Col} md="6">
                    <Form.Label>Pesquisar</Form.Label>
                    <Form.Control id='pesquisar'
                        name="pacoteNome"
                        type="text"
                        placeholder="Insira o nome do pacote"
                        onKeyUp={filter()}
                    />
                </Form.Group>
            </Form>

            <div className='container-promo'>

                <h1>Cadastro de Pacotes</h1>

                <Form id='myDivPackage'>

                    {formValue.map((fields, index) => {

                        return (

                            <div key={index} id={`campoPackage-${index}`}>

                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Nome do pacote</Form.Label>
                                        <Form.Control
                                            id={`campoNomePackage-${index}`}
                                            required
                                            name="pacoteNome"
                                            value={fields.pacoteNome}
                                            type="text"
                                            placeholder="Insira o nome do pacote"
                                            onChange={event => handleChange(index, event)}
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3 FormText">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Descrição do pacote</Form.Label>
                                        <Form.Control
                                            required
                                            name="pacoteDescricao"
                                            value={fields.produtoDescricao}
                                            type="text"
                                            as="textarea"
                                            placeholder="Insira a descrição do pacote"
                                            onChange={event => handleChange(index, event)}
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3 FormText">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Oferta do pacote</Form.Label>
                                        <Form.Control
                                            required
                                            name="pacoteOferta"
                                            value={fields.produtoOferta}
                                            type="number"
                                            placeholder="Insira a oferta do pacote"
                                            onChange={event => handleChange(index, event)}
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Período da oferta do pacote</Form.Label>
                                        <CreatableSelect
                                            isMulti
                                            name="periodoPacote"
                                            options={periodo}
                                            isLoading={false}
                                            isClearable={true}
                                            isSearchable={true}
                                            closeMenuOnSelect={true}
                                            onChange={event => handleChangePeriodo(index, event)}
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Serviço que compõe o pacote</Form.Label>
                                        <Select
                                            isMulti
                                            name="pacoteServicos"
                                            options={servicos}
                                            isLoading={false}
                                            isClearable={true}
                                            isSearchable={true}
                                            closeMenuOnSelect={true}
                                            onChange={event => handleChangeServicos(index, event)}
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Produtos que compõem o pacote</Form.Label>
                                        <Select
                                            isMulti
                                            name="pacoteProdutos"
                                            options={produto}
                                            isLoading={false}
                                            isClearable={true}
                                            isSearchable={true}
                                            closeMenuOnSelect={false}
                                            onChange={event => handleChangeProdutos(index, event)}
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

                        <Button onClick={duplicarClick} className="submitpromo">
                            Criar mais campos!
                        </Button>

                        <Button onClick={topFunction} className="criarpromo">
                            <BsFillArrowUpCircleFill />
                        </Button>

                        <Button onClick={botFunction} className="toppromo">
                            <BsFillArrowDownCircleFill />
                        </Button>

                        <Button type='submit' onClick={handleSubmit} className="botpromo">
                            Criar pacote(s)!
                        </Button>

                    </div>

                </Form>

            </div>

        </>
    )
}