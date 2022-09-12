import { Fragment } from "react";
import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";

import Login from "../pages/login";
import Home from "../pages/home";

const Routes = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Switch>
                
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>                   

                </Switch>
            </Fragment>
        </BrowserRouter>
    )
}

export default Routes