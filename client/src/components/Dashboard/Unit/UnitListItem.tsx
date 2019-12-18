import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AccessibleIcon from '@material-ui/icons/Accessible';

const useStyles = makeStyles({
  root: {
    paddingTop: 10,
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 10,
    maxWidth: '90%',
    width: 600,
  },
  matchesText: {
    textAlign: 'end',
  },
});

interface IUnitListItemProps {
  name: string;
  address1: string;
  address2: string;
  handicapAccessible: boolean;
  matches: number;
}

export function UnitListItem({
  name,
  address1,
  address2,
  handicapAccessible,
  matches,
}: IUnitListItemProps) {
  const classes = useStyles();

  function formatMatchesText(matchesInput: number) {
    let formattedText;
    if (matchesInput > 1) {
      formattedText = `${matchesInput} Matches`;
    } else if (matchesInput === 1) {
      formattedText = `${matchesInput} Match`;
    } else {
      formattedText = '';
    }
    return formattedText;
  }

  return (
    <Paper className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h5">
            {name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography gutterBottom variant="body1">
            {address1}
          </Typography>
          <Typography gutterBottom variant="body1">
            {address2}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems="flex-end">
            <Grid item xs={2}>
              {handicapAccessible && (
                <Typography>
                  <AccessibleIcon
                    aria-label="handicap accessible"
                    color="action"
                  />
                </Typography>
              )}
            </Grid>
            <Grid item xs={10} className={classes.matchesText}>
              <Typography variant="h6">{formatMatchesText(matches)}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default UnitListItem;
