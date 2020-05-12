import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import { history } from './history';
import { RoomsDashboard } from 'components/RoomsDashboard';
import { Room } from 'components/Room';

const Routes = () => (
    <Router history={history}>
        <Switch>
            <Route path='/' exact>
                <Redirect to='/dashboard'/>
            </Route>
            <Route path='/dashboard' component={RoomsDashboard} exact />
            <Route path='/room/:id' component={Room} exact />
        </Switch>
    </Router>
);

export { Routes };
