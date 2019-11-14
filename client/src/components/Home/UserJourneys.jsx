import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import outreachUserJourneyImage from '../../assets/images/outreach_user_journey_image.png';
import stabilizationUserJourneyImage from '../../assets/images/stabilization_user_journey_image.png';
import navUserJourneyImage from '../../assets/images/nav_user_journey_image.png';
import tenantUserJourneyImage from '../../assets/images/tenant_user_journey_image.png';

const useStyles = makeStyles(() => ({
  journeyTitle: {
    color: 'gray',
    textAlign: 'center',
    margin: '0 0 50px 0',
    textDecoration: 'underline',
  },
  journeysImage: {
    width: '100%',
    height: '906px',
  },
  formControl: {
    width: '100%',
    margin: '30px 0 0 0',
    border: '1px solid gray',
    borderRadius: '4px',
    padding: '15px',
  },
}));

const JOURNEY_IMAGES = {
  0: outreachUserJourneyImage,
  1: stabilizationUserJourneyImage,
  2: navUserJourneyImage,
  3: tenantUserJourneyImage,
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
          src={JOURNEY_IMAGES[journey]}
          alt="journey"
        />
      </div>

      <FormControl variant="outlined" className={classes.formControl}>
        <Select
          labelid="user-journey-select-label"
          id="user-journey-select"
          name="journey"
          value={journey}
          onChange={handleChange}
        >
          <MenuItem value={0}>Outreach - User Journey</MenuItem>
          <MenuItem value={1}>Stabilization - User Journey</MenuItem>
          <MenuItem value={2}>Nav - User Journey</MenuItem>
          <MenuItem value={3}>Tenant - User Journey</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default UserJourney;
