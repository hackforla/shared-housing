import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export const BaseTextArea = ({ field, ...props }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TextField
        multiline
        rows={4}
        variant="outlined"
        className={classes.textField}
        {...field}
        {...props}
      />
    </div>
  );
};

BaseTextArea.propTypes = {
  label: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
};

export default BaseTextArea;
