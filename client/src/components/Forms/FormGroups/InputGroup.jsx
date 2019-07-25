import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel } from '@material-ui/core';
import { BaseInput } from '../Base';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  }
}));

export const InputGroup = ({ label, field, ...props }) => {
  const classes = useStyles();
  // const errmsg = touched[field.name] && errors[field.name]
  return (
    <div>
      <FormControl className={classes.margin} component="div">
        <InputLabel
          shrink
          htmlFor={props.id}
          className={classes.label}
          // error={!!errmsg}
        >
          {label}
        </InputLabel>
        <BaseInput field={field} {...props}/>
      </FormControl>
    </div>
  );
};

InputGroup.propTypes = {
  // id: PropTypes.string,
  label: PropTypes.string
};

InputGroup.defaultProps = {
  // id: '', // needed for screen readers
  label: 'Label'
};

