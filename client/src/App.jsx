import React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './styles/main.css';
import { HomePage, DashboardPage } from './pages';
import PrototypeForm from './components/PrototypeForm/PrototypeForm';
import withRoot from './withRoot';
import MainNav from './components/MainNav';

import { PATHS } from './routes';

const App = () => (
  <BrowserRouter>
    <MainNav />
    <Switch>
      <Route exact path={PATHS.HOME} render={() => <HomePage />} />
      <Route exact path={PATHS.DASHBOARD} render={() => <DashboardPage />} />
      <Route
        exact
        path={PATHS.PROTOTYPE_FORM}
        render={() => <PrototypeForm />}
      />
    </Switch>
  </BrowserRouter>
);

// export default withRoot(hot(module)(App));
export default withRoot(App);
