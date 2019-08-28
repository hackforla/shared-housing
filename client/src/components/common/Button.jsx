import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button as MaterialUIButton } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export const Button = ({ text, color, disabled, onClick }) => {
  const classes = useStyles();
  return (
    <div>
      <MaterialUIButton
        variant="contained"
        color={color}
        disabled={disabled}
        className={classes.button}
        onClick={onClick}
      >
        {text}
      </MaterialUIButton>
    </div>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  disabled: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  color: 'default',
  disabled: false,
};

export default Button;
