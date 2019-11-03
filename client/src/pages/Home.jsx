import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SectionContainer, NewsFeed } from '../components/common';
import Status from '../components/Home/Status';
import Concept from '../components/Home/Concept';
import Record from '../components/Home/Record';
import UserJourneys from '../components/Home/UserJourneys';
import { Typography } from '@material-ui/core';
import Layout from './Layout';

const useStyles = makeStyles(() => ({
  divider: {
    margin: '35px 0',
    border: '0',
    borderTop: '1px solid rgba(0,0,0,.1)',
  },
}));

export const HomePage = () => {
  const classes = useStyles();
  return (
    <Layout>
      <SectionContainer>
        <Status />
        <hr className={classes.divider} />
        <Concept />
        <hr className={classes.divider} />
        <Record />
        <hr className={classes.divider} />
        <UserJourneys />
      </SectionContainer>
      <SectionContainer>
        <Typography variant="h6">Development Changelog</Typography>
        <NewsFeed />
      </SectionContainer>
    </Layout>
  );
};

export default HomePage;
