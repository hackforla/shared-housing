import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import _ from 'lodash';

const useStyles = makeStyles({
  toggleContainer: {
    width: 244,
  },
  selected: {
    color: '#383B41 !important',
  },
  toggleButton: {
    width: 122,
  },
});

interface IComponentToggleProps {
  options: Array<any>;
}

export const ComponentToggler = ({ options }: IComponentToggleProps) => {
  const classes = useStyles();
  const [view, setView] = useState(0);

  const handleChange = (evt: any, newView: number) => {
    if (_.isNull(newView)) {
      return;
    }

    setView(newView);
  };

  return (
    <div className="component-toggle-container">
      <div className={classes.toggleContainer}>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleChange}
          aria-label="toggler"
        >
          {options.map((option, index) => {
            return (
              <ToggleButton
                key={option.displayName}
                value={index}
                classes={{ selected: classes.selected }}
                className={classes.toggleButton}
              >
                {option.displayName}
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
      </div>

      <div className="component-section">{options[view].component}</div>
    </div>
  );
};

export default ComponentToggler;
