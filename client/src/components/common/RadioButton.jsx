import React from 'react';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
// import Yup from 'yup'

// [x ] onChange handler from formik
// [x ] Label property
// [x ] Value property
// [see below ] Validation compliant (Yup wrapper)
// [x ] Controlled component
// [x ] Using Material-UI radio component
// [x ] Accessibility compliance (A11y standard)

//Yup does not follow normal function conventions.

// const schema = yup.object().shape({
//     generic: yup.bool().test('generic',
//     'Click here to enable',
//     value => value === true)
//     .required(
//         'This must be clicked to continue'
//     ),
// })

export default RadioButton = ({
  field,
  label,
  labelPlacement,
  name,
  value,
  values,
  ...props
}) => {
  return (
    <div>
      <Radio
        checked={values[name] === value}
        id={name}
        label={name.toUpperCase()}
        labelPlacement={labelPlacement}
        name={name}
        type="radio"
        value={value}
        {...field}
        {...props}
      />
    </div>
  );
};

RadioButton.propTypes = {
  label: PropTypes.string.isRequired,
  labelPlacement: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired
};
