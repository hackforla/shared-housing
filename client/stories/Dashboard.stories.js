import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  BaseAvatar,
  BaseChip,
  BaseSidebar,
} from '../src/components/Dashboard/Base';

storiesOf('Dashboard', module)
  .add('BaseAvatar', () => <BaseAvatar />)
  .add('BaseChip', () => <BaseChip label="Smoker" color="primary" />)
  .add('BaseSidebar', () => <BaseSidebar />);
