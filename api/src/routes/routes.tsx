import { Fragment } from "react";
import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";

import Promocao from "../pages/promocao";

const Routes = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Switch>
                    <Route path="/criacao-promocao" element={<Promocao />} />
                </Switch>
            </Fragment>
        </BrowserRouter>
    )
}

export default Routes