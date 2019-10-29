import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

function renderApp() {
  ReactDOM.render(<App />, document.getElementById('root'));
}

renderApp();

module.hot.accept();
