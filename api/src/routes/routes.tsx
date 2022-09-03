import { Fragment } from "react";
import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";

import Promocao from "../pages/promoção/promocao";
import Visualizacao from "../pages/visualização/visualizacao";

const Routes = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Switch>
                    <Route path="/" element={<Promocao/>}/>
                    <Route path="/prodserv" element={<Visualizacao/>}/>
                </Switch>
            </Fragment>
        </BrowserRouter>
    )
}

export default Routes