
export interface ResponseValue {
    text: string;
};

export interface Question {
    id: string;
    text: string;
    responses: Array<ResponseValue>;
};

export interface QuestionSet {
    name: string;
    questions: Array<Question>;
}