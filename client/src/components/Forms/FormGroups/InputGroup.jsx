import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel } from '@material-ui/core';
import { BaseInput } from '../Base';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  fullWidth: {
    width: '100%',
  },
}));

export const InputGroup = ({ label, field, ...props }) => {
  const classes = useStyles();
  // const errmsg = touched[field.name] && errors[field.name]
  return (
    <div>
      <FormControl
        className={clsx(classes.margin, props.fullWidth && classes.fullWidth)}
        component="div"
      >
        <InputLabel
          shrink
          htmlFor={props.id}
          className={classes.label}
          // error={!!errmsg}
        >
          {label}
        </InputLabel>
        <BaseInput field={field} {...props} />
      </FormControl>
    </div>
  );
};

InputGroup.propTypes = {
  label: PropTypes.string,
};

InputGroup.defaultProps = {
  label: 'Label',
};
