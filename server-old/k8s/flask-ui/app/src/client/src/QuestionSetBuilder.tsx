import * as React from 'react';

export interface QuestionSetBuilderProps {

};

export enum QuestionSetBuilderActionType {
    AddQuestion,
    QuestionTextChanged
};

export interface QuestionSetBuilderAction {
    type: QuestionSetBuilderActionType;
    payload: string
};

export interface QuestionSetBuilderState {
    currentQuestionText: string;
    questions: Array<string>;
}



export const QuestionSetBuilder = (props: QuestionSetBuilderProps) => {

    const reducer = (state: QuestionSetBuilderState, action: QuestionSetBuilderAction) => {
        switch (action.type) {
            case QuestionSetBuilderActionType.AddQuestion:
                return {
                    ...state,
                    questions: [...state.questions, action.payload]
                };
            case QuestionSetBuilderActionType.QuestionTextChanged:
                return {
                    ...state,
                    currentQuestionText: action.payload
                };
            default:
                throw new Error(`Unsupported action type: ${action.type}`);
        }
    };

    const [state, dispatch] = React.useReducer(reducer, {} as QuestionSetBuilderState);

    return <div>
        <form onSubmit={(event: React.FormEvent) => { event.preventDefault(); }}>
            <input onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch({
                    type: QuestionSetBuilderActionType.QuestionTextChanged,
                    payload: event.target.value
                });
            }} />
        </form>
        <button onClick={
            () => {
                dispatch({
                    type: QuestionSetBuilderActionType.AddQuestion,
                    payload: state.currentQuestionText
                })
            }
        }>Add Question</button>
        <ol>
            {
                state.questions.map(
                    (question: string, index: number) => <li key={index}>
                        {question}
                    </li>
                )
            }

        </ol>
    </div>
};