import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button } from '@material-ui/core';
import { InputGroup } from '../FormGroups';

const ExampleForm = ({ initValues }) => {
  const [isEditing, setEdit] = useState(true);
  const toggleEdit = () => setEdit(!isEditing);
  const handleCancel = () => {
    toggleEdit();
  };

  const handleFormSubmit = values => {
    alert('Form is submitted');
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initValues}
      onSubmit={(values, actions) => {
        handleFormSubmit(values);
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
            disabled={!isEditing}
            name="Firstname"
            label="Firstname "
            component={InputGroup}
          />

          <Field
            disabled={!isEditing}
            name="LastName"
            label="Last Name"
            component={InputGroup}
          />

          <Field
            disabled={!isEditing}
            name="FavoriteColor"
            label="Favorite Color"
            component={InputGroup}
          />
          <Button
            size="small"
            type="reset"
            // variant="outlined"
            color="default"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            size="small"
            type="submit"
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </Form>
      )}
    />
  );
};

export default ExampleForm;
