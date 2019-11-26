import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import LAFHFlyer from '../assets/images/Stakeholders/LAFH_flyer.png';
import { SectionContainer } from '../components/common';

const useStyles = makeStyles(theme => ({
  stakeholdersTitle: {
    color: 'gray',
    textDecoration: 'underline',
  },
  gridContainer: {
    // padding: '50px',
    width: 1000,
    maxWidth: '100%',
  },
  stakeholdersListTitle: {
    textDecoration: 'underline',
  },
  holder: {
    margin: '10px 0',
  },
  flyerModal: {
    // position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
  },
  flyerContainer: {
    maxWidth: '100%',
  },
  flyerPreview: {
    width: '100%',
  },
  flyerImage: {
    height: 'auto',
    maxWidth: '100%',
  },
  container: {
    padding: theme.spacing(2),
    width: 800,
    maxWidth: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const STAKEHOLDERS = [
  'County of Los Angeles',
  'County of San Diego',
  'County of Palm Beach',
  'United Way',
  'ePATH',
];

export const StakeholdersPage = () => {
  const classes = useStyles();

  return (
    <SectionContainer>
      <Paper className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography className={classes.stakeholdersTitle} variant="h4">
              Sponsor
            </Typography>
            <div className={classes.holder}>
              <Typography variant="body1">LA Family Housing</Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={9}>
            <List>
              <Typography
                variant="h5"
                className={classes.stakeholdersListTitle}
              >
                Stakeholders
              </Typography>

              {STAKEHOLDERS.map(holder => {
                return (
                  <li key={holder} className={classes.holder}>
                    {holder}
                  </li>
                );
              })}
            </List>
          </Grid>

          <Grid item xs={12} md={3}>
            <a
              className={classes.flyerContainer}
              href={LAFHFlyer}
              tabIndex={0}
              type="button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={LAFHFlyer}
                alt="lafhFlyer"
                className={classes.flyerPreview}
              />
            </a>
          </Grid>
        </Grid>
      </Paper>
    </SectionContainer>
  );
};

export default StakeholdersPage;
