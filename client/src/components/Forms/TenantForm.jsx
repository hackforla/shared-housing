import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

import { useParams, useHistory } from 'react-router-dom';

import './form.css';

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow:
      'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
});

// Inspired by blueprintjs
function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}


export const TenantForm = () => {


  const mapQuestionToFormControl = (question, index) => (
    <div className='sh-tenant-question'>
      <FormControl component="fieldset" key={index}>
        <FormLabel component="legend">{question.candidateQuestion}</FormLabel>
        <RadioGroup
          defaultValue="no"
          aria-label={question.questionId}
          name="customized-radios"
          onChange={
            (event) => {
              let newState = { ...state };
              newState.responses[`${question.questionId}`] = event.target.value;
              setState(newState);
            }
          }
        >
          <FormControlLabel value="no" control={<StyledRadio />} label="No" />
          <FormControlLabel value="yes" control={<StyledRadio />} label="Yes" />
        </RadioGroup>
      </FormControl>
    </div>
  );

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

  const { id } = useParams();
  const history = useHistory();

  const [state, setState] = React.useState({
    questions: [],
    responses: {}
  });

  const refreshQuestions = () => {
    fetch('/api/v1/questions/')
      .then(response => {
        console.log(
          'refreshQuestions: response.statusText = ' + response.statusText,
        );
        if (response.status !== 200) {
          throw response.statusText;
        } else {
          return response.json();
        }
      })
      .then(data => {
        console.log(`refreshQuestions: data = ${JSON.stringify(data)}`);
        setState({
          ...state,
          questions: data,
        });
      });
  };

  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(`React.useEffect: about to refresh...`);
    refreshQuestions();
  }, []);

  const submitResponse = async (candidateId, questionId, value) => {
    const url = `/api/v1/responses/${questionId}/candidate/${candidateId}`;
    // eslint-disable-next-line no-console
    console.log(`submitResponse: url = ${url}`);
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ responseValue: value })
    }).then((r) => {
      console.log(`${url}: returned: ${r.statusText}`);
      if (r.status === 200) {
        return r.text();
      } else {
        throw new Error(r.statusText);
      }
    }).catch((e) => {
      throw e;
    });
  };

  const submitTenantForm = async () => {
    // eslint-disable-next-line no-console
    console.log(`submitTenantForm: values = ${JSON.stringify(state)}`);
    // eslint-disable-next-line no-console
    console.log(`submitTenantForm: state.responses = ${JSON.stringify(state.responses)}`);
    try {
      for (let questionId in state.responses) {
        const value = state.responses[questionId];
        // eslint-disable-next-line no-console
        console.log(`submitTenantForm: state.responses[${questionId}]: ${value}`);
        const responseText = await submitResponse(id, questionId, value);
        // eslint-disable-next-line no-console
        console.log(`responseText = ${responseText}`);

        history.push('/demo');

      }
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <div>
      <h2>Tenant Form: {id}</h2>
      {state.questions.map(mapQuestionToFormControl)}
      <div>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={submitTenantForm}
        >
          Save
      </Button>
      </div>
      {/* <FormControl component="fieldset">
        <FormLabel component="legend">
          Do you require a handicap accessible unit?
        </FormLabel>
        <RadioGroup
          defaultValue="no"
          aria-label="needAccessibility"
          name="customized-radios"
        >
          <FormControlLabel value="no" control={<StyledRadio />} label="No" />
          <FormControlLabel value="yes" control={<StyledRadio />} label="Yes" />
        </RadioGroup>
      </FormControl> */}
    </div>
  );
};

export const TenantsPage = () => {

  const history = useHistory();
  const [state, setState] = useState({
    tenants: []
  });

  const fetchTenants = async () => await fetch('/api/v1/candidates')
    .then((response) => {
      console.log(`fetchTenants: response.statusText = ${response.statusText}`);
      if (response.status !== 200) {
        throw new Error(`fetchTenants: HTTP response status: ${response.statusText}`);
      } else {
        return response.json();
      }
    })
    .catch((err) => {
      throw err;
    });



  const refreshTenants = async () => {
    try {
      const freshTenants = await fetchTenants();
      console.log(`refreshTenants: freshTenants = ${JSON.stringify(freshTenants)}`);
      setState({
        ...state,
        tenants: freshTenants
      });
    } catch (err) {
      // TODO: show a modal with error details here?
      console.log(`refreshTenants: err = ${JSON.stringify(err)}`);
      throw err;
    }
  };

  useEffect(() => {
    refreshTenants();
  }, []);

  const tenantClicked = (event) => {
    const id = event.target.id;
    console.log(`tenantClicked: ${id}`);
    history.push(`/demo/tenants/${id}`);
  };

  return (
    <div>
      <h2>Tenants</h2>
      {
        state.tenants.map((tenant, index) => {
          return (
            <div key={index}>
              <div
                id={tenant.candidateId}
                onClick={tenantClicked}
                className='sh-clickable'
                style={{
                  padding: '5px 10px',
                  border: '1px solid black',
                  borderRadius: '3px',
                  margin: '3px 4px'
                }}
              >
                Name: {tenant.name}
              </div>
            </div>
          );
        })
      }
    </div>
  );
};
