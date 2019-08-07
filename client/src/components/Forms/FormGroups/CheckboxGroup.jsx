import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, FormLabel, FormGroup } from '@material-ui/core';
import { BaseCheckbox } from '../Base';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing(3)
  }
}));

export const CheckboxGroup = ({ label, field, ...props }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">{label}</FormLabel>
        <FormGroup>
          <BaseCheckbox {...field} {...props} />
        </FormGroup>
      </FormControl>
    </div>
  );
};

CheckboxGroup.propTypes = {
  label: PropTypes.string
};
CheckboxGroup.defaultProps = {
  label: 'Label'
};
