import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Greeter from "./page/greeter";
import Page1 from './page/page1';
import Home from './page/home';
import NotFound from './page/notfound';
import Protected from './page/auth';
import Direct from './page/direct'

const App = () => {
    return (
    <div>

        <nav>
            <ul>
                <li><Link to="/"> Home </Link> </li>
                <li><Link to="/page1"> Page1 </Link></li>
                <li><Link to="/page2"> Page2 </Link> </li>
                <li><Link to="/greeter"> Greeter </Link></li>
                {/* redirect 重定向 */}
                <li><Link to="direct"> Redirect</Link></li>
                {/* 身份验证路由 */}
                <li><Link to="/login">Protected</Link></li>
            </ul>
        </nav>

        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/page1" component={Page1} />
            <Route path="/greeter" component={Greeter} />
            <Route path="/page2" render={() => <h2>Page2</h2>} />
            <Route path="/direct" component={Direct} />
            <Route path="/login" component={Protected} />
            <Route component={NotFound}/>
        </Switch>

    </div>
    );
}

export default App;
