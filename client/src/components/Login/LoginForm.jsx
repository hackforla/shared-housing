import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  Grid,
  Link,
  Typography,
  Container,
  Button,
  Avatar,
  makeStyles,
} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { InputGroup } from '../Forms/FormGroups';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 1, 2, 1),
  },
}));

const LoginForm = () => {
  const [state, setState] = useState({
    username: '',
    password: '',
    submitted: false,
    loading: false,
    redirectToReferrer: false,
    error: '',
  });
  const classes = useStyles();

  const handleFormSubmit = () => {
    console.log('Pending login logic');
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Formik
          enableReinitialize
          initialValues={{ username: '', password: '' }}
          onSubmit={(values, actions) => {
            handleFormSubmit(values);
          }}
          render={({
            handleSubmit,
            isSubmitting,
            values,
            handleReset,
            ...props
          }) => (
            <Form className={classes.form}>
              <Field
                required
                fullWidth
                disabled={false}
                id="username"
                label="Username"
                name="username"
                component={InputGroup}
              />
              <Field
                required
                fullWidth
                disabled={false}
                id="password"
                label="Password"
                name="password"
                component={InputGroup}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                color="primary"
                className={classes.submit}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        />
      </div>
    </Container>
  );
};

export default LoginForm;
