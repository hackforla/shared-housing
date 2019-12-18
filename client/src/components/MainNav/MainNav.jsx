import React, { useState } from 'react';

import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import MenuIcon from '@material-ui/icons/Menu';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3), // only used when nav is fixed
    flexGrow: 1,
  },
  ToolBar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  RightContent: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  user: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    marginRight: theme.spacing(2),
    color: 'white',
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  MenuIcon: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 0.5,
    marginLeft: theme.spacing(1),
    textAlign: 'left',
  },
  paper: {
    background: '#3f51b5',
    color: 'white',
  },
  menuButton: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  navMenuItem: {
    color: 'inherit',
  },
}));

function MainNav(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  function handleMenuButtonClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuButtonClose() {
    setAnchorEl(null);
  }

  const paths = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Dashboard',
      path: '/dashboard',
    },
    {
      name: 'News',
      path: '/news',
    },
    {
      name: 'Demo',
      path: '/demo',
    },
    {
      name: 'Prototype-Form',
      path: '/prototype-form',
    },
    {
      name: 'Stakeholders',
      path: '/stakeholders',
    },
    {
      name: 'Team Roster',
      path: '/team',
    },
    {
      name: 'Agile Manifesto',
      path: '/agile-manifesto',
    },
  ];

  const MenuButton = () => {
    function handleClick(path) {
      handleMenuButtonClose();
      props.history.push(path);
    }

    return (
      <div>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
          onClick={handleMenuButtonClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="navMenu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuButtonClose}
          classes={{ paper: classes.paper }}
        >
          {paths.map(path => (
            <MenuItem key={path.name} onClick={() => handleClick(path.path)}>
              {path.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  };

  return (
    <nav className={classes.root}>
      <AppBar color="primary">
        <Toolbar className={classes.ToolBar}>
          <MenuButton className={classes.menuButton} />
          <Typography variant="h6" className={classes.title} noWrap>
            Shared Housing
          </Typography>
          {paths.map(path => (
            <Button
              key={path.name}
              classes={{ root: classes.button }}
              onClick={() => props.history.push(path.path)}
            >
              {path.name}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
    </nav>
  );
}

MainNav.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(MainNav);
