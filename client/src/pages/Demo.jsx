import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Switch, Route, NavLink, BrowserRouter } from 'react-router-dom';
import { SectionContainer, ComponentToggler } from '../components/common';
import { TenantForm, Results, UnitForm } from '../components/Forms';
import { TenantsPage } from '../components/Forms/TenantForm';
import { UnitsPage } from './UnitsPage';
import { ConstraintsForm } from '../components/Forms/ConstraintsForm';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
      textAlign: 'center',
      padding: '7px',
    },
    control: {
      padding: theme.spacing(2),
    },
  }),
);

const options = [
  {
    displayName: 'units',
    component: <p> UnitList Component </p>,
  },
  {
    displayName: 'tenants',
    component: <p> TenantList Component </p>,
  },
];

export const DemoPage = () => {
  const classes = useStyles();
  return (
    <SectionContainer>
      <BrowserRouter>
        <main>
          <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={2}>
                <Grid item>
                  <NavLink to="/demo/tenant">Tenant Form</NavLink>
                </Grid>
                <Grid item>
                  <NavLink to="/demo/unit">Unit Form</NavLink>
                </Grid>
                <Grid item>
                  <NavLink to="/demo/constraints">Constraints</NavLink>
                </Grid>
                <Grid item>
                  <NavLink to="/demo/results">Results</NavLink>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Switch>
            <Route exact path="/demo/tenant" component={TenantsPage} />
            <Route exact path="/demo/unit" component={UnitsPage} />
            <Route exact path="/demo/results" component={Results} />
            <Route exact path="/demo/tenants/:id" component={TenantForm} />
            <Route exact path="/demo/units/:id" component={UnitForm} />
            <Route exact path="/demo/constraints" component={ConstraintsForm} />
          </Switch>

          <ComponentToggler options={options} />
        </main>
      </BrowserRouter>
    </SectionContainer>
  );
};

export default DemoPage;
