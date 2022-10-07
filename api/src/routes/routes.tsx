import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";

import Produto from "../pages/criacao-produto/produto";
import Visualizacao from "../pages/visualizacao-produto/visualizacao";
import Promocao from "../pages/criacao-promocao/promocao";
import Servico from "../pages/criacao-servico/servico";
import Login from "../pages/login/login";
import Home from "../pages/home/home";
import Pacote from "../pages/criacao-pacote/pacote";
import Carrinho from "../pages/carrinho/carrinho";
import Complementar from "../pages/servico-complementar/complementar"
import Oferta from "../pages/criacao-oferta/oferta";
import VisualizacaoServ from "../pages/visualizacao-servico/visu_serv";
import Gerenciamento from "../pages/gerenciamento/gerenciamento";

const Routes = () => {
    return (
        <BrowserRouter>
                <Switch>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>   
                    <Route path="/produto/:id" element={<Visualizacao/>}/>
                    <Route path="/servico/:id" element={<VisualizacaoServ/>}/>
                    <Route path="/criacao-promocao" element={<Promocao />} /> 
                    <Route path="/criacao-produto" element={<Produto />} />
                    <Route path="/criacao-servico" element={<Servico />} />
                    <Route path="/criacao-pacote" element={<Pacote />} />
                    <Route path="/carrinho" element={<Carrinho />} />
                    <Route path="/servico-complementar" element={<Complementar />} />
                    <Route path="/gerenciamento" element={<Gerenciamento />} />
                    <Route path="/criacao-oferta" element={<Oferta />} />
                </Switch>
        </BrowserRouter>
    )
}

export default Routes