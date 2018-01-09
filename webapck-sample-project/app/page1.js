import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Page1List from './page1/page1List';
import Player from './page1/player';

const Page1 = () => (
    <div>
        <h1> this is a Page1 component! </h1>
        <Switch>
            <Route exact path="/page1" component={Page1List} />
            <Route path="/page1/:number" component={Player} />
        </Switch>
    </div>
)
export default Page1;