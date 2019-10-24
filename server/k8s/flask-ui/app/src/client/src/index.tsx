import 'babel-polyfill';
import 'whatwg-fetch';
import 'typeface-roboto';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { QuestionSetBuilder } from './components/QuestionSetBuilder';
import { AdminDashboard } from './components/AdminDashboard';

const AppContext = React.createContext({});

export const App = () => {

    console.log('rendering app...');

    return <AppContext.Provider value={{}}>
        <AdminDashboard />
    </AppContext.Provider>
    
}

ReactDOM.render(
    <App />,
    document.getElementById('app-root')
);
