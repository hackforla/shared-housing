import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  listItem: {
    padding: '5px 10px',
    border: '1px solid black',
    borderRadius: '3px',
    margin: '3px 4px',
    '&:hover': {
      backgroundColor: 'ivory',
    },
  },
}));

export function UnitsPage() {
  const history = useHistory();
  const classes = useStyles();
  const [state, setState] = useState({ units: [] });

  async function fetchUnits() {
    const locations = await fetch('/api/v1/locations')
      .then(response => {
        if (response.status !== 200) {
          throw new Error(
            `fetchUnits: HTTP response status ${response.statusText}`,
          );
        }
        return response.json();
      })
      .catch(err => {
        throw err;
      });
    return locations;
  }

  async function refreshUnits() {
    try {
      const freshUnits = await fetchUnits();
      setState({
        ...state,
        units: freshUnits,
      });
    } catch (err) {
      throw err;
    }
  }

  useEffect(() => {
    refreshUnits();
  }, []);

  function unitClicked(event) {
    const { id } = event.target;
    console.log(`unitClicked: ${id}`);
    history.push(`/demo/units/${id}`);
  }

  return (
    <div>
      <h2>Units</h2>
      <List>
        {state.units.map(unit => (
          <ListItem
            button
            id={unit.locationId}
            onClick={unitClicked}
            className={classes.listItem}
          >
            {`Address: ${unit.name}`}
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default UnitsPage;
