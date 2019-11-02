import React from 'react';
import { Typography } from '@material-ui/core';
import { SectionContainer } from '../components/common';
import Layout from './Layout';

export const HomePage = () => {
  return (
    <Layout>
      <SectionContainer>
        <Typography variant="h3">Welcome!</Typography>
        <Typography variant="h5">Shared housing</Typography>
      </SectionContainer>
    </Layout>
  );
};
export default HomePage;
