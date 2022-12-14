import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Select from 'react-select'

const modeloServico = [
    { value: '', label: '' }
];

type servicoModelo = { id: "", nome: "" , categoria: any, descricao: any}

export default function GerServicos() {
    const [servicos, setServicos] = useState(modeloServico)
    let listaServicos: servicoModelo[] = []

    const [formValue, setFormValue] = useState({
        servicoNome: "",
        servicoDescricao: "",
        servicoCategoria: "",
        servicoObrigatorios: listaServicos,
        servicoProdutos: listaServicos,
        servicoComplementares: listaServicos,
    });

    const handleChangeServicos = (event: any) => {
        var servicosSelecionados: servicoModelo[] = []
        for (let index = 0; index < event.length; index++) {
            let servicoInfos = event[index].value.split(',')

            let servico = { id: servicoInfos[0], nome: event[index].label, categoria: servicoInfos[1], descricao: servicoInfos[2] }
            servicosSelecionados.push(servico)
        }

        setFormValue((prevState) => {
            return {
                ...prevState,
                servicoProdutos: servicosSelecionados,
            };
        });
    };

    const handleChangeObrigatorios = (event: any) => {
        var servicosSelecionados: servicoModelo[] = []
        for (let index = 0; index < event.length; index++) {
            let servicoInfos = event[index].value.split(',')
            let servico = { id: servicoInfos[0], nome: event[index].label, categoria: '', descricao: '' }
            servicosSelecionados.push(servico)
        }

        setFormValue((prevState) => {
            return {
                ...prevState,
                servicoObrigatorios: servicosSelecionados,
            };
        });
    };

    const handleChangeComplementares = (event: any) => {
        var servicosSelecionados: servicoModelo[] = []
        for (let index = 0; index < event.length; index++) {
            let servicoInfos = event[index].value.split(',')
            let servico = { id: servicoInfos[0], nome: event[index].label, categoria: '', descricao: '' }
            servicosSelecionados.push(servico)
        }

        setFormValue((prevState) => {
            return {
                ...prevState,
                servicoComplementares: servicosSelecionados,
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
                        value: res.data[index].id + ',' + res.data[index].categoria + ',' + res.data[index].descricao  ,
                        label: res.data[index].nome
                    }
                    servicos.push(option)
                }
                setServicos(servicos)
            })
        }
        render()
    }, [])

    const { servicoNome, servicoDescricao, servicoCategoria, servicoObrigatorios, servicoProdutos, servicoComplementares } = formValue;

    const handleSubmit = (event: any) => {
        for (let index = 0; index < servicoProdutos.length; index++) {  
            const data = {
                id: servicoProdutos[index].id,
                nome: servicoProdutos[index].nome,
                categoria: servicoProdutos[index].categoria,
                descricao: servicoProdutos[index].descricao,
                servicosObrigatorios: servicoObrigatorios,
                produtos: servicoProdutos,
                complementares: servicoComplementares
            }

            event.preventDefault();

            axios.put(`http://localhost:8080/servicos/atualizarServico`, data).then((res) => {
                alert('Servico Atualizado!');
            })

            
        }

        let valores = {
            servicoNome: "",
            servicoDescricao: "",
            servicoCategoria: "",
            servicoObrigatorios: listaServicos,
            servicoProdutos: listaServicos,
            servicoComplementares: listaServicos
        }

        setFormValue(valores);
    };

    return (
        <>
            <div className="container">

                <h1>Servi??os</h1>
                <Form /*noValidate validated={validated} onSubmit={handleSubmit}*/>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Servi??os a Serem Alterados</Form.Label>
                            <Select
                                isMulti
                                name="GerServicos"
                                options={servicos}
                                onChange={handleChangeServicos}
                                isClearable={true}
                                isSearchable={true}
                                closeMenuOnSelect={false}
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Incluir Servi??os Obrigat??rios</Form.Label>
                            <Select
                                isMulti
                                name="servicoProduto"
                                onChange={handleChangeObrigatorios}
                                isClearable={true}
                                isSearchable={true}
                                closeMenuOnSelect={false}
                                isLoading={false}
                                options={servicos}
                            />
                        </Form.Group>

                    </Row>
                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Incluir Servi??os Complementares</Form.Label>
                            <Select
                                isMulti
                                name="servicoComplementar"
                                onChange={handleChangeComplementares}
                                isClearable={true}
                                isSearchable={true}
                                closeMenuOnSelect={false}
                                isLoading={false}
                                options={servicos}
                            />
                        </Form.Group>

                    </Row>

                    {/*<Row className="mb-3">
                        <Form.Group as={Col} md="6">
                            <Form.Label>Incluir Servi??o Restringente</Form.Label>
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
                    </Row>*/}

                    <Button type="submit" onClick={handleSubmit}>Salvar!</Button>

                </Form>
            </div>
        </>
    )
}

