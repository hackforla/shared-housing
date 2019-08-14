import React from 'react';

import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';
import { Formik, Form, Field } from 'formik';
import { Welcome } from '@storybook/react/demo';
import {
  BaseRadio,
  BaseSelect,
  BaseCheckbox,
} from '../src/components/Forms/Base';
import ExampleForm from '../src/components/Forms/FormikForms/ExampleForm';

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));

storiesOf('Forms', module)
  .add('Input', () => (
    <ExampleForm
      initValues={{ Firstname: '', LastName: '', FavoriteColor: '' }}
    />
  ))
  .add('Radio', () => (
    <Formik
      initialValues={{ name: 'Tony' }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 1000);
      }}
      render={() => (
        <Form>
          <Field
            id="MyRadio"
            label="MyRadioLabel"
            name="name"
            component={BaseRadio}
          />
        </Form>
      )}
    />
  ))
  .add('Select', () => (
    <Formik
      initialValues={{ color: 'red' }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 1000);
      }}
      render={() => (
        <Form>
          <Field
            name="color"
            label="Color"
            valueOptions={[
              { value: 'red', label: 'Red' },
              { value: 'green', label: 'Green' },
              { value: 'blue', label: 'Blue' },
            ]}
            component={BaseSelect}
          />
        </Form>
      )}
    />
  ))
  .add('Checkbox', () => (
    <Formik
      initialValues={{ color: 'red' }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 1000);
      }}
      render={() => (
        <Form>
          <Field
            name="color"
            label="Color"
            valueOptions={[
              { value: 'red', label: 'Red' },
              { value: 'green', label: 'Green' },
              { value: 'blue', label: 'Blue' },
            ]}
            component={BaseCheckbox}
          />
        </Form>
      )}
    />
  ));

// storiesOf('Pickers', module)
//   .add('DateTime', () => <DatePickers />);
