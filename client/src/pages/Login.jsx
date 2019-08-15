import React from 'react';
import LoginForm from '../components/Login/LoginForm';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
});
export const SignInPage = ({ location, onNewLogin }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <LoginForm location={location} onNewLogin={onNewLogin} />
    </div>
  );
};