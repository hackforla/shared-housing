import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  BaseAvatar,
  BaseChip,
  BaseSidebar,
} from '../src/components/Dashboard/Base';

import { UnitCard } from '../src/components/Dashboard/Unit';

storiesOf('Dashboard', module)
  .add('BaseAvatar', () => <BaseAvatar />)
  .add('BaseChip', () => <BaseChip label="Smoker" color="primary" />)
  .add('BaseSidebar', () => <BaseSidebar />)
  .add('UnitCard', () => (
    <UnitCard
      name="Unit 1"
      image="http://lorempixel.com/300/300/"
      address1="123 Happy Lane"
      address2="Los Angeles, CA 90026"
      handicapAccessible
      matches={32}
    />
  ));
