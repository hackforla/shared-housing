import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  recordContent: {
    margin: '50px 0',
    width: '85%',
  },
  recordTitle: {
    color: 'gray',
    textAlign: 'center',
    margin: '0 0 50px 0',
    textDecoration: 'underline',
  },
  recordHeader: {
    margin: '20px 0 30px 0',
  },
  recordBody: {
    margin: '20px 0',
    lineHeight: '2.25',
  },
}));

const Record = () => {
  const classes = useStyles();
  return (
    <div className={classes.recordSection}>
      <div className="record-title">
        <Typography variant="h5" className={classes.recordTitle}>
          Architecture Decision Record
        </Typography>
      </div>
      <div className={classes.recordContent}>
        <Typography variant="h6" className={classes.recordHeader}>
          Architecture Decision Record goes here
        </Typography>

        <Typography variant="body1" className={classes.recordBody}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Typography>

        <Typography variant="body1" className={classes.recordBody}>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of lde Finibus Bonorum et Malorum; (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the
          theory of ethics, very popular during the Renaissance. The first line
          of Lorem Ipsum, ;Lorem ipsum dolor sit amet..;, comes from a line in
          section 1.10.32.
        </Typography>
      </div>
    </div>
  );
};

export default Record;
