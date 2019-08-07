import React from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  input: {
    width: '100%',
  },
}));

export const BaseSelect = ({ field, ...props }) => {
  const { valueOptions, label } = props;
  const { name } = field;
  const classes = useStyles();
  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor={name}>
          {label}
        </InputLabel>
        <Select className={classes.input} {...field} {...props}>
          {valueOptions.map(option => {
            return <MenuItem value={option.value}>{option.label}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </>
  );
};

BaseSelect.propTypes = {
  valueOptions: PropTypes.arrayOf.isRequired,
  label: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
};

export default BaseSelect;
