import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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

  const [state, setState] = useState({
    questions: [],
  });

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

const mapQuestionToFormControl = (question, index) => (
  <FormControl component="fieldset" key={index}>
    <FormLabel component="legend">{question.candidateQuestion}</FormLabel>
    <RadioGroup
      defaultValue="no"
      aria-label={question.questionId}
      name="customized-radios"
    >
      <FormControlLabel value="no" control={<StyledRadio />} label="No" />
      <FormControlLabel value="yes" control={<StyledRadio />} label="Yes" />
    </RadioGroup>
  </FormControl>
);

export const TenantForm = () => {
  function handleSubmit(values, actions) {
    // eslint-disable-next-line no-console
    console.log(`values: ${JSON.stringify(values)}`);
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
    <div>
      <h2>Tenant Form</h2>
      {state.questions.map(mapQuestionToFormControl)}
      <FormControl component="fieldset">
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
      </FormControl>
    </div>
  );
};
