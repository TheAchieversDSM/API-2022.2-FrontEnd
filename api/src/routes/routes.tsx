import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";
import Login from "../pages/login/login";
import Home from "../pages/home/home";
import Carrinho from "../pages/carrinho/carrinho";
import Complementar from "../pages/servico-complementar/complementar";
import VisualizacaoServ from "../pages/visualizacao-servico/visu_serv";
import Gerenciamento from "../pages/gerenciamento/gerenciamento";
import Pacote from "../pages/cadastro/criacao-pacote/pacote";
import Oferta from "../pages/cadastro/criacao-oferta/oferta";
import Servico from "../pages/cadastro/criacao-servico/servico";
import Produto from "../pages/cadastro/criacao-produto/produto";
import Promocao from "../pages/cadastro/criacao-promocao/promocao";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/servico/:id" element={<VisualizacaoServ />} />
                <Route path="/criacao-promocao" element={<Promocao />} />
                <Route path="/criacao-produto" element={<Produto />} />
                <Route path="/criacao-servico" element={<Servico />} />
                <Route path="/criacao-oferta" element={<Oferta />} />
                <Route path="/criacao-pacote" element={<Pacote />} />
                <Route path="/carrinho/servico/:id" element={<Carrinho />} />
                <Route path="/servico-complementar" element={<Complementar />} />
                <Route path="/listagens" element={<Gerenciamento />} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes