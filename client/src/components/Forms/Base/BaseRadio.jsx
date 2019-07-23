import React from 'react';
import Radio from '@material-ui/core/Radio';

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

RadioButton.propTypes = {
  id: PropTypes.string.isRequired,
};