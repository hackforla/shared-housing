import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const Results = () => {

    const [state, setState] = React.useState({
        units: [],
        candidatesByUnit: {}
    });

    const fetchUnits = async () => await fetch('/api/v1/locations')
        .then((response) => {
            if (response.status !== 200) {
                throw new Error(`fetchUnits: HTTP response status: ${response.statusText}`);
            } else {
                return response.json();
            }
        })
        .catch((err) => {
            console.log(`fetchUnits: Error: ${err}`);
            throw err;
        });

    const refreshUnits = async () => {
        try {
            let newState = { ...state };

            const freshUnits = await fetchUnits();
            console.log(`freshUnits =  ${JSON.stringify(freshUnits)}`);
            newState.units = freshUnits;

            for (let i in freshUnits) {
                const unit = freshUnits[i];
                const candidates = await getMatchesForLocation(unit.locationId);
                console.log(`back from getMatchesForLocation(${unit.locationId}): ${JSON.stringify(candidates)}`);
                newState.candidatesByUnit[unit.locationId] = candidates;                
            }
            setState(newState);
            // setState({
            //     ...state,
            //     units: freshUnits
            // });
        } catch (err) {
            // TODO: show a modal with error details here?
                console.log(`refreshUnits: Error: ${err}`);
            throw err;
        }
    };

    const getMatchesForLocation = async (locationId) => {
        console.log(`getMatchesForLocation: locationId = ${locationId}`);
        return await fetch(`/api/v1/locationcandidates/${locationId}`)
            .then((response) => {
                console.log(`getMatchesForLocation: response.statusText = ${response.statusText}`);
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw response.statusText;
                }
            })
            .catch((e) => {
                console.log(`getMatchesForLocation: Error: ${e}`);
                throw new Error(e);
            });
    };

    useEffect(() => {
        console.log(`useEffect: refreshUnits starting`);
        refreshUnits();
        console.log(`useEffect: refreshUnits complete`);
    }, []);

    // useEffect(async () => {
    //     console.log(`useEffect[units]: about to iterate ${state.units.length} units`);
    //     try {
    //         for (let i in state.units) {
    //             const unit = state.units[i];
    //             const candidates = await getMatchesForLocation(unit.locationId);
    //             console.log(`back from getMatchesForLocation(${unit.locationId}): ${JSON.stringify(candidates)}`);
    //             let newState = { ...state };
    //             newState.candidatesByUnit[unit.locationId] = candidates;
    //             setState(newState);
    //         }
    //     } catch (e) {
    //         console.log(`useEffect[units]: Error: ${e}`);
    //         throw e;
    //     }
    // }, [state.units]);

    const mapUnitsToRows = (unit, unitIndex) => {
        console.log(`- rendering unit: ${JSON.stringify(unit)}`);
        return (
            <div key={unitIndex}>
                <h5>{unit.name}</h5>
                {
                    (() => {
                        const locationInMap = (unit.locationId in state.candidatesByUnit);
                        console.log(`locationInMap = ${locationInMap}`);
                        if(!locationInMap){
                            return <p>No candidates</p>;
                        }
                        const hasCandidates = (state.candidatesByUnit[unit.locationId].length > 0);
                        if(!hasCandidates){
                            return <p>No candidates</p>;
                        }

                        console.log(`hasCandidates = ${hasCandidates}`);
                        return locationInMap && hasCandidates
                        ? state.candidatesByUnit[unit.locationId].map(mapCandidatesToListItems)
                        : <p>No candidates</p>;
                    })()
                }
            </div>
        );
    };

    const mapCandidatesToListItems = (candidate, candidateIndex) => {
        console.log(`--- rendering candidate: ${JSON.stringify(candidate)}`);
        return (
            <div key={candidateIndex}>
                {candidate.name}
            </div>
        );
    };


    return (
        <div>
            <h2>Results</h2>
            <div>
                {
                    state.units.map(mapUnitsToRows)
                }
            </div>
        </div>
    );
};