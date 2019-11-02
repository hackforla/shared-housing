import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
  },
}));

export const BaseChip = ({ ...props }) => {
  const classes = useStyles();
  const { label, size } = props;

  return (
    <Chip label={label} className={classes.root} color="primary" size={size} />
  );
};

BaseChip.defaultProps = {
  size: '',
};

BaseChip.propTypes = {
  label: PropTypes.string.isRequired,
  size: PropTypes.string,
};

export default BaseChip;
