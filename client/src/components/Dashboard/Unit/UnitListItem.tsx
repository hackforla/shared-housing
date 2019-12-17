import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
});

interface IUnitListItemProps {
  name: string;
  address1: string;
  address2: string;
  handicapAccessible: boolean;
  matches: number;
};

export function UnitListItem({
  name,
  address1,
  address2,
  handicapAccessible,
  matches,
}: IUnitListItemProps) {
  return (
    <Grid container>

    </Grid>
  );
}

export default UnitListItem;
