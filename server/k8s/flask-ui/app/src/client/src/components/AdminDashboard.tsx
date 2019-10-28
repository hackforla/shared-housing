import * as React from 'react';
import { CssBaseline, List, ListItem, Paper, Dialog, Button } from '@material-ui/core';
import { QuestionSetBuilder } from './QuestionSetBuilder';
import { QuestionSet } from '../models';


export interface AdminDashboardProps {

};

export interface AdminDashboardState {
    questionSets: Array<QuestionSet>;
};

export enum AdminDashboardActionType {
    AddQuestionSet
};

export interface AdminDashboardAction {
    type: AdminDashboardActionType;
    payload?: QuestionSet | string | number;
}

export const AdminDashboard = (props: AdminDashboardProps) => {

    const reducer = (state: AdminDashboardState, action: AdminDashboardAction) => {
        switch (action.type) {
            // case AdminDashboardActionType.AddQuestionSet:
            case AdminDashboardActionType.AddQuestionSet:
                return {
                    ...state,
                    questionSets: [
                        ...state.questionSets,
                        action.payload
                    ]
                };
            default:
                throw new Error(`Unsupported action: ${JSON.stringify(action)}`);
        }
    };

    const initialState: AdminDashboardState = {
        questionSets: new Array<QuestionSet>()
    };

    const [state, dispatch] = React.useReducer(reducer, initialState);

    const [addingQuestionSet, setAddingQuestionSet] = React.useState(false);

    return <React.Fragment>
        <CssBaseline />
        <Paper>
            <Button onClick={() => {setAddingQuestionSet(true);}}>Add Question Set</Button>
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

            <Dialog
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
            </Dialog>


        </Paper>

    </React.Fragment>;
}