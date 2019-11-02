import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
    margin: theme.spacing(2),
  },
}));

export const BaseSlider = ({ field, ...props }) => {
  const { label, step, min, max, textFunc } = props;
  const { name } = field;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography id="discrete-slider" gutterBottom html={name}>
        {label}
      </Typography>
      <Slider
        defaultValue={min}
        getAriaValueText={textFunc}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={step}
        marks
        min={min}
        max={max}
      />
    </div>
  );
};

BaseSlider.defaultProps = {
  textFunc: val => val,
};

BaseSlider.propTypes = {
  label: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  textFunc: PropTypes.func,
  field: PropTypes.string.isRequired,
};

export default BaseSlider;
