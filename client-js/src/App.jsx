import React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './styles/main.css';
import { HomePage, NewsPage, DashboardPage } from './pages';
import withRoot from './withRoot';

import { PATHS } from './routes';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={PATHS.HOME} render={() => <HomePage />} />
      <Route exact path={PATHS.NEWS} render={() => <NewsPage />} />
      <Route exact path={PATHS.DASHBOARD} render={() => <DashboardPage />} />
    </Switch>
  </BrowserRouter>
);

export default withRoot(hot(module)(App));
