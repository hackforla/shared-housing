import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(() => ({
  statusTitle: {
    color: 'gray',
    textAlign: 'center',
    margin: '0 0 50px 0',
    textDecoration: 'underline',
  },
  statusImage: {
    width: '100%',
  },
  newsFeed: {
    marginTop: '20px',
    width: 'fit-content',
  },
  newsFeedHeader: {
    border: '1px solid black',
    padding: '10px',
    margin: '30px 0 20px 0',
  },
}));

const Status = () => {
  const classes = useStyles();
  return (
    <div className="status-section">
      <div className="status-title">
        <Typography variant="h5" className={classes.statusTitle}>
          Status
        </Typography>
      </div>
      <div className="status-photo-container">
        <img
          className={classes.statusImage}
          src="https://picsum.photos/id/1050/6000/2500"
          alt="status"
        />
      </div>

      <div className={classes.newsFeed}>
        <Typography variant="h5" className={classes.newsFeedHeader}>
          Recieve Update Notifications
        </Typography>

        <Box className="updates">
          <div className="update">
            Change log with dates
            <br />
            1/1/2018 - lorem ipsum dolar sit amet,
            <br />
            consecteur abipiscioni elit. sed do euisimod
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Status;
