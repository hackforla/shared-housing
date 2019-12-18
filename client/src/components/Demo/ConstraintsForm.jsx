import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { ClientApi } from './ClientApi';

export const ConstraintsForm = () => {
  const [state, setState] = useState({
    locationQuestions: [],
    candidateQuestions: [],
    selectedLocationResponseValueId: -1,
    selectedCandidateResponseValueId: -1,
    editingReasonText: false,
    reasonText: '',
  });

  const refreshAll = async () => {
    try {
      console.log(`refreshAll: fetchng newLocationQuestions...`);
      const newLocationQuestions = await ClientApi.getLocationQuestions();
      console.log(
        `refreshAll: ... result: ${JSON.stringify(newLocationQuestions)}`,
      );

      console.log(`refreshAll: fetchng newCandidateQuestions...`);
      const newCandidateQuestions = await ClientApi.getCandidateQuestions();
      console.log(
        `refreshAll: ... result: ${JSON.stringify(newCandidateQuestions)}`,
      );

      setState({
        ...state,
        locationQuestions: newLocationQuestions,
        candidateQuestions: newCandidateQuestions,
      });
    } catch (err) {
      console.log(`error during fetch: ${err}`);
      throw err;
    }
  };

  const commitConstraint = () => {
    console.log(
      `Constraining location rv ${state.selectedLocationResponseValueId} to candidate rv ${state.selectedCandidateResponseValueId}`,
    );
    setState({
      ...state,
      editingReasonText: true,
      reasonText: '',
    });
  };

  useEffect(async () => {
    await refreshAll();
  }, []);

  const reasonTextChanged = event => {
    setState({
      ...state,
      reasonText: event.target.value,
    });
  };

  const submitConstraint = async () => {
    setState({
      ...state,
      editingReasonText: false,
    });

    console.log(`Constraining: `);
    console.log(`- location rv ${state.selectedLocationResponseValueId}`);
    console.log(`- candidate rv ${state.selectedCandidateResponseValueId}`);
    console.log(`- reason: ${state.reasonText}`);

    const responseText = await ClientApi.addRejectedValue({
      locationResponseValueId: state.selectedLocationResponseValueId,
      candidateResponseValueId: state.selectedCandidateResponseValueId,
      reasonText: state.reasonText,
    });
  };

  return (
    <div>
      <h1>Constraints</h1>
      <div
        style={{
          border: '1px solid black',
          margin: '3px',
          padding: '2px',
          borderRadius: '5px',
        }}
      >
        <h2>Location Questions</h2>
        {state.locationQuestions.map((locationQuestion, index) => (
          <div key={index}>
            <h4>{locationQuestion.text}</h4>
            {locationQuestion.responseValues.map(
              (responseValue, responseValueIndex) => (
                <div
                  style={{
                    border: '1px solid black',
                    margin: '2px',
                    padding: '2px',
                    borderRadius: '3px',
                  }}
                  className={
                    responseValue.locationResponseValueId ===
                    state.selectedLocationResponseValueId
                      ? 'sh-clickable selected'
                      : 'sh-clickable'
                  }
                  onClick={() => {
                    setState({
                      ...state,
                      selectedLocationResponseValueId:
                        responseValue.locationResponseValueId,
                    });
                  }}
                  key={responseValueIndex}
                  id={responseValue.locationResponseValueId}
                >
                  {responseValue.text}
                </div>
              ),
            )}
          </div>
        ))}
      </div>
      <div
        style={{
          border: '1px solid black',
          margin: '3px',
          padding: '2px',
          borderRadius: '5px',
        }}
      >
        <h2>Candidate Questions</h2>
        {state.candidateQuestions.map((candidateQuestion, index) => (
          <div key={index}>
            <h4>{candidateQuestion.text}</h4>
            {candidateQuestion.responseValues.map(
              (responseValue, responseValueIndex) => (
                <div
                  style={{
                    border: '1px solid black',
                    margin: '2px',
                    padding: '2px',
                    borderRadius: '3px',
                  }}
                  className={
                    responseValue.candidateResponseValueId ===
                    state.selectedCandidateResponseValueId
                      ? 'sh-clickable selected'
                      : 'sh-clickable'
                  }
                  onClick={() => {
                    setState({
                      ...state,
                      selectedCandidateResponseValueId:
                        responseValue.candidateResponseValueId,
                    });
                  }}
                  key={responseValueIndex}
                  id={responseValue.candidateResponseValueId}
                >
                  {responseValue.text}
                </div>
              ),
            )}
          </div>
        ))}
      </div>
      <button onClick={commitConstraint}>Create Constraint!</button>
      {state.editingReasonText ? (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            background: 'rgba(0, 0, 0, 0.15)',
          }}
        >
          <div
            className="modal"
            style={{
              position: 'absolute',
              background: '#fff',
              top: 25,
              left: '10%',
              right: '10%',
              padding: 15,
              border: '2px solid #444',
            }}
          >
            <h3>New Constraint</h3>
            Enter a reason for this constraint:{' '}
            <input type="text" onChange={reasonTextChanged} />
            <button onClick={submitConstraint}>Submit</button>
            <button
              onClick={() => {
                setState({ ...state, editingReasonText: false });
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
