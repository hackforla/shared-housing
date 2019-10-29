import * as React from 'react';

import { Container, Paper, Slide, TextField, Button, List, ListItem, ListItemText, Grid } from '@material-ui/core';
import { QuestionSet, Question } from '../models';
import { makeStyles } from '@material-ui/styles';
import { QuestionBuilder } from './QuestionBuilder';

const useStyles = makeStyles({
    root: {
        background: '#66bb6a',
        paddingTop: '4rem',
        paddingBottom: '4rem'
    },
    light: {
        background: '#98ee99'
    },
    dark: {
        background: '#338a3e'
    }
});

export enum QuestionBuilderPhase {
    Name,
    QuestionList,
    AddQuestion,
    AddResponseValues
};

export interface QuestionnaireBuilderProps {
    submitQuestionSet: (set: QuestionSet) => void;
};

export interface QuestionnaireBuilderState {
    phase: QuestionBuilderPhase;
    questionSet: QuestionSet;
};

export enum QuestionnaireBuilderActionType {
    EnterName,
    AddQuestion,
    AddResponseValue,
    CompleteQuestion,
    ChangeNameValue
};

export interface QuestionnaireBuilderAction {
    type: QuestionnaireBuilderActionType;
    payload?: string | Question;
};

export const QuestionnaireBuilder = (props: QuestionnaireBuilderProps) => {
    const classes = useStyles({});

    const initialState: QuestionnaireBuilderState = {
        phase: QuestionBuilderPhase.Name,
        questionSet: { questions: [], name: '' } as QuestionSet
    };

    const reducer = (state: QuestionnaireBuilderState, action: QuestionnaireBuilderAction): QuestionnaireBuilderState => {
        switch (action.type) {
            case QuestionnaireBuilderActionType.EnterName:
                return {
                    ...state,
                    phase: QuestionBuilderPhase.QuestionList
                };
            case QuestionnaireBuilderActionType.AddQuestion:
                return {
                    ...state,
                    phase: QuestionBuilderPhase.AddQuestion
                };
            case QuestionnaireBuilderActionType.AddResponseValue:
                return {
                    ...state
                };
            case QuestionnaireBuilderActionType.CompleteQuestion:
                return {
                    ...state,
                    questionSet: {
                        ...state.questionSet,
                        questions: [...state.questionSet.questions, action.payload as Question]
                    }
                };
            case QuestionnaireBuilderActionType.ChangeNameValue:
                return {
                    ...state,
                    questionSet: {
                        ...state.questionSet,
                        name: action.payload as string
                    }
                };
            default:
                throw new Error(`Unsupported action: ${JSON.stringify(action)}`);
        }
    };

    const [state, dispatch] = React.useReducer(reducer, initialState);

    const nameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: QuestionnaireBuilderActionType.ChangeNameValue,
            payload: event.target.value
        });
    };

    const nameConfirmed = () => {
        dispatch({
            type: QuestionnaireBuilderActionType.EnterName
        });
    };

    const addQuestion = () => {
        dispatch({
            type: QuestionnaireBuilderActionType.AddQuestion
        });
    };

    const submitQuestion = (question: Question) => {
        dispatch({
            type: QuestionnaireBuilderActionType.CompleteQuestion,
            payload: question
        });
    };

    const mapQuestionToListItem = (question: Question, index: number) => <ListItem key={index}>
        <ListItemText>{question.text}</ListItemText>
    </ListItem>;

    return (
        <React.Fragment>
            <Slide direction='left' in={state.phase === QuestionBuilderPhase.Name} mountOnEnter unmountOnExit>
                <Paper className={classes.root}>
                    <Grid container>
                        <Grid item md={12}>
                            <TextField
                                required
                                id="setName"
                                label="Question List Name"
                                helperText="Unique name for this set of questions"
                                value={state.questionSet.name}
                                onChange={nameChanged}
                            />
                        </Grid>
                        <Grid item md={12}>
                            <Button className={classes.dark} onClick={nameConfirmed}>CONFIRM</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Slide>
            <Slide direction='left' in={state.phase === QuestionBuilderPhase.QuestionList} mountOnEnter unmountOnExit>
                <Paper className={classes.root}>
                    <Grid container>
                        <Grid item md={12}>
                            <h2>{state.questionSet.name}</h2>
                        </Grid>
                        <Grid item md={12}>
                            <Button className={classes.dark} onClick={addQuestion}>Add Question</Button>
                        </Grid>
                        <Grid item md={12}>
                            <List>{state.questionSet.questions.map(mapQuestionToListItem)}</List>
                        </Grid>
                    </Grid>
                </Paper>
            </Slide>
            <Slide direction='left' in={state.phase === QuestionBuilderPhase.AddQuestion} mountOnEnter unmountOnExit>
                <Paper className={classes.root}>
                    <QuestionBuilder onQuestionSubmit={submitQuestion} />
                </Paper>
            </Slide>

        </React.Fragment>
    );
};