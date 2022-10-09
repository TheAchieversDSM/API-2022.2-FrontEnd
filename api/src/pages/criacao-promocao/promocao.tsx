import React, { useEffect, useState } from 'react';
import Navigation from '../../components/navbar';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Sidebar from '../../components/sidebar';
import Select from 'react-select';
import axios from 'axios';

import './promocao.css'

const modeloPacote = [
    { value: '', label: '' }
];

type pacoteModelo={id:"", preco:"" , pacote:{'nome': ''}}

export default function Promocao() {
    const [pacotes,setPacotes] = useState(modeloPacote)

    let listaPacotes: pacoteModelo[] = []

    const [formValue, setFormValue] = useState({
        promocaoNome: "",
        promocaoPreco: "",
        promocaoPacotes: listaPacotes
    });


    const handleChangePacotes= (event: any) => {
        var pacotesSelecionados:  pacoteModelo[] =  []
        for (let index = 0; index < event.length; index++) {
            let pacoteIdPreco = event[index].value.split(',')
            let pacoteInfos = event[index].label.split('-')
            let pacote = {id: pacoteIdPreco[0], preco: pacoteIdPreco[1], pacote:{nome: pacoteInfos[1]}  }
            pacotesSelecionados.push(pacote)
        }

        setFormValue((prevState) => {
            return {
                ...prevState,
                promocaoPacotes: pacotesSelecionados,
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
        axios.get(`http://localhost:8080/ofertas/pegarTodasOfertas`).then((res)=>{
                var pacotes = []
                for (let index = 0; index < res.data.length; index++) {
                    let option = {
                        value: res.data[index].id + ',' + res.data[index].preco ,
                        label: `R$ ${res.data[index].preco}-${res.data[index].pacote.nome}`
                    }
                    pacotes.push(option)
                }
                setPacotes(pacotes)
            })
        }
        render()
    },[])

    const { promocaoNome, promocaoPreco, promocaoPacotes } = formValue;

    const handleSubmit = (event: any) => {
        const promocao = {
            nome: promocaoNome,
            preco: promocaoPreco,
            ofertas: promocaoPacotes
        }

        event.preventDefault();

        axios.post(`http://localhost:8080/promocoes/criarPromocao`, promocao).then((res) => {
            alert('Promoção criado!');
        })

        let valores = {
            promocaoNome: "",
            promocaoPreco: "",
            promocaoPacotes: listaPacotes
        }

        setFormValue(valores);
    };
    

    return (
        <>
            <Navigation />
            <Sidebar />

            <div className='container-promo'>

                <h1>Cadastro de Promoção</h1>

                <Form /*noValidate validated={validated} onSubmit={handleSubmit}*/>

                    <Row className="mb-3">
                        
                        <Form.Group as={Col} md="6">
                            <Form.Label>Nome da promoção</Form.Label>
                            <Form.Control
                                required
                                name="promocaoNome"
                                value={promocaoNome}
                                onChange={handleChange}
                                type="text"
                                placeholder="Insira nome da promoção"
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Valor do desconto</Form.Label>
                            <Form.Control
                                required
                                name="promocaoPreco"
                                value={promocaoPreco}
                                onChange={handleChange}
                                type="number"
                                placeholder="Insira o valor de desconto da Promoção"
                                defaultValue=""
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Ofertas que compõem a promoção</Form.Label>
                            <Select 
                                isMulti
                                name="promocaoPacotes"
                                options={pacotes}
                                onChange={handleChangePacotes}
                                isClearable={true}
                                isSearchable={true}
                                closeMenuOnSelect ={false}
                            />
                        </Form.Group>
                        
                    </Row>

                    <Button type="submit" onClick={handleSubmit}>Criar promoção!</Button>
                
                </Form>

            </div>
            
        </>
    )
}