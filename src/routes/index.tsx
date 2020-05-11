import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import { history } from './history';
import { RoomsDashboard } from 'components/RoomsDashboard';

const Routes = () => (
    <Router history={history}>
        <Switch>
            <Route path='/' exact>
                <Redirect to='/dashboard'/>
            </Route>
            <Route path='/dashboard' component={RoomsDashboard} exact/>
        </Switch>
    </Router>
);

export { Routes };
