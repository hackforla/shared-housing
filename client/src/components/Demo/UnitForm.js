import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { BaseRadioGroup } from '../Forms/Base/BaseRadioGroup';

const useStyles = makeStyles(theme => ({
  root: {
    width: 600,
    maxWidth: '100%',
    padding: theme.spacing(2),
  },
}));

export function UnitForm({ initialValues }) {
  const classes = useStyles();
  const { id } = useParams();

  const history = useHistory();
  const [state, setState] = useState({ questions: [] });

  async function submitResponse(locationId, questionId, value) {
    const url = `/api/v1/locationresponses/${questionId}/location/${locationId}`;
    console.log(`submitResponse: url = ${url}`);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ responseValue: value }),
    })
      .then(r => {
        console.log(`${url}: returned: ${r.statusText}`);
        if (r.status !== 200) {
          throw new Error(r.statusText);
        }
        return r.text();
      })
      .catch(e => {
        throw e;
      });
    return response;
  }

  async function handleSubmit(values, actions) {
    console.log(`values: ${JSON.stringify(values)}`);
    console.log(`actions: ${JSON.stringify(actions)}`);
    try {
      Object.keys(values).map(async key => {
        const value = values[key];
        const responseText = await submitResponse(id, key, value);
        console.log(`responseText = ${responseText}`);
      });
      history.push('/demo');
    } catch (e) {
      throw new Error(e);
    }
  }

  function refreshQuestions() {
    fetch('/api/v1/questions/')
      .then(response => {
        console.log(
          `refreshQuestions: response.statusText = ${response.statusText}`,
        );
        return response.json();
      })
      .then(data => {
        setState({
          ...state,
          questions: data,
        });
      })
      .catch(e => {
        throw new Error(e);
      });
  }

  useEffect(() => {
    refreshQuestions();
  }, []);

  return (
    <Paper className={classes.root}>
      <Typography variant="h4">{`Unit Form: ${id}`}</Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        render={() => (
          <Form>
            {state.questions.map(question => (
              <Field
                key={question.questionId}
                name={question.questionId}
                label={question.locationQuestion}
                valueOptions={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                ]}
                component={BaseRadioGroup}
              />
            ))}
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
}

UnitForm.propTypes = {
  initialValues: PropTypes.shape({
    unitHandicapAccessible: PropTypes.string.isRequired,
  }).isRequired,
};

export default UnitForm;
