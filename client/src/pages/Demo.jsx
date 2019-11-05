import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Paper,
    TextField,
    Fab,
    Button,
    CircularProgress
} from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';

import {
    AddCircleOutline,
} from '@material-ui/icons';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


import { Switch, Route, NavLink, BrowserRouter } from 'react-router-dom';
import { SectionContainer } from '../components/common';

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
    table: {
        minWidth: 650,
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
    clickableIcon: {
        '&:hover': {
            cursor: 'pointer',
            color: 'grey'
        },
        margin: theme.spacing(1),
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

    fab: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
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

    const classes = useStyles({});

    const ActionTypes = {
        GET_CANDIDATES_COMPLETE: 'GET_CANDIDATES_COMPLETE',
        ADD_CANDIDATE: 'ADD_CANDIDATE',
        EDIT_CANDIDATE: 'EDIT_CANDIDATE',
        DELETE_CANDIDATE: 'DELETE_CANDIDATE',
        NAME_CHANGED: 'NAME_CHANGED',
        CANDIDATE_BEGIN_SUBMITT: 'CANDIDATE_BEGIN_SUBMITT',
        CANDIDATE_SUBMIT_COMPLETE: 'CANDIDATE_SUBMIT_COMPLETE',
        MSG_ACK: 'MSG_ACK',
        DISPLAY_MSG: 'DISPLAY_MSG'
    };

    const initialState = {
        candidates: [],
        addCandidate: {
            name: '',
            active: false
        },
        editCandidate: {
            name: '',
            _id: '',
            active: false
        },
        submittingCandidate: false,
        messageModal: {
            open: false,
            title: 'Modal error',
            message: 'Modal error'
        }
    };

    const reducer = (state, action) => {

        switch (action.type) {

            case ActionTypes.GET_CANDIDATES_COMPLETE:
                return {
                    ...state,
                    candidates: action.payload
                };

            case ActionTypes.DISPLAY_MSG:
                return {
                    ...state,
                    messageModal: {
                        ...state.messageModal,
                        open: true,
                        title: payload.title,
                        message: payload.message
                    }
                };

            case ActionTypes.MSG_ACK:
                return {
                    ...state,
                    messageModal: {
                        ...state.messageModal,
                        open: false
                    }
                };

            case ActionTypes.NAME_CHANGED:
                return {
                    ...state,
                    addCandidate: {
                        ...state.addCandidate,
                        name: action.payload
                    }
                };

            case ActionTypes.EDIT_NAME_CHANGED:
                return {
                    ...state,
                    editCandidate: {
                        ...state.editCandidate,
                        name: action.payload
                    }
                };

            case ActionTypes.CANDIDATE_BEGIN_SUBMITT:
                return {
                    ...state,
                    addCandidate: {
                        ...state.addCandidate,
                        active: false
                    },
                    editCandidate: {
                        ...state.editCandidate,
                        active: false
                    },
                    submittingCandidate: true
                };

            case ActionTypes.CANDIDATE_SUBMIT_COMPLETE:
                return {
                    ...state,
                    submittingCandidate: false
                };

            case ActionTypes.ADD_CANDIDATE:
                return {
                    ...state,
                    addCandidate: {
                        ...state.addCandidate,
                        active: true
                    }
                };

            case ActionTypes.EDIT_CANDIDATE:
                return {
                    ...state,
                    editCandidate: {
                        ...state.editCandidate,
                        ...action.payload,
                        active: true
                    }
                };

            default:
                throw new Error(`Unsupported action: ${JSON.stringify(action)}`);
        }
    };

    const [state, dispatch] = React.useReducer(reducer, initialState);

    const mapCandidateToListItem = (candidate, index) => <li key={index}>{candidate['name']}</li>;

    const refreshCandidates = () => {
        fetch('/api/candidates')
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(`Error fetching candidates: ${response.statusText}`);
                }
            })
            .then((candidates) => {
                console.log(`fresh candidates: ${JSON.stringify(candidates)}`);
                dispatch({
                    type: ActionTypes.GET_CANDIDATES_COMPLETE,
                    payload: candidates
                });
            })
            .catch((err) => {
                dispatch({
                    type: ActionTypes.DISPLAY_MSG,
                    payload: {
                        message: err.toString(),
                        title: 'Retrieval error'
                    }
                });
            });
    };

    React.useEffect(() => {
        refreshCandidates();
    }, []);

    const nameChanged = (event) => {
        dispatch({
            type: ActionTypes.NAME_CHANGED,
            payload: event.target.value
        });
    };

    const addCandidateClicked = () => {
        dispatch({
            type: ActionTypes.ADD_CANDIDATE
        });
    };

    const submitNewCandidateClicked = () => {

        dispatch({
            type: ActionTypes.CANDIDATE_BEGIN_SUBMITT
        });

        const payload = {
            name: state.addCandidate.name
        };

        console.log(`submitNewCandidateClicked: payload = ${payload}`)

        fetch('/api/candidates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.text();
                } else {
                    throw new Error(`Error adding candidate: ${response.statusText}`);
                }
            })
            .then((responseText) => {
                console.log(`submitNewCandidateClicked: responseText = ${responseText}`);
                refreshCandidates();
                dispatch({
                    type: ActionTypes.CANDIDATE_SUBMIT_COMPLETE
                });

            })
            .catch((err) => {
                dispatch({
                    type: ActionTypes.CANDIDATE_SUBMIT_COMPLETE
                });
                dispatch({
                    type: ActionTypes.DISPLAY_MSG,
                    payload: {
                        message: err.toString(),
                        title: 'Post error'
                    }
                });
            })
    };

    const updateCandidateClicked = () => {

        dispatch({
            type: ActionTypes.CANDIDATE_BEGIN_SUBMITT
        });

        const payload = {
            name: state.editCandidate.name
        };

        console.log(`updateCandidateClicked: payload = ${payload}`)

        fetch(`/api/candidates/${state.editCandidate._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.text();
                } else {
                    throw new Error(`Error updating candidate: ${response.statusText}`);
                }
            })
            .then((responseText) => {
                console.log(`updateCandidateClicked: responseText = ${responseText}`);
                refreshCandidates();
                dispatch({
                    type: ActionTypes.CANDIDATE_SUBMIT_COMPLETE
                });

            })
            .catch((err) => {
                dispatch({
                    type: ActionTypes.CANDIDATE_SUBMIT_COMPLETE
                });
                dispatch({
                    type: ActionTypes.DISPLAY_MSG,
                    payload: {
                        message: err.toString(),
                        title: 'Update error'
                    }
                });
            });
    };

    const messageAcknowledged = () => {
        dispatch({
            type: ActionTypes.MSG_ACK
        });
    };

    const candidateRowClicked = (event) => {
        const id = event.currentTarget.id;
        console.log(`candidateRowClicked: clicked id: ${id}`);
    };

    const deleteCandidate = (id) => {
        console.log(`deleteCandidate: deleting candidate with id: ${id}`);
    };

    const editCandidate = (candidate) => {
        console.log(`deleteCandidate: editing candidate with id: ${JSON.stringify(candidate)}`);
        dispatch({
            type: ActionTypes.EDIT_CANDIDATE,
            payload: {
                ...candidate
            }
        });
    };

    const mapCandidateToTableRow = (candidate, index) => {

        console.log(`- ${index}: ${JSON.stringify(candidate)}`);

        return <TableRow key={index}>
            <TableCell>{candidate.name}</TableCell>
            <TableCell>{candidate._id}</TableCell>
            <TableCell align="right">
                <IconButton
                    className={classes.clickableIcon}
                    aria-label="edit"
                    onClick={() => { editCandidate(candidate) }}
                >
                    <EditIcon color='primary' />
                </IconButton>
            </TableCell>
            <TableCell align="right">
                <IconButton
                    className={classes.clickableIcon}
                    onClick={() => { deleteCandidate(candidate._id) }}
                    aria-label="delete"
                >
                    <DeleteIcon color='secondary' />
                </IconButton>
            </TableCell>
        </TableRow>;
    };

    const editNameChanged = (event) => {
        dispatch({
            type: ActionTypes.EDIT_NAME_CHANGED,
            payload: event.target.value
        });
    };

    return (
        <div>

            <Typography component="h1" variant="h4" align="center">Candidates</Typography>

            <Dialog open={state.addCandidate.active}>
                <DialogTitle>Add Candidate</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText></DialogContentText> */}
                    <TextField
                        id='candidateName'
                        label='Candidate Name'
                        helperText='Enter name'
                        value={state.addCandidate.name}
                        onChange={nameChanged}
                    />
                </DialogContent>
                <DialogActions>
                    <Fab variant="extended" aria-label="add" className={classes.fab} onClick={updateCandidateClicked}>
                        <AddCircleOutline className={classes.extendedIcon} />
                        Submit
                    </Fab>
                </DialogActions>
            </Dialog>

            <Dialog open={state.editCandidate.active}>
                <DialogTitle>Edit Candidate</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText></DialogContentText> */}
                    <TextField
                        id='candidateNameEdit'
                        label='Candidate Name'
                        helperText='Enter name'
                        value={state.editCandidate.name}
                        onChange={editNameChanged}
                    />
                </DialogContent>
                <DialogActions>
                    <Fab variant="extended" aria-label="update" className={classes.fab} onClick={updateCandidateClicked}>
                        <SaveIcon className={classes.extendedIcon} /> Update
                    </Fab>
                </DialogActions>
            </Dialog>

            <Dialog open={state.submittingCandidate}>
                <DialogTitle>Adding candidate...</DialogTitle>
                <CircularProgress />
            </Dialog>

            <Dialog open={state.messageModal.open}>
                <DialogTitle>{state.messageModal.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{state.messageModal.message}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={messageAcknowledged}>OK</Button>
                </DialogActions>
            </Dialog>

            {/* <Button onClick={addCandidateClicked}>Add Candidate</Button> */}


            <Fab variant="extended" aria-label="like" className={classes.fab} onClick={addCandidateClicked}>
                <AddIcon className={classes.extendedIcon} />
                Add Candidate
            </Fab>
            <Paper className={classes.root}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Edit</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{state.candidates.map(mapCandidateToTableRow)}</TableBody>
                </Table>
            </Paper>

        </div>
    );
};

export const DemoMenu = () => {
    // const history = useHistory();
    return <div>

        <Typography component="h1" variant="h4" align="center">
            Demo Menu
          </Typography>
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
                    <ul>
                        <NavLink to='/demo/candidates'>Candidates</NavLink>
                        <NavLink to='/demo/locations'>Locations</NavLink>
                        <NavLink to='/demo/questions'>Questions</NavLink>
                    </ul>
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
