import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormGroup, FormControlLabel } from '@material-ui/core';
import { BaseCheckbox } from '../Base';

export const CheckboxGroup = ({ label, field, ...props }) => {
  return (
    <fieldset>
      <FormControl component="fieldset">
        <FormGroup>
          <BaseCheckbox field={field} {...props} />
        </FormGroup>
      </FormControl>
    </fieldset>
  );
};

CheckboxGroup.propTypes = {
  label: PropTypes.string
};
CheckboxGroup.defaultProps = {
  label: 'Label'
};
