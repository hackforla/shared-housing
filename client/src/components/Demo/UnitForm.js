import React from 'react';
import { Formik, Form, Field } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { BaseRadioGroup } from '../Forms/Base/BaseRadioGroup';

const useStyles = makeStyles(theme => ({
  root: {
    width: 600,
    maxWidth: '100%',
    padding: theme.spacing(2),
  },
}));

const UnitForm = ({ initialValues }) => {
  const classes = useStyles();

  function handleSubmit(values, actions) {
    // eslint-disable-next-line no-console
    console.log(values, actions);
  }

  return (
    <Paper className={classes.root}>
      <Typography variant="h4">Unit Form</Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        render={() => (
          <Form>
            <Field
              name="unitHandicapAccessible"
              label="Is the unit handicap accessible?"
              valueOptions={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
              ]}
              component={BaseRadioGroup}
            />
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
    </Paper>
  );
};

UnitForm.propTypes = {
  initialValues: PropTypes.shape({
    unitHandicapAccessible: PropTypes.string.isRequired,
  }).isRequired,
};

export default UnitForm;
