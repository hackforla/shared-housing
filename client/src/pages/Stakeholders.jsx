import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import LAFHFlyer from '../assets/images/Stakeholders/LAFH_flyer.png';
import { SectionContainer } from '../components/common';

const useStyles = makeStyles(theme => ({
  stakeholdersTitle: {
    color: 'gray',
    margin: '20px 0 20px 0',
    textDecoration: 'underline',
    textAlign: 'center',
  },
  gridPadding: {
    padding: '50px',
  },
  stakeholdersListTitle: {
    textDecoration: 'underline',
  },
  holder: {
    margin: '10px 0',
  },
  flyerModal: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
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
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SectionContainer>
      <Typography className={classes.stakeholdersTitle} variant="h5">
        Sponsor LA Family Housing
      </Typography>

      <Grid container spacing={3} className={classes.gridPadding}>
        <Grid item xs={6}>
          <List>
            <Typography variant="h6" className={classes.stakeholdersListTitle}>
              Stakeholders
            </Typography>

            {STAKEHOLDERS.map(holder => {
              return (
                <div key={holder} className={classes.holder}>
                  {holder}
                </div>
              );
            })}
          </List>
        </Grid>

        <Grid item xs={6}>
          <div
            className="flyer-container"
            onClick={handleOpen}
            role="button"
            tabIndex={0}
            onKeyPress={handleOpen}
          >
            <img src={LAFHFlyer} alt="lafhFlyer" width="500" hegith="500" />
          </div>
        </Grid>
      </Grid>

      <Modal
        aria-labelledby="flyer-modal-title"
        aria-describedby="flyer-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className={classes.flyerModal}>
          <img src={LAFHFlyer} alt="lafhFlyer" width="800" height="900" />
        </div>
      </Modal>
    </SectionContainer>
  );
};

export default StakeholdersPage;
