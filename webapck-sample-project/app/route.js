import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Greeter from "./greeter";
import Page1 from './page1';
import Home from './home';

const App = () => {
    return (
    <div>

        <nav>
            <ul>
                <li><Link to="/"> Home </Link> </li>
                <li><Link to="/page1"> Page1 </Link></li>
                <li><Link to="/greeter"> Greeter </Link></li>
            </ul>
        </nav>

        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/page1" component={Page1} />
            <Route path="/greeter" component={Greeter} />
        </Switch>

    </div>
    );
}

export default App;
