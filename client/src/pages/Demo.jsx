import * as React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { Switch, Route, NavLink, BrowserRouter } from 'react-router-dom';
import { SectionContainer } from '../components/common';
import { TenantForm, Results, UnitForm } from '../components/Demo';

export const DemoMenu = () => {
  return (
    <div>
      <Typography component="h1" variant="h4" align="center">
        Demo Menu
      </Typography>
    </div>
  );
};

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
                  <NavLink to="/demo/results">Results</NavLink>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Switch>
            <Route exact path="/demo/tenant" component={TenantForm} />
            <Route exact path="/demo/unit" component={UnitForm} />
            <Route exact path="/demo/results" component={Results} />
          </Switch>
        </main>
      </BrowserRouter>
    </SectionContainer>
  );
};

export default DemoPage;
