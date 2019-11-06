import React from 'react';
import { withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Sidebar from '../Dashboard/Base/BaseSidebar';

const { useRef } = React;

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3), // only used when nav is fixed
    flexGrow: 1,
  },
  ToolBar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  LeftContent: {
    width: '100%',
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
  },
  MenuIcon: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(2),
  },
}));

const MainNav = () => {
  const classes = useStyles();

  const sidebarRef = useRef();

  const buttonWithRoute = ({ name, onClick, path }) => {
    const handleClick = history => () => {
      if (onClick) {
        onClick();
      }
      history.push(path);
    };

    return withRouter(({ history }) => (
      <Button classes={{ root: classes.button }} onClick={handleClick(history)}>
        {name}
      </Button>
    ));
  };
  const DashboardButton = buttonWithRoute({
    name: 'Dashboard',
    path: '/dashboard',
  });

  const NewsButton = buttonWithRoute({
    name: 'News',
    path: '/news',
  });

  const DemoButton = buttonWithRoute({
    name: 'Demo',
    path: '/demo',
  });

  return (
    <nav className={classes.root}>
      <Sidebar ref={sidebarRef} />
      <AppBar color="primary">
        <Toolbar className={classes.ToolBar}>
          <div className={classes.LeftContent}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => sidebarRef.current.handleDrawerOpen()}
              edge="start"
            >
              <MenuIcon />
            </IconButton>

            <NewsButton />
            <DashboardButton />
            <DemoButton />
          </div>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default MainNav;
