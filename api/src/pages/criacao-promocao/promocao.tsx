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

export default function Promocao() {
    const [pacotes,setPacotes] = useState(modeloPacote)

    const [formValue, setFormValue] = useState({
        promocaoNome: "",
        promocaoPreco: "",
        promocaoPacotes: ""
    });


    const handleChangePacote= (event: any) => {
        const { name, value } = {name: 'promocaoPacotes', value: event[0].value};
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
        console.log(formValue)
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
        axios.get(`http://localhost:8080/pacotes/pegarTodosPacotes`).then((res)=>{
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
        }
        render()
    },[])

    const { promocaoNome, promocaoPreco, promocaoPacotes } = formValue;

    const handleSubmit = (event: any) => {
        const promocao = {
            nome: promocaoNome,
            preco: promocaoPreco,
        }

        event.preventDefault();

        axios.post(`http://localhost:8080/promocoes/criarPromocao`, promocao).then((res) => {
            alert('Promoção criado!');
        })

        let valores = {
            promocaoNome: "",
            promocaoPreco: "",
            promocaoPacotes: ""
        }

        setFormValue(valores);
    };
    

    return (
        <>
            <Navigation />
            <Sidebar />

            <div className='container-promo'>

                <h1>Criação de Promoção</h1>

                <Form /*noValidate validated={validated} onSubmit={handleSubmit}*/>

                    <Row className="mb-3">
                        
                        <Form.Group as={Col} md="6">
                            <Form.Label>Nome da Promoção</Form.Label>
                            <Form.Control
                                required
                                name="promocaoNome"
                                value={promocaoNome}
                                onChange={handleChange}
                                type="text"
                                placeholder="Nome da Promoção"
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Preço da Promoção</Form.Label>
                            <Form.Control
                                required
                                name="promocaoPreco"
                                value={promocaoPreco}
                                onChange={handleChange}
                                type="number"
                                placeholder="Preço da Promoção"
                                defaultValue=""
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="6">
                            <Form.Label>Pacotes que compõem a promoção</Form.Label>
                            <Select 
                                isMulti
                                name="promocaoPacotes"
                                options={pacotes}
                                onChange={handleChangePacote}
                                isClearable={true}
                                isSearchable={true}
                                closeMenuOnSelect ={false}
                            />
                        </Form.Group>
                        
                    </Row>

                    <Button type="submit" onClick={handleSubmit}>Criar Promoção!</Button>
                
                </Form>
            
            </div>

        </>
    )
}