import React from 'react';
import { storiesOf } from '@storybook/react';
import { Formik, Form, Field } from 'formik';
import LoginForm from '../src/components/Login/LoginForm';

import {
  BaseDatePicker,
  BaseTimePicker,
  BaseRadio,
  BaseSelect,
  BaseCheckbox,
  BaseSlider,
  BaseTextArea,
  BaseRadioGroup,
  BaseSwitch,
} from '../src/components/Forms/Base';
import ExampleForm from '../src/components/Forms/FormikForms/ExampleForm';
import UnitForm from '../src/components/Demo/UnitForm';

storiesOf('Pages', module).add('Login', () => <LoginForm />);

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
  ))
  .add('TimePicker', () => (
    <Formik
      onSubmit={(values, actions) => {
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 1000);
      }}
      render={({
        handleSubmit,
        isSubmitting,
        values,
        handleReset,
        ...props
      }) => (
        <Form>
          <Field
            name="TimePicker"
            label="TimePicker"
            component={BaseTimePicker}
            {...props}
          />
        </Form>
      )}
    />
  ))
  .add('DatePicker', () => (
    <Formik
      onSubmit={(values, actions) => {
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 1000);
      }}
      render={({
        handleSubmit,
        isSubmitting,
        values,
        handleReset,
        ...props
      }) => (
        <Form>
          <Field
            name="DatePicker"
            label="DatePicker"
            component={BaseDatePicker}
            {...props}
          />
        </Form>
      )}
    />
  ))
  .add('Slider', () => (
    <Formik
      initialValues={{ happiness: 5 }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 1000);
      }}
      render={() => (
        <Form>
          <Field
            name="happiness"
            label="Happiness Level"
            min={0}
            max={5}
            step={1}
            component={BaseSlider}
          />
        </Form>
      )}
    />
  ))
  .add('BaseTextArea', () => (
    <Formik
      initialValues={{ comments: '' }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
      render={({
        handleSubmit,
        isSubmitting,
        values,
        handleReset,
        ...props
      }) => (
        <Form>
          <Field
            name="comments"
            label="Comments"
            component={BaseTextArea}
            {...props}
          />
        </Form>
      )}
    />
  ))
  .add('RadioGroup', () => (
    <Formik
      initialValues={{ color: 'red' }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 1000);
      }}
      render={props => (
        <Form>
          <Field
            name="color"
            label="Color"
            valueOptions={[
              { value: 'red', label: 'Red' },
              { value: 'green', label: 'Green' },
              { value: 'blue', label: 'Blue' },
            ]}
            component={BaseRadioGroup}
            {...props}
          />
        </Form>
      )}
    />
  ))
  .add('Switch', () => (
    <Formik
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
            component={BaseSwitch}
          />
        </Form>
      )}
    />
  ))
  .add('UnitForm', () => (
    <UnitForm initialValues={{ unitHandicapAccessible: 'no' }} />
  ));
