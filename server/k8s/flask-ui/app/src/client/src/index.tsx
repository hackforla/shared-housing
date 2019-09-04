import 'babel-polyfill';
import 'whatwg-fetch';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

export const App = () => {
    return <div>
        <button
            onClick={
                () => {
                    fetch('/add', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            'items': [1,2,3],
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
                    )
                }
            }
        >Add</button>
        <button
            onClick={
                () => {

                    fetch('/insert', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            'items': [1,2,3],
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
                    )
                }
            }
        >Insert</button>
    </div>
}

ReactDOM.render(
    <App />,
    document.getElementById('app-root')
);