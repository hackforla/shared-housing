import 'babel-polyfill';
import 'whatwg-fetch';

import * as React from 'react';
import * as ReactDOM from 'react-dom';


export const App = () => {

    const addClient = async () => await fetch(
        '/add',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'items': [1, 2, 3],
                'album': 'Abbey Road'
            })
        }).then(
            (response: Response) => {
                console.log(`got response: ${response.statusText}`);
                return response.json();
            }
        ).then(
            (parsedResponse: any) => {
                console.log(`parsed response: ${JSON.stringify(parsedResponse)}`);
            }
        );


    const updateClient = async () => await fetch(
        '/update',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'items': [1, 2, 3],
                'album': 'Abbey Road'
            })
        }).then(
            (response: Response) => {
                console.log(`got response: ${response.statusText}`);
                return response.json();
            }
        ).then(
            (parsedResponse: any) => {
                console.log(`parsed response: ${JSON.stringify(parsedResponse)}`);
            }
        );

    return <div>
        <button
            onClick={
                async () => {
                    const response = await addClient();
                }
            }
        >Add</button>
        <button
            onClick={
                async () => {
                    const response = await updateClient();
                }
            }
        >Update</button>
    </div>
}

ReactDOM.render(
    <App />,
    document.getElementById('app-root')
);
