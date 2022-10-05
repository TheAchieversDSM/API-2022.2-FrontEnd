import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Select from 'react-select'
import Check from "../../../components/checkbox";


const modeloServico = [
    { value: '', label: '' }
];

type pacoteServico={id:"",nome:""}

export default function GerServicos(){
    const [servicos,setServicos] = useState(modeloServico)

    let listaServicos: pacoteServico[] = []

    const [formValue, setFormValue] = useState({
        servicoNome: "",
        servicoPreco: "",
        complementarServico: listaServicos,
        obrigatorioServico: listaServicos,
        restringenteServico: listaServicos
    });


    const handleChangeServicos= (event: any) => {
        var servicosSelecionados:  pacoteServico[] =  []
        for (let index = 0; index < event.length; index++) {
            let servico = {id:event[index].value, nome:event[index].label}
            console.log(servico)
            servicosSelecionados.push(servico)
        }

        setFormValue((prevState) => {
            return {
                ...prevState,
                servico: servicosSelecionados,
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

    useEffect(()=>{
        async function render() { 
        axios.get(`http://localhost:8080/pacotes/pegarTodosServicos`).then((res)=>{
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

    return(
        <>
        <div className="container">
                            <div className="row">
                                <div className="col-4">
                                    <h2>Serviços</h2>
                                    <Check titulo="Todos"/>
                                    <Check titulo="Serviço A"/>
                                    <Check titulo="Serviço B"/>
                                    <Check titulo="Serviço C"/>
                                    <Check titulo="Serviço D"/>
                                </div>
                                <div className="col-8">
                                    <h1>Serviços</h1>
                                    <Form /*noValidate validated={validated} onSubmit={handleSubmit}*/>

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

                                        <Button type="submit">Salvar!</Button>

                                    </Form>
                                </div>
                            </div>
                        </div>
        </>
    )
}

