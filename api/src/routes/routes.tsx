import { Fragment } from "react";
import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";

<<<<<<< HEAD
import Promocao from "../pages/promocao";
import Produto from "../pages/produto";
=======
import Visualizacao from "../pages/visualização/visualizacao";
import Promocao from "../pages/criacao-promocao/promocao";
import Login from "../pages/login/login";
import Home from "../pages/home/home";
>>>>>>> develop

const Routes = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Switch>
<<<<<<< HEAD
                    <Route path="/criacao-promocao" element={<Promocao />} />
                    <Route path="/criacao-produto" element={<Produto />} />
=======

                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>   
                    <Route path="/produto" element={<Visualizacao/>}/>
                    <Route path="/criacao-promocao" element={<Promocao />} /> 

>>>>>>> develop
                </Switch>
            </Fragment>
        </BrowserRouter>
    )
}

export default Routes