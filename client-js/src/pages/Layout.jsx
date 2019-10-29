import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import MainNav from '../components/MainNav';

const Layout = ({ children }) => (
  <Fragment>
    <MainNav />
    {children}
  </Fragment>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
