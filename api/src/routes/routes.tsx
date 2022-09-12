import { Fragment } from "react";
import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";

import Promocao from "../pages/criacao-promocao/promocao";
import Login from "../pages/login/login";
import Home from "../pages/home/home";

const Routes = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Switch>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>       
                    <Route path="/criacao-promocao" element={<Promocao />} />               
                </Switch>
            </Fragment>
        </BrowserRouter>
    )
}

export default Routes