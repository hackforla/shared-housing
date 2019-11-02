import 'babel-polyfill';
import 'whatwg-fetch';
import 'typeface-roboto';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { QuestionSetBuilder } from './components/QuestionSetBuilder';
import { AdminDashboardApp } from './components/AdminDashboardApp';

const AppContext = React.createContext({});

export const App = () => {

    console.log('rendering app...');

    return <AppContext.Provider value={{}}>
        <AdminDashboardApp />
    </AppContext.Provider>
    
}

ReactDOM.render(
    <App />,
    document.getElementById('app-root')
);
