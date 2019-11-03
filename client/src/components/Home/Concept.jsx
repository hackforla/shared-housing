import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  conceptTitle: {
    color: 'gray',
    textAlign: 'center',
    margin: '0 0 50px 0',
    textDecoration: 'underline',
  },
  conceptImage: {
    width: '100%',
  },
}));

const Concept = () => {
  const classes = useStyles();
  return (
    <div className="concept-section">
      <div className="concept-title">
        <Typography variant="h5" className={classes.conceptTitle}>
          Proof of Concept
        </Typography>
      </div>
      <div className="concept-photo-container">
        <img
          className={classes.conceptImage}
          src="https://picsum.photos/id/155/3264/1500"
          alt="status"
        />
      </div>
    </div>
  );
};

export default Concept;
