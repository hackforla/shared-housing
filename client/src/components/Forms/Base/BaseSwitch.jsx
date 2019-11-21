import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  Switch,
} from '@material-ui/core';

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

export const BaseSwitch = ({ field, ...props }) => {
  const { valueOptions, label } = props;
  const classes = useStyles();

  const initialState = {};
  valueOptions.forEach(option => {
    initialState[option.value] = false;
  });

  const [state, setState] = React.useState(initialState);

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">{label}</FormLabel>
        <FormGroup row>
          {valueOptions.map(option => {
            return (
              <FormControlLabel
                label={option.label}
                value={option.value}
                control={
                  <Switch
                    value={option.value}
                    checked={state.value}
                    onChange={handleChange(option.value)}
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

BaseSwitch.propTypes = {
  label: PropTypes.string.isRequired,
  valueOptions: PropTypes.arrayOf.isRequired,
  field: PropTypes.string.isRequired,
};

export default BaseSwitch;

/* eslint react/jsx-wrap-multilines: "off" */
