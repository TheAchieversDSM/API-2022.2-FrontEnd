import React, { useEffect, useState } from "react";
import Navigation from "../../../components/navbar";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Sidebar from "../../../components/sidebar";
import Select from "react-select";
import axios from "axios";

import "./promocao.css";

const modeloPromocao = [{ value: "", label: "", preco: "" }];

const promocaoModelo = { id: "", preco: "", nome: "" };

export default function Promocao() {
  const [promocoes, setPromocoes] = useState(promocaoModelo);
  const [pacotes, setPacotes] = useState([promocaoModelo]);

  let listaPromocao = [];

  const [formValue, setFormValue] = useState([
    {
      promocaoNome: "",
      promocaoPreco: "",
      promocaoPacote: listaPromocao,
    },
  ]);

  const duplicarTab = (event) => {
    if (event.key === "Tab") {
      let newfield = {
        promocaoNome: "",
        promocaoPreco: "",
        promocaoPacote: "",
      };
      setFormValue([...formValue, newfield]);
    }
  };

  const topFunction = () => {
    document.documentElement.scrollTop = 0;
}

  const handleChangePacotes = (index, event) => {
    let data = [...formValue];
    var promocaoPac = [];
    event.map((info) =>{
      let pacote = {
        id: info.value,
        nome: info.label,
        preco: info.preco,
      };
      console.log(pacote);
      promocaoPac.push(pacote);
    })

    /*for (let i = 0; i < event.length; i++) {
      let pacote = {
        id: event[index].value,
        preco: event[index].preco,
        nome: event[index].label,
      };
      console.log(pacote);
      promocaoPac.push(pacote);
    }*/

    data[index].promocaoPacote = promocaoPac;

    setFormValue(data);
  };

  const handleChange = (index, event) => {
    let data = [...formValue];
    data[index][event.target.name] = event.target.value;
    setFormValue(data);

    console.log(formValue);
  };

  useEffect(() => {
    async function render() {
      axios
        .get(`http://localhost:8080/pacotes/pegarTodosPacotes`)
        .then((res) => {
          var pac = [];
          for (let index = 0; index < res.data.length; index++) {
            let option = {
              value: res.data[index].id,
              label: res.data[index].nome,
              preco: res.data[index].preco,
            };
            pac.push(option);
          }
          setPacotes(pac);
        });
    }
    render();
  }, []);

  const { promocaoNome, promocaoPreco, promocaoPacote } = formValue;

  const handleSubmit = (event) => {
    let data = [...formValue];

    for (let i = 0; i < data.length; i++) {
      const promocao = {
        nome: data[i].promocaoNome,
        preco: data[i].promocaoPreco,
        pacotes: data[i].promocaoPacote,
      };

      event.preventDefault();

      axios
        .post(`http://localhost:8080/promocoes/criarPromocao`, promocao)
        .then((res) => {
          alert("Promoção criada!");
        });
    }

    let valores = {
      promocaoNome: "",
      promocaoPreco: "",
      promocaoPacote: "",
    };

    setFormValue([valores]);
  };

  return (
    <>
      <div className="container-promo">
        <h1>Cadastro de Promoções</h1>

        <Form>
          {formValue.map((fields, index) => {
            return (
              <div key={index} className="row">

                <Row className="mb-3">
                  <Form.Group as={Col} md="6">
                    <Form.Label>Nome da promoção</Form.Label>
                    <Form.Control
                      required
                      name="promocaoNome"
                      value={fields.promocaoNome}
                      onChange={(event) => handleChange(index, event)}
                      type="text"
                      placeholder="Insira o nome da promoção"
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="6">
                    <Form.Label>Valor do desconto</Form.Label>
                    <Form.Control
                      required
                      name="promocaoPreco"
                      value={fields.promocaoPreco}
                      onChange={(event) => handleChange(index, event)}
                      type="number"
                      placeholder="Insira o valor de desconto da promoção"
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="6">
                    <Form.Label>Pacotes que compõem a promoção</Form.Label>
                    <Select
                      isMulti
                      name="promocaoPacote"
                      options={pacotes}
                      onKeyDown={(event) => duplicarTab(event)}
                      onChange={(event) => handleChangePacotes(index, event)}
                      isClearable={true}
                      isSearchable={true}
                      closeMenuOnSelect={false}
                    />
                  </Form.Group>
                </Row>

              </div>
            );
          })}

          <div className="campobotoes">
              <Button type="submit" onClick={handleSubmit} className="submitpromo">
                Criar Promoção!
              </Button>
              <Button onClick={topFunction} className="toppromo">
                Scroll top
              </Button>
          </div>

        </Form>
      </div>
    </>
  );
}
