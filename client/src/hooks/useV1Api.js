import { useReducer } from 'react';

const apiUrlsV1 = {
  candidates: '/api/v1/candidates',
  forms: '/api/v1/forms',
  locations: '/api/v1/locations',
  locationResponses: '/api/v1/locationResponses',
  questions: '/api/v1/questions',
  locationQuestions: '/api/v1/locationQuestions',
  candidateQuestions: '/api/v1/candidateQuestions',
  responses: '/api/v1/responses',
};

export const actionTypes = {
  submitResponse: 'submitResponse',
};

export const getCandidateQuestions = async () => {
  return await fetch(apiUrlsV1.questions);
};

export const postCandidateResponse = async response => {
  return await fetch(apiUrlsV1.responses, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(response),
  });
};

export const getLocationQuestions = async () => {
  return await fetch(apiUrlsV1.locationQuestions);
};

export const postLocationResponse = async response => {
  return await fetch(apiUrlsV1.locationResponses, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(response),
  });
};

export const useApiV1Reducer = () => {
  const initialState = {
    question: '',
    submittingResponse: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case actionTypes.submitResponseBegin:
        return {
          ...state,
          submittingResponse: true,
        };
      case actionTypes.submitResponseComplete:
        return {
          ...state,
          submittingResponse: false,
        };
      default:
        throw new Error(`Unsupprted action: ${JSON.stringify(action)}`);
    }
  };

  return useReducer(reducer, initialState);
};
