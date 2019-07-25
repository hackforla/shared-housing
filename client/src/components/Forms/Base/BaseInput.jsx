import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { InputBase } from '@material-ui/core'
import clsx from 'clsx'

/*
This base input set the base style for all inputs and
takes Formik's base props and all the props added to the Field
component and spreads them to the Material-ui's inputbase
 */

const useStyles = makeStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    paddingLeft: theme.spacing(1),
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '100%',
  },
}));

export const BaseInput = ({ field,...props }) => {
  const classes = useStyles();
  return (
    <InputBase
      className={clsx(classes.input, classes.root)}
      {...field}
      {...props}
    />
  )
};
