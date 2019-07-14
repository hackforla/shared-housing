import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    backgroundColor: 'transparent',
    borderRadius: 0,
    border: 'none'
  }
}));

export const SectionContainer = ({ id, children }) => {
  const classes = useStyles();
  return (
    <div id={id} className={classes.root}>
      <Container>{children}</Container>
    </div>
  );
};

SectionContainer.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node.isRequired
};

SectionContainer.defaultProps = {id: null};

export default SectionContainer;
