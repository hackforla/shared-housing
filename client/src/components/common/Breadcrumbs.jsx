import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Breadcrumbs as MaterialUIBreadcrumbs } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  paper: {
    padding: theme.spacing(1, 2),
  },
}));

export const Breadcrumbs = ({ handleClick }) => {
  const classes = useStyles();

  // TODO: Replace MaterialUI Links with routing solution
  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <MaterialUIBreadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/" onClick={handleClick}>
            Root
          </Link>
          <Link color="inherit" href="/parent/" onClick={handleClick}>
            Parent
          </Link>
          <Typography color="textPrimary">Current Location</Typography>
        </MaterialUIBreadcrumbs>
      </Paper>
    </div>
  );
};

Breadcrumbs.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

Breadcrumbs.defaultProps = {};

export default Breadcrumbs;
