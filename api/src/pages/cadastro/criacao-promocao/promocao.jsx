import React, { useEffect, useState } from 'react';
import Navigation from '../../../components/navbar';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Sidebar from '../../../components/sidebar';
import Select from 'react-select';
import axios from 'axios';

import './promocao.css'

const modeloPromocao = [
    { value: '', label: '' }
];

const promocaoModelo={id:"", preco:"" , promocao:{'nome': ''}}

export default function Promocao() {
    const [promocoes,setPromocoes] = useState(promocaoModelo)

    let listaPromocao = []

    const [formValue, setFormValue] = useState([{
        promocaoNome: "",
        promocaoPreco: "",
        promocaoPacotes: listaPromocao
    }]);

    const duplicarTab = (event) => {
        if (event.key === 'Tab') {
            let newfield = { promocaoNome: "", promocaoPreco: "", promocaoPacotes: "" }
            setFormValue([...formValue, newfield])
        }
    }

    const handleChangePromocao= (event) => {
        var promocoesSelecionados =  []
        for (let index = 0; index < event.length; index++) {
            let promocaoIdPreco = event[index].value.split(',')
            let promocaoInfos = event[index].label.split('-')
            let promocao = {id: promocaoIdPreco[0], preco: promocaoIdPreco[1], promocao:{nome: promocaoInfos[1]}  }
            promocoesSelecionados.push(promocao)
        }

        setFormValue((prevState) => {
            return {
                ...prevState,
                promocaoPacotes: promocoesSelecionados,
            };
        });
    };
    
    const handleChange = (index, event) => {
        let data = [...formValue];
        data[index][event.target.name] = event.target.value;
        setFormValue(data)

        console.log(formValue);
    };

    useEffect(()=>{
        async function render() { 
        axios.get(`http://localhost:8080/ofertas/pegarTodasOfertas`).then((res)=>{
                var promocoes = []
                for (let index = 0; index < res.data.length; index++) {
                    let option = {
                        value: res.data[index].id + ',' + res.data[index].preco ,
                        label: `R$ ${res.data[index].preco}-${res.data[index].promocao.nome}`
                    }
                    promocoes.push(option)
                }
                setPromocoes(promocoes)
            })
        }
        render()
    },[])

    const { promocaoNome, promocaoPreco, promocaoPacotes } = formValue;

    const handleSubmit = (event) => {
        const promocao = {
            nome: promocaoNome,
            preco: promocaoPreco,
            ofertas: promocaoPacotes
        }

        event.preventDefault();

        axios.post(`http://localhost:8080/promocoes/criarPromocao`, promocao).then((res) => {
            alert('Promoção Criada!');
        })

        let valores = {
            promocaoNome: "",
            promocaoPreco: "",
            promocaoPacotes: listaPromocao
        }

        setFormValue(valores);
    };
    

    return (
        <>
            <div className='container-promo'>

                <h1>Cadastro de Promoções</h1>

                <Form /*noValidate validated={validated} onSubmit={handleSubmit}*/>
                {formValue.map((fields, index) => {
                        return (
                    <div key={index}>
                        <Row className="mb-3">
                        
                            <Form.Group as={Col} md="6">
                                <Form.Label>Nome da Promoção</Form.Label>
                                <Form.Control
                                    required
                                    name="promocaoNome"
                                    value={fields.promocaoNome}
                                    onChange={event => handleChange(index, event)}
                                    type="text"
                                    placeholder="Insira o nome da Promoção"
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label>Valor do Desconto</Form.Label>
                                <Form.Control
                                    required
                                    name="promocaoPreco"
                                    value={fields.promocaoPreco}
                                    onChange={event => handleChange(index, event)}
                                    type="number"
                                    placeholder="Insira o valor de desconto da Promoção"
                                    defaultValue=""
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label>Pacotes que compõem a Promoção</Form.Label>
                                <Select
                                    isMulti
                                    name="promocaoPacotes"
                                    options={promocoes}
                                    onKeyDown={event => duplicarTab(event)}
                                    onChange={event => handleChangePromocao(index, event)}
                                    isClearable={true}
                                    isSearchable={true}
                                    closeMenuOnSelect ={false}
                                    value={fields.promocaoPacotes}
                                />
                            </Form.Group>
                        
                        </Row>
                        
                    </div>
                    )
                })}
                    <Button type="submit" onClick={handleSubmit}>Criar Promoção!</Button>
                
                </Form>

            </div>
            
        </>
    )
}