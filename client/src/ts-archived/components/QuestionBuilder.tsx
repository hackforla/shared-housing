import * as React from 'react';
import { Container, TextField, Button, Grid } from '@material-ui/core';
import { Question, ResponseValue } from '../models';

export interface QuestionBuilderProps {
    onQuestionSubmit: (question: Question) => void;
};

export interface QuestionBuilderState {
    question: Question;
    addingResponseValue: boolean;
    currentResponseValue: string;
};

export enum QuestionBuilderActionType {
    ChangeQuestionText,
    AddNewResponseValue,
    ChangeCurrentResponseValue,
    ConfirmCurrentResponseValue,
    SubmitQuestion
};

export interface QuestionBuilderAction {
    type: QuestionBuilderActionType;
    payload?: string;
};

export const QuestionBuilder = (props: QuestionBuilderProps) => {

    const reducer = (state: QuestionBuilderState, action: QuestionBuilderAction): QuestionBuilderState => {
        switch (action.type) {
            case QuestionBuilderActionType.ChangeQuestionText:
                return {
                    ...state,
                    question: {
                        ...state.question,
                        text: action.payload
                    }
                };
            case QuestionBuilderActionType.ChangeQuestionText:
                return {
                    ...state,
                    question: {
                        ...state.question,
                        text: action.payload
                    }
                };
            case QuestionBuilderActionType.SubmitQuestion:
                return {
                    ...state,
                    question: {
                        ...state.question,
                        text: '',
                        responses: []
                    },
                    addingResponseValue: false,
                    currentResponseValue: ''
                };
            default:
                throw new Error(`Unsupported action: ${JSON.stringify(action)}`);
        }
    };

    const initialState: QuestionBuilderState = {
        question: {
            id: null,
            text: '',
            responses: [] as Array<ResponseValue>
        },
        addingResponseValue: false,
        currentResponseValue: ''
    };

    const [state, dispatch] = React.useReducer(reducer, initialState);

    const questionTextChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: QuestionBuilderActionType.ChangeQuestionText,
            payload: event.target.value
        });
    };

    const submitQuestion = () => {
        props.onQuestionSubmit({ ...state.question });
        dispatch({
            type: QuestionBuilderActionType.SubmitQuestion
        });
    };

    return (
        <React.Fragment>
            <Grid container>
                <Grid item md={12}>
                    <TextField
                        required
                        id="questionText"
                        label="Question Text"
                        helperText="What is the question?"
                        value={state.question.text}
                        onChange={questionTextChanged}
                    />
                </Grid>
                <Grid item md={12}>
                    <Button onClick={submitQuestion}>Submit Question</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};