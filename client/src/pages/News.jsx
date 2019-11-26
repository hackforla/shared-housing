import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SectionContainer, NewsFeed } from '../components/common';

const useStyles = makeStyles(() => ({
  title: {
    margin: '20px 0',
    textDecoration: 'underline',
  },
}));

export const NewsPage = () => {
  const classes = useStyles();
  return (
    <SectionContainer>
      <Typography variant="h6" className={classes.title}>
        Development Changelog
      </Typography>
      <NewsFeed />
    </SectionContainer>
  );
};

export default NewsPage;
