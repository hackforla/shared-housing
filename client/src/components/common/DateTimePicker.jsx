import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// Date type (mandatory)
// Time type (pending)
// onChange handler
// Label property
// Value property
// Validation compliant (Yup wrapper)
// Controlled component
// Using Material-UI Date/Time Picker component
// Accessibility compliance (A11y standard)

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 150
  }
}));

const months = {
  'Jan' : '01',
  'Feb' : '02',
  'Mar' : '03',
  'Apr' : '04',
  'May' : '05',
  'Jun' : '06',
  'Jul' : '07',
  'Aug' : '08',
  'Sep' : '09',
  'Oct' : '10',
  'Nov' : '11',
  'Dec' : '12'
}

const [, month, day, year] = new Date().toString().split(" ")
const currentDate = [`${year}-${months[month]}-${day}`].join(" ");

export default DatePickers = (field, ...props) => {
  const classes = useStyles();

  return (
    <div>
      <TextField
        className={classes.textField}
        defaultValue={currentDate}
        id="date"
        label="Date"
        type="date"
        InputLabelProps={{
          shrink: true
        }}
        {...field}
        {...props}
      />
    </div>
  );
};

const [,,,,localTime] = new Date().toString().split(" ")
const currentTime = localTime.slice(0,5)

export default TimePickers = (field, ...props) => {
    const classes = useStyles();

    return (
        <div>
            <TextField
            className={classes.textField}
            defaultValue= {currentTime}
            id="time"
            label="Choose time"
            type="time"
            InputLabelProps={{
                shrink: true,
            }}
            inputProps={{
                step: 300 // 5 min
            }}
            {...field}
            {...props}
            />
        </div>
    );
}

DatePickers.propTypes = {
  handleChange: PropTypes.func.isRequired
}

TimePickers.propTypes = {
  handleChange: PropTypes.func.isRequired
}