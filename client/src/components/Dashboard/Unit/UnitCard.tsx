import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import AccessibleIcon from '@material-ui/icons/Accessible';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  card: {
    maxWidth: '100%',
    width: 300,
    height: 300,
  },
  media: {
    minHeight: 150,
  },
  matchesText: {
    textAlign: 'end',
  },
});

interface IUnitCardProps {
  image: string;
  name: string;
  address1: string;
  address2: string;
  handicapAccessible: boolean;
  matches: number;
}

export function UnitCard({
  image,
  name,
  address1,
  address2,
  handicapAccessible,
  matches,
}: IUnitCardProps) {
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
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia className={classes.media} image={image} title={name} />
        <CardContent>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom variant="h5">
                {name}
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.matchesText}>
              <Typography gutterBottom variant="subtitle1">
                {formatMatchesText(matches)}
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="body2">{address1}</Typography>
          <Typography variant="body2">{address2}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          {handicapAccessible && (
            <Typography>
              <AccessibleIcon aria-label="handicap accessible" color="action" />
            </Typography>
          )}
        </CardActions>
      </CardActionArea>
    </Card>
  );
}

export default UnitCard;
