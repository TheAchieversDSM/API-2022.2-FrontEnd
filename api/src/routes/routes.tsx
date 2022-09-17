import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";

import Produto from "../pages/criacao-produto/produto";
import Visualizacao from "../pages/visualizacao/visualizacao";
import Promocao from "../pages/criacao-promocao/promocao";
import Servico from "../pages/criacao-servico/servico";
import Login from "../pages/login/login";
import Home from "../pages/home/home";
import Pacote from "../pages/criacao-pacote/pacote";
import Complementar from "../pages/produto-complementar/complementar"

const Routes = () => {
    return (
        <BrowserRouter>
                <Switch>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>   
                    <Route path="/produto/:id" element={<Visualizacao/>}/>
                    <Route path="/criacao-promocao" element={<Promocao />} /> 
                    <Route path="/criacao-produto" element={<Produto />} />
                    <Route path="/criacao-servico" element={<Servico />} />
                    <Route path="/criacao-pacote" element={<Pacote />} />
                    <Route path="/produto-complementar" element={<Complementar />} />
                </Switch>
        </BrowserRouter>
    )
}

export default Routes