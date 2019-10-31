import React from 'react';
import { Typography } from '@material-ui/core';
import { SectionContainer } from '../components/common';

export const HomePage = () => {
  return (
    <SectionContainer>
      <Typography variant="h3">Welcome!</Typography>
      <Typography variant="h5">Shared housing</Typography>
    </SectionContainer>
  );
};
export default HomePage;
