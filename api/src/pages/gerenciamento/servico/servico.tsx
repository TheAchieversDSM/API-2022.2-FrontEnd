import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Select from 'react-select'

const modeloServico = [
    { value: '', label: '' }
];

type servicoModelo = { id: "", nome: "" }

export default function GerServicos(){
    const [servicos, setServicos] = useState(modeloServico)

    let listaServicos: servicoModelo[] = []

    const [formValue, setFormValue] = useState({
        servicoNome: "",
        servicoPreco: "",
        gerencServicos: listaServicos
    });

    const handleChangeServicos = (event: any) => {
        var servicosSelecionados: servicoModelo[] = []
        for (let index = 0; index < event.length; index++) {
            let servico = { id: event[index].value, nome: event[index].label }
            console.log(servico)
            servicosSelecionados.push(servico)
        }

        setFormValue((prevState) => {
            return {
                ...prevState,
                ofertaServicos: servicosSelecionados,
            };
        });
    };

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    useEffect(() => {
        async function render() {
            axios.get(`http://localhost:8080/servicos/pegarTodosServicos`).then((res) => {
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
    }, [])

    const { servicoNome, servicoPreco, gerencServicos } = formValue;

    const handleSubmit = (event: any) => {
        const promocao = {
            nome: servicoNome,
            preco: servicoPreco,
            pacotes: gerencServicos
        }

        event.preventDefault();

        axios.put(`http://localhost:8080/servicos/atualizarServico`, promocao).then((res) => {
            alert('Servico atualizada!');
        })

        let valores = {
            servicoNome: "",
            servicoPreco: "",
            gerencServicos: listaServicos
        }

        setFormValue(valores);
    };

    return(
        <>
        <div className="container">

                                    <h1>Serviços</h1>
                                    <Form /*noValidate validated={validated} onSubmit={handleSubmit}*/>

                                    <Row className="mb-3">

                                        <Form.Group as={Col} md="6">
                                            <Form.Label>Serviços a serem alterados</Form.Label>
                                                <Select 
                                                    isMulti
                                                    name="GerServicos"
                                                    options={servicos}
                                                    onChange={handleChangeServicos}
                                                    isClearable={true}
                                                    isSearchable={true}
                                                    closeMenuOnSelect ={false}
                                                />
                                        </Form.Group>

                                    </Row>

                                        <Row className="mb-3">
    
                                            <Form.Group as={Col} md="6">
                                                <Form.Label>Nome do Serviço</Form.Label>
                                                <Form.Control
                                                    required

                                                />
                                            </Form.Group>

                                        </Row>

                                        <Row className="mb-3">

                                            <Form.Group as={Col} md="6">
                                                <Form.Label>Incluir Serviço Obrigatório</Form.Label>
                                                <Select
                                                    isMulti
                                                    name="servicoProduto"
                                                    onChange={handleChangeServicos}
                                                    isClearable={true}
                                                    isSearchable={true}
                                                    closeMenuOnSelect ={false}
                                                    isLoading={false}
                                                    options={servicos}
                                                />
                                            </Form.Group>

                                        </Row>
                                        <Row className="mb-3">

                                            <Form.Group as={Col} md="6">
                                                <Form.Label>Incluir Serviço Complementar</Form.Label>
                                                <Select
                                                    isMulti
                                                    name="servicoComplementar"
                                                    onChange={handleChangeServicos}
                                                    isClearable={true}
                                                    isSearchable={true}
                                                    closeMenuOnSelect ={false}
                                                    isLoading={false}
                                                    options={servicos}
                                                />
                                            </Form.Group>

                                        </Row>
                                        <Row className="mb-3">

                                            <Form.Group as={Col} md="6">
                                                <Form.Label>Incluir Serviço Restringente</Form.Label>
                                                <Select
                                                    isMulti
                                                    name="servicoRestringente"
                                                    onChange={handleChange}
                                                    isClearable={true}
                                                    isSearchable={true}
                                                    closeMenuOnSelect ={false}
                                                    isLoading={false}
                                                    options={servicos}
                                                />
                                            </Form.Group>

                                        </Row>

                                        <Button type="submit" onClick={handleSubmit}>Salvar!</Button>

                                    </Form>
                                </div>
        </>
    )
}

