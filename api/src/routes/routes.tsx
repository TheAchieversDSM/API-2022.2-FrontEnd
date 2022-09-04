import { Fragment } from "react";
import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";

import Home from "../pages/home";

const Routes = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Switch>
                    <Route path="/" element={<Home/>}/>
                </Switch>
            </Fragment>
        </BrowserRouter>
    )
}

export default Routes