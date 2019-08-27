import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  group: {
    margin: theme.spacing(1, 0),
  },
}));

export const BaseRadioGroup = ({ field, ...props }) => {
  const { valueOptions, label } = props;
  const { name } = field;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <FormLabel shrink htmlFor={name}>
          {label}
        </FormLabel>
        <RadioGroup
          aria-label={label}
          name={label}
          className={classes.group}
          {...field}
          {...props}
        >
          {valueOptions.map(option => {
            return (
              <FormControlLabel
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

BaseRadioGroup.propTypes = {
  valueOptions: PropTypes.arrayOf.isRequired,
  label: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
};

export default BaseRadioGroup;
