import React from 'react';
// import { hot } from 'react-hot-loader';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './styles/main.css';
import { HomePage, DashboardPage, DemoPage, StakeholdersPage, TeamRoster, AgileManifesto } from './pages';
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
      <Route exact path={PATHS.DEMO} render={() => <DemoPage />} />
      <Route exact path={PATHS.PROTOTYPE_FORM} render={() => <PrototypeForm />} />
      <Route exact path={PATHS.STAKEHOLDERS} render={() => <StakeholdersPage />} />
      <Route exact path={PATHS.TEAM_ROSTER} render={() => <TeamRoster />} />
      <Route exact path={PATHS.AGILE_MANIFESTO} render={() => <AgileManifesto />} />
    </Switch>
  </BrowserRouter>
);

// export default withRoot(hot(module)(App));
export default withRoot(App);
