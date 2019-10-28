import * as React from 'react';
import { CssBaseline, List, ListItem, Paper, Dialog, Button, DialogTitle, DialogActions, DialogContent, TextField } from '@material-ui/core';
import { QuestionSetBuilder } from './QuestionSetBuilder';
import { QuestionSet } from '../models';


export interface AdminDashboardProps {

};

export interface AdminDashboardState {
    questionSets: Array<QuestionSet>;
    addingQuestionSet: boolean;
    newQuestionSetName: string;
};

export enum AdminDashboardActionType {
    AddQuestionSet,
    BeginNewQuestionSet,
    CancelNewQuestionSet,
    ChangeNewQuestionSetName
};

export interface AdminDashboardAction {
    type: AdminDashboardActionType;
    payload?: QuestionSet | string;
}

export const AdminDashboard = (props: AdminDashboardProps) => {

    const reducer = (state: AdminDashboardState, action: AdminDashboardAction) => {
        switch (action.type) {
            case AdminDashboardActionType.AddQuestionSet:
                return {
                    ...state,
                    addingQuestionSet: false,
                    newQuestionSetName: '',
                    questionSets: [
                        ...state.questionSets,
                        action.payload as QuestionSet
                    ]
                };
            case AdminDashboardActionType.BeginNewQuestionSet:
                return {
                    ...state,
                    addingQuestionSet: true
                };
            case AdminDashboardActionType.ChangeNewQuestionSetName:
                return {
                    ...state,
                    newQuestionSetName: action.payload as string
                };
            case AdminDashboardActionType.CancelNewQuestionSet:
                return {
                    ...state,
                    addingQuestionSet: false
                };
            default:
                throw new Error(`Unsupported action: ${JSON.stringify(action)}`);
        }
    };

    const initialState: AdminDashboardState = {
        questionSets: new Array<QuestionSet>(),
        newQuestionSetName: '',
        addingQuestionSet: false
    };

    const [state, dispatch] = React.useReducer(reducer, initialState);

    return <React.Fragment>
        <CssBaseline />
        <Paper>
            <Button onClick={() => { dispatch({ type: AdminDashboardActionType.BeginNewQuestionSet }); }}>Add Question Set</Button>
            <List>
                {
                    state
                        .questionSets
                        .map((questionSet: QuestionSet, index: number) => {
                            return (
                                <ListItem>{questionSet.name} ({questionSet.questions.length} questions)</ListItem>
                            );
                        })
                }
            </List>

            {/*<Dialog
                open={addingQuestionSet}
                onClose={() => { setAddingQuestionSet(false); }}
            >

                <QuestionSetBuilder
                    addQuestionSet={
                        (questionSet: QuestionSet) => {
                            dispatch({
                                type: AdminDashboardActionType.AddQuestionSet,
                                payload: questionSet
                            });
                        }
                    }
                />
                </Dialog>*/}


            <Dialog>
                <DialogTitle>Question Set Name</DialogTitle>
                <DialogContent>

                    <TextField
                        required
                        id="questionSetName"
                        label="ID"
                        helperText="Name of this question set"
                        value={state.newQuestionSetName}
                        onChange={
                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                dispatch({
                                    type: AdminDashboardActionType.ChangeNewQuestionSetName,
                                    payload: event.target.value
                                });
                            }
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { console.log(`adding question set: ${state.newQuestionSetName}`); }}>
                        Create
                </Button>
                    <Button onClick={() => { dispatch({type: AdminDashboardActionType.CancelNewQuestionSet}) }}>
                        Cancel
                </Button>
                </DialogActions>
            </Dialog>


        </Paper>

    </React.Fragment>;
}