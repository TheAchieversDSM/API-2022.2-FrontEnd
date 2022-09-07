import { Fragment } from "react";
import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";

import Promocao from "../pages/promocao";
import Produto from "../pages/produto";

const Routes = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Switch>
                    <Route path="/criacao-promocao" element={<Promocao />} />
                    <Route path="/criacao-produto" element={<Produto />} />
                </Switch>
            </Fragment>
        </BrowserRouter>
    )
}

export default Routes