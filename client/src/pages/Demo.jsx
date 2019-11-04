import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    ChevronLeftIcon,
    Divider,
    MenuIcon,
    Drawer,
    DashboardIcon
} from '@material-ui/core';
import { Switch, Route, NavLink, useHistory, BrowserRouter } from 'react-router-dom';
import { SectionContainer } from '../components/common';
//import { useHistory } from 'react-router';
import { getThemeProps } from '@material-ui/styles';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

export const QuestionsMenu = () => {

    return (
        <div>
            <Typography component="h1" variant="h4" align="center">
                QuestionsMenu
          </Typography>
        </div>
    );
}

export const LocationMenu = () => {

    return (
        <div>
            <Typography component="h1" variant="h4" align="center">
                LocationMenu
          </Typography>
        </div>
    );
};

export const CandidateMenu = () => {
    return (
        <div>
            <Typography component="h1" variant="h4" align="center">
                CandidateMenu
          </Typography>
        </div>
    );
};

export const DemoMenu = () => {
    // const history = useHistory();
    return <div>
        
        <Typography component="h1" variant="h4" align="center">
                Demo Menu
          </Typography>
        {/* <Button onClick={() => { history.push({ pathname: '/demo/candidates' }) }}>Candidates</Button>
        <Button onClick={() => { history.push({ pathname: '/demo/locations' }) }}>Locations</Button>
        <Button onClick={() => { history.push({ pathname: '/demo/questions' }) }}>Questions</Button> */}
    </div>
}


const ActionTypes = {
    ToggleDrawer: 'TOGGLE_DRAWER'
};


export const DemoPage = () => {

    const classes = useStyles({});
    const [state, dispatch] = React.useReducer(
        (state, action) => {
            switch (action.type) {
                case ActionTypes.ToggleDrawer:
                    return {
                        ...state,
                        drawerOpen: !state.drawerOpen
                    }
                default:
                    throw new Error(`Unsupported action: ${JSON.stringify(action)}`);
            }
        },
        {
            drawerOpen: true
        }
    );

    const handleDrawerToggle = () => {
        dispatch({
            type: ActionTypes.ToggleDrawer
        });
    };

    return (
        <SectionContainer>
            <BrowserRouter>
            <div>
                <List>
                    <ListItem
                        button
                        component={NavLink}
                        to='/demo/candidates'
                    >
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Candidates" />
                    </ListItem>
                    <ListItem
                        button
                        component={NavLink}
                        to='/demo/locations'
                    >
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Locations" />
                    </ListItem>
                    <ListItem
                        button
                        component={NavLink}
                        to='/demo/questions'
                    >
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Questions" />
                    </ListItem>
                </List>
                {/* <ul>
                    <NavLink to='/demo/candidates'>Candidates</NavLink>
                    <NavLink to='/demo/locations'>Locations</NavLink>
                    <NavLink to='/demo/questions'>Questions</NavLink>
                </ul> */}
            </div>
            <main>
                <Switch>
                    <Route exact path='/demo' component={DemoMenu} />
                    <Route path='/demo/candidates' component={CandidateMenu} />
                    <Route path='/demo/locations' component={LocationMenu} />
                    <Route path='/demo/questions' component={QuestionsMenu} />
                </Switch>
            </main>
            </BrowserRouter>
        </SectionContainer>
    );
};

export default DemoPage;
