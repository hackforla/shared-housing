import React from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';

//field is from Formik
export const BaseCheckbox = ({ field, ...props }) => {
  return (
    <FormControlLabel
      control={<Checkbox type="string" {...field} {...props} />}
      {...field}
      {...props}
    />
  );
};
