import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Overview from '../views/Overview';
import Campaigns from '../views/Campaigns';
import NavBar from '../components/NavBar';

export const ROUTE_PATHS = {
  HOMEPAGE_ROUTE: '/',
  CAMPAIGNS_ROUTE: '/campaigns',
};

export const ROUTE_LIST = [
  {
    path: ROUTE_PATHS.HOMEPAGE_ROUTE,
    key: 'HOMEPAGE',
    component: Overview,
  },
  {
    path: ROUTE_PATHS.CAMPAIGNS_ROUTE,
    key: 'CAMPAIGNS',
    component: Campaigns,
  },
];

const Routes: React.FC = () => (
  <Router>
    <NavBar />
    <Switch>
      {ROUTE_LIST.map((route) => (
        <Route key={route.key} exact path={route.path} component={route.component} />
      ))}
    </Switch>
  </Router>
);

export default Routes;
