import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./pages/HomePage";
import { Switch, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import './index.css';


ReactDOM.render(
    <BrowserRouter >
        <Switch>
            <Route path="/" component={HomePage} />
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);
