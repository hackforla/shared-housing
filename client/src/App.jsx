import React from 'react';
import { hot } from 'react-hot-loader';
import './styles/main.css';
import Layout from './components/Layout';
import Home from './pages/Home';

const App = () => (
  <Layout>
    <Home />
  </Layout>
);

export default hot(module)(App);
