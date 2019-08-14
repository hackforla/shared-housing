import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export const BaseCheckbox = ({ field, ...props }) => {
  const { valueOptions, label } = props;
  const { name } = field;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">{label}</FormLabel>
        <FormGroup>
          {valueOptions.map(option => {
            return (
              <FormControlLabel
                label={option.label}
                control={
                  <Checkbox
                    value={option.value}
                    type="string"
                    {...field}
                    {...props}
                  />
                }
              />
            );
          })}
        </FormGroup>
      </FormControl>
    </div>
  );
};

BaseCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  valueOptions: PropTypes.arrayOf.isRequired,
  field: PropTypes.string.isRequired,
};
BaseCheckbox.defaultProps = {
  label: 'Label',
};
