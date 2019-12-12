import React, { useState } from 'react';
import {useParams} from 'react-router-dom';



export const Results = () => {

    const {id} = useParams();

    const [state, setState] = useState({
        result: {}
    });

    return (
        <div>
            <h2>Results</h2>
            <ul>
                <li>Tenant 1</li>
                <li>Tenant 2</li>
                <li>Tenant 3</li>
            </ul>
        </div>
    );
};