import React from 'react';
import Radio from '@material-ui/core/Radio';
import PropTypes from 'prop-types'
/*
todo: capture inputProps so they can get passed from above
 */
export const BaseRadio = ({ inputProps, field, ...props }) => {
  return (
    <Radio
      {...field}
      {...props}
      inputProps={inputProps} // get passed to input
    />
  );
};

BaseRadio.propTypes = {
  inputProps: PropTypes.shape(PropTypes.object).isRequired
};