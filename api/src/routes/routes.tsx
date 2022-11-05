import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";
import Login from "../pages/login/login";
import Home from "../pages/home/home";
import Carrinho from "../pages/carrinho/carrinho";
import Complementar from "../pages/servico-complementar/complementar";
import VisualizacaoServ from "../pages/visualizacao-servico/visu_serv";
import Gerenciamento from "../pages/gerenciamento/gerenciamento";
import Teste from "../pages/cadastro/criacao-produto/exemplo";
import Cadastro from "../pages/cadastro/cadastro";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/servico/:id" element={<VisualizacaoServ />} />
                {/*<Route path="/criacao-promocao" element={<Promocao />} />
                <Route path="/criacao-produto" element={<Produto />} />
                <Route path="/criacao-servico" element={<Servico />} />
                <Route path="/criacao-oferta" element={<Oferta />} />
                <Route path="/criacao-pacote" element={<Pacote />} />*/}
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/carrinho/servico/:id" element={<Carrinho />} />
                <Route path="/servico-complementar" element={<Complementar />} />
                <Route path="/listagens" element={<Gerenciamento />} />
                <Route path="/teste" element={<Teste />} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes