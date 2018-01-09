import React from 'react';
import ReactDOM from "react-dom";
import App from "./route";
// import Greeter from "./greeter";
// import Home from './home';
// import Page1 from './page1';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import "./main.css";

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);
