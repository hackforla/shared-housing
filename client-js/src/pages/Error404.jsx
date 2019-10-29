import React from 'react';
import { Avatar, makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    height: '5em',
    width: '5em',
  },
  warningIcon: {
    height: '4em',
    width: '4em',
    paddingBottom: '0.8em',
  },
}));

const Error404 = () => {
  const classes = useStyles();
  return (
    <Container>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <WarningRoundedIcon className={classes.warningIcon} />
        </Avatar>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Error 404: Page not found!
        </Typography>
        <Typography variant="h4" align="center" color="textSecondary">
          You may have typed the address incorrectly or used an outdated link.
        </Typography>
      </div>
    </Container>
  );
};

export default Error404;
