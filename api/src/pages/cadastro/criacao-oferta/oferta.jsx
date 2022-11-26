import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { InputActionMeta } from "react-select";
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import filter from '../../../functions/filter';

import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs'

import './oferta.css'

const periodo = [
    { value: 'Diário', label: 'Diário' },
    { value: 'Semanal', label: 'Semanal' },
    { value: 'Quinzenal', label: 'Quinzenal' },
    { value: 'Mensal', label: 'Mensal' },
    { value: 'Semestral', label: 'Semestral' },
    { value: 'Anual', label: 'Anual' }
]

const modeloOptions = [{ value: '', label: '' }];

export default function Oferta() {
    const [ofertas, setOfertas] = useState(modeloOptions)
    const [pacotes, setPacotes] = useState(modeloOptions)
    const [produto, setProduto] = useState([{ value: '', label: '' }])

    let listaOfertas = []

    const [formValue, setFormValue] = useState([{
        ofertaPreco: {valor: '', periodo: ''},
        ofertaPacotes: listaOfertas
    }]);

    const handleChange = (index, event) => {
        let data = [...formValue];
        data[index].ofertaPreco.valor = event.target.value;
        setFormValue(data);
    };


    const handleChangeOfertas = (index, event) => {
        let data = [...formValue]
        var pacoteProdutosX = []

        for (let i = 0; i < event.length; i++) {
            let produto = { id: event[i].value, nome: event[i].label }
            pacoteProdutosX.push(produto)
        }

        data[index].ofertaPacotes = pacoteProdutosX
        setFormValue(data)
    };

    const handleChangePeriodo = (index, event) => {
        let data = [...formValue]
        console.log(event.value)
        console.log(data[index])
        data[index].ofertaPreco.periodo = event.value

        setFormValue(data)
        console.log(formValue)
    }

    const { ofertaPreco, ofertaPacotes, ofertaPeriodo } = formValue;

    const handleSubmit = (event) => {
        let data = [...formValue]

        for (let i = 0; i < data.length; i++) {
            for (let index = 0; index < data[i].ofertaPacotes.length; index++) {
                var ofertas = {
                    pacote: data[i].ofertaPacotes[index],
                    preco: data[i].ofertaPreco,
                    periodo: data[i].ofertaPeriodo
                }
                axios.post(`http://localhost:8080/ofertas/criarOferta`, ofertas).then((res) => {
                })
            }
          

     
        }

        alert('Oferta criada!');

        let valores = {
            ofertaPreco: "",
            ofertaPacotes: "",
            ofertaPeriodo: ""
        }

        setFormValue([valores]);

        window.location.reload()

    };

    const duplicarTab = (event) => {
        if (event.key === 'Tab') {
            let newfield = { ofertaPreco: "", ofertaPacotes: "", ofertaPeriodo: "", }
            setFormValue([...formValue, newfield])
        }
    }

    const duplicarClick = (event) => {
        let newfield = { ofertaPreco: "", ofertaPacotes: "", ofertaPeriodo: "" }
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
                console.log(res.data)
                for (let index = 0; index < res.data.length; index++) {
                    let option = {
                        value: res.data[index].id,
                        preco: res.data[index].preco,
                        label: res.data[index].nome
                    }

                    pacotes.push(option)
                }

                setPacotes(pacotes)
            })
        }
        render()
    }, [])


    return (
        <>
           
            <div className='container-promo'>

                <h1>Cadastro de Ofertas</h1>

                <Form id='myDivPackage'>

                    {formValue.map((fields, index) => {

                        return (

                            <div key={index} id={`campoPackage-${index}`}>
                                
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Preço da Oferta</Form.Label>
                                        <Form.Control
                                            id={`campoNomePackage-${index}`}
                                            required
                                            name="ofertaPreco"
                                            value={fields.ofertaPreco.valor}
                                            type="text"
                                            placeholder="Preço da Oferta"
                                            onChange={event => handleChange(index, event)}
                                        />
                                    </Form.Group>
                                </Row>



                                <Row className="mb-3">

                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Selecione o Pacote</Form.Label>
                                        <Select
                                            isMulti
                                            name="ofertaPacotes"
                                            options={pacotes}
                                            isClearable={true}
                                            isLoading={false}
                                            isSearchable={true}
                                            closeMenuOnSelect={false}
                                            onChange={event => handleChangeOfertas(index, event)}
                                        />
                                    </Form.Group>

                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Selecione o Período</Form.Label>
                                        <CreatableSelect
                                            name="ofertaPeriodo"
                                            options={periodo}
                                            isLoading={false}
                                            isClearable={true}
                                            isSearchable={true}
                                            onKeyDown={event => duplicarTab(event)}
                                            closeMenuOnSelect={true}
                                            onChange={event => handleChangePeriodo(index, event)}
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
                            Criar oferta(s)!
                        </Button>

                    </div>

                </Form>
            </div >
        </>
    )
}
