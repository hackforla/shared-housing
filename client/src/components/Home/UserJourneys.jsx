import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(() => ({
  journeyTitle: {
    color: 'gray',
    textAlign: 'center',
    margin: '0 0 50px 0',
    textDecoration: 'underline',
  },
  journeysImage: {
    width: '100%',
    maxHeight: '550px',
  },
  formControl: {
    width: '100%',
    margin: '30px 0 0 0',
    border: '1px solid gray',
    borderRadius: '4px',
    padding: '15px',
  },
}));

const JOURNEYPHOTOURLS = {
  0: 'https://picsum.photos/id/1074/5472/2648',
  1: 'https://picsum.photos/id/237/3500/1795',
  2: 'https://picsum.photos/id/1020/4288/1848',
  3: 'https://picsum.photos/id/1041/5184/2316',
};

const UserJourney = () => {
  const [journey, setJourney] = useState(0);

  const handleChange = evt => {
    const { value } = evt.target;
    setJourney(value);
  };

  const classes = useStyles();
  return (
    <div className="journey-section">
      <div className="journey-title">
        <Typography variant="h5" className={classes.journeyTitle}>
          User Journeys
        </Typography>
      </div>
      <div className="journeys-photo-container">
        <img
          className={classes.journeysImage}
          src={JOURNEYPHOTOURLS[journey]}
          alt="journey"
        />
      </div>

      <FormControl variant="outlined" className={classes.formControl}>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          name="journey"
          value={journey}
          onChange={handleChange}
        >
          <MenuItem value={0}>None</MenuItem>
          <MenuItem value={1}>One</MenuItem>
          <MenuItem value={2}>Two</MenuItem>
          <MenuItem value={3}>Three</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default UserJourney;
