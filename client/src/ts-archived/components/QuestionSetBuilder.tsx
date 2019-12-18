import * as React from 'react';

import { Container, Grid, TextField, Fab, List, ListItem, ListItemText, Modal, Fade, Backdrop, Paper, Card, CardContent, CardActions, Theme, makeStyles, Slide, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { AddCircleOutline } from '@material-ui/icons';
import { Question, ResponseValue, QuestionSet } from '../models';
import { AddResponseValueForm } from './AddResponseValueForm';
import { TransitionProps } from 'react-transition-group/Transition';
// import { useStyles } from '../util';

export const useStyles = makeStyles((theme: Theme) => ({
    fab: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}));

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export interface QuestionSetBuilderProps {
    addQuestionSet: (questionSet: QuestionSet) => void;
};

export enum QuestionSetBuilderActionType {
    ChangeCurrentQuestionId,
    ChangeCurrentQuestionText,
    AddQuestion,
    AddResponseValue
};

export interface QuestionSetBuilderAction {
    type: QuestionSetBuilderActionType,
    payload?: string | Question
};

export interface QuestionSetBuilderState {
    currentQuestion: Question;
    questions: Array<Question>;
}

export const QuestionSetBuilder = (props: QuestionSetBuilderProps) => {

    const initialState: QuestionSetBuilderState = {
        currentQuestion: { id: '', text: '', responses: new Array<ResponseValue>() } as Question,
        questions: [] as Array<Question>
    };

    const reducer = (state: QuestionSetBuilderState, action: QuestionSetBuilderAction): QuestionSetBuilderState => {


        console.log(`reducer: state = ${JSON.stringify(action)}`);
        console.log(`reducer: action = ${JSON.stringify(action)}`);

        let newState: QuestionSetBuilderState;

        switch (action.type) {

            case QuestionSetBuilderActionType.AddQuestion:
                newState = {
                    ...state,
                    questions: [...state.questions, action.payload as Question],
                    currentQuestion: { ...initialState.currentQuestion }
                };
                break;
            case QuestionSetBuilderActionType.ChangeCurrentQuestionText:
                newState = {
                    ...state,
                    currentQuestion: {
                        ...state.currentQuestion,
                        text: action.payload as string
                    }
                };
                break;

            case QuestionSetBuilderActionType.ChangeCurrentQuestionId:
                newState = {
                    ...state,
                    currentQuestion: {
                        ...state.currentQuestion,
                        id: action.payload as string
                    }
                };
                break;

            case QuestionSetBuilderActionType.AddResponseValue:
                newState = {
                    ...state,
                    currentQuestion: {
                        ...state.currentQuestion,
                        responses: [
                            ...state.currentQuestion.responses,
                            {
                                text: action.payload as string
                            }
                        ]
                    }
                };
                break;

            default:
                throw new Error(`Unsupported action type: ${JSON.stringify(action)}`);

        }

        console.log(`reducer: newState = ${JSON.stringify(newState)}`);

        return newState;
    }

    const classes = useStyles({});

    const [state, dispatch] = React.useReducer(reducer, initialState);

    const mapQuestionToListItem = (question: Question, index: number) => <ListItem key={index}>
        <ListItemText>{`${question.id}: ${question.text}`}</ListItemText>
    </ListItem>;

    const mapResponseToListItem = (responseValue: ResponseValue, index: number) => <ListItem key={index}>
        <ListItemText>{responseValue.text}</ListItemText>
    </ListItem>;

    const [responseModalState, setResponseModalState] = React.useState({
        open: false
    });

    const [name, setName] = React.useState('');

    return <React.Fragment>


        <DialogTitle>New Question Set</DialogTitle>

        <DialogContent>
            <DialogContentText>Add questions and possible response types. When finished, give it a name and click 'Submit'</DialogContentText>

            <Paper>
                <Grid container spacing={3}>

                    {/* Question ID */}
                    <Grid item md={12}>
                        <TextField
                            required
                            id="questionId"
                            label="ID"
                            helperText="Unique ID for this question within its question set"
                            value={state.currentQuestion.id}
                            onChange={
                                (event: React.ChangeEvent<HTMLInputElement>) => {
                                    dispatch({
                                        type: QuestionSetBuilderActionType.ChangeCurrentQuestionId,
                                        payload: event.target.value
                                    })
                                }
                            }
                        />
                    </Grid>

                    {/* Question Text */}
                    <Grid item md={12}>
                        <TextField
                            required
                            id="questionText"
                            label="Question"
                            helperText="The question text"
                            value={state.currentQuestion.text}
                            onChange={
                                (event: React.ChangeEvent<HTMLInputElement>) => {
                                    dispatch({
                                        type: QuestionSetBuilderActionType.ChangeCurrentQuestionText,
                                        payload: event.target.value
                                    })
                                }
                            }
                        />
                    </Grid>

                    {/* Submit Question */}
                    <Grid item md={6}>
                        <Fab
                            color="primary"
                            aria-label="add"
                            size="medium"
                            className={classes.fab}
                            onClick={
                                () => {
                                    dispatch({
                                        type: QuestionSetBuilderActionType.AddQuestion,
                                        payload: state.currentQuestion
                                    });
                                }
                            }
                        >
                            <AddCircleOutline className={classes.extendedIcon}>
                                Add Question
                    </AddCircleOutline>
                        </Fab>
                    </Grid>

                    <Grid item md={6}>
                        <Card>
                            <CardContent>
                                <h5>Response Values</h5>
                                <List>
                                    {
                                        state.currentQuestion.responses.map(mapResponseToListItem)
                                    }
                                </List>
                            </CardContent>
                            <CardActions>
                                <Fab
                                    color="primary"
                                    aria-label="add"
                                    size="small"
                                    className={classes.fab}
                                    onClick={
                                        () => {
                                            setResponseModalState({
                                                ...responseModalState,
                                                open: true
                                            });
                                        }
                                    }
                                >
                                    <AddCircleOutline className={classes.extendedIcon}>
                                        Add Response Value
                    </AddCircleOutline>
                                </Fab>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid md={12}>


                        <List>
                            {
                                state.questions.map(mapQuestionToListItem)
                            }
                        </List>
                    </Grid>
                    <Grid md={12}>

                        <TextField
                            required
                            id="name"
                            label="Question Set Name"
                            helperText="The name for this set of questions"
                            value={name}
                            onChange={
                                (event: React.ChangeEvent<HTMLInputElement>) => {
                                    setName(event.target.value);
                                }
                            }
                        />
                    </Grid>
                </Grid>
            </Paper>

            <Dialog
                open={responseModalState.open}
                onClose={() => { setResponseModalState({ ...responseModalState, open: false }) }}
                aria-describedby="transition-modal-description"
                aria-labelledby="transition-modal-title"
            >

                <DialogTitle id="alert-dialog-slide-title">Add Response Value</DialogTitle>
                <AddResponseValueForm
                    submitResponseValue={
                        (value: string) => {
                            dispatch({
                                type: QuestionSetBuilderActionType.AddResponseValue,
                                payload: value
                            });
                        }
                    }
                />
            </Dialog>
        </DialogContent>

        <DialogActions>
            <Fab
                color="primary"
                aria-label="add"
                size="large"
                className={classes.fab}
                onClick={
                    () => {
                        setResponseModalState({...responseModalState, open: false});
                        props.addQuestionSet({ name: name, questions: state.questions });

                    }
                }
            >
                <AddCircleOutline className={classes.extendedIcon}>
                    Add Question Set
        </AddCircleOutline>
            </Fab>
        </DialogActions>
    </React.Fragment>
};
