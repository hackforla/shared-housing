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

export const UnitForm = ({ initialValues }) => {
  const classes = useStyles();

  function handleSubmit(values, actions) {
    // eslint-disable-next-line no-console
    console.log(`values: ${JSON.stringify(values)}`);
    // eslint-disable-next-line no-console
    console.log(`actions: ${JSON.stringify(actions)}`);
    // fetch(
    //   `/api/v1/responses/1/candidate/1`,
    //   {
    //     method: 'POST',
    //     headers:{
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       responseValue: 'yes'
    //     })
    //   }
    // )
  }

  const [state, setState] = React.useState({
    questions: [],
  });

  const refreshQuestions = () => {
    fetch('/api/v1/questions/')
      .then(response => {
        console.log(
          'refreshQuestions: response.statusText = ' + response.statusText,
        );
        return response.json();
      })
      .then(data => {
        setState({
          ...state,
          questions: data,
        });
      });
  };

  React.useEffect(() => {
    refreshQuestions();
  }, []);

  return (
    <Paper className={classes.root}>
      <Typography variant="h4">Unit Form</Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        render={() => (
          <Form>
            {state.questions.map((question, index) => (
              <Field
                key={index}
                name={question.questionId}
                label={question.locationQuestion}
                valueOptions={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                ]}
                component={BaseRadioGroup}
              />
            ))}
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
