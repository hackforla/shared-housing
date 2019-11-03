import React from 'react';
import { storiesOf } from '@storybook/react';
import Error404 from '../src/pages/Error404';
import { NewsFeed } from '../src/components/common';

storiesOf('Pages', module)
  .add('Error404', () => <Error404 />)
  .add('NewsFeed', () => <NewsFeed />);
