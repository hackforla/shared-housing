import React from 'react';
import { Formik, Form, Field } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { BaseRadioGroup } from '../Forms/Base/BaseRadioGroup';
import {useParams, useHistory} from 'react-router-dom';
import './demo.css';

const useStyles = makeStyles(theme => ({
  root: {
    width: 600,
    maxWidth: '100%',
    padding: theme.spacing(2),
  },
}));

export const UnitForm = ({ initialValues }) => {
  const classes = useStyles();
  const {id} = useParams();

  const history = useHistory();
  
  const submitResponse = async (locationId, questionId, value) => {
    const url = `/api/v1/locationresponses/${questionId}/location/${locationId}`;
    // eslint-disable-next-line no-console
    console.log(`submitResponse: url = ${url}`);
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({responseValue: value})
    }).then((r) => {
      console.log(`${url}: returned: ${r.statusText}`);
      if(r.status === 200) {
        return r.text();
      } else {
        throw new Error(r.statusText);
      }
    }).catch((e) => {
      throw e;
    });
  };

  async function handleSubmit(values, actions) {
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
    try {
      for(let questionId in values) {
        const value = values[questionId];
        
        const responseText = await submitResponse(id, questionId, value);
        // eslint-disable-next-line no-console
        console.log(`responseText = ${responseText}`);

        history.push('/demo');
      }
    } catch(e) {
      throw new Error(e);
    }
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
<Typography variant="h4">Unit Form: {id}</Typography>
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
            {/* <Field
              name="unitHandicapAccessible"
              label="Is the unit handicap accessible?"
              valueOptions={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
              ]}
              component={BaseRadioGroup}
            /> */}
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


export const UnitsPage = () => {

  const history = useHistory();

  const [state, setState] = React.useState({
    units: []
  });

  const fetchUnits= async () => await fetch('/api/v1/locations')
    .then((response) => {
      if(response.status !== 200) {
        throw new Error(`fetchUnits: HTTP response status: ${response.statusText}`);
      } else {
        return response.json();
      }
    })
    .catch((err) => {
      throw err;
    });

  const refreshUnits = async () => {
    try {
      const freshUnits = await fetchUnits();
      setState({
        ...state,
        units: freshUnits
      });
    } catch (err) {
      // TODO: show a modal with error details here?
      throw err;
    }
  };

  React.useEffect(() => {
    refreshUnits();
  }, []);

  const unitClicked = (event) => {
    const id = event.target.id;
    console.log(`unitClicked: ${id}`);
    history.push(`/demo/units/${id}`);
  };

  return (
    <div>
      <h2>Tenants</h2>
      {
        state.units.map((unit, index) => {
          return (
            <div key={index}>
              <div
                id={unit.locationId}
                onClick={unitClicked}
                className='sh-clickable'
                style={{
                  padding: '5px 10px',
                  border: '1px solid black',
                  borderRadius: '3px',
                  margin: '3px 4px'
                }}
              >
                Address: {unit.name}
              </div>
            </div>
          );
        })
      }
    </div>
  );
};
