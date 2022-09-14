import { Fragment } from "react";
import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";

import Produto from "../pages/criacao-produto/produto";
import Visualizacao from "../pages/visualizacao/visualizacao";
import Promocao from "../pages/criacao-promocao/promocao";
import Login from "../pages/login/login";
import Home from "../pages/home/home";

const Routes = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Switch>
                    <Route path="/criacao-produto" element={<Produto />} />
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>   
                    <Route path="/produto/:id" element={<Visualizacao/>}/>
                    <Route path="/criacao-promocao" element={<Promocao />} /> 
                    <Route path="/criacao-produto" element={<Produto />} />
                </Switch>
            </Fragment>
        </BrowserRouter>
    )
}

export default Routes