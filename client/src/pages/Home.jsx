import React from 'react';
import { Typography } from '@material-ui/core';
import { SectionContainer, NewsFeed } from '../components/common';
import Layout from './Layout';

export const HomePage = () => {
  return (
    <Layout>
      <SectionContainer>
        <Typography variant="h3">Welcome!</Typography>
        <Typography variant="h5">Shared housing</Typography>
      </SectionContainer>
      <SectionContainer>
        <Typography variant="h6">Development Changelog</Typography>
        <NewsFeed />
      </SectionContainer>
    </Layout>
  );
};
export default HomePage;
