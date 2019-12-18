import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  BaseAvatar,
  BaseChip,
  BaseSidebar,
} from '../src/components/Dashboard/Base';
import { UnitCard, UnitListItem } from '../src/components/Dashboard/Unit';
import { ComponentToggler } from '../src/components/common';

const options = [
  {
    displayName: 'units',
    component: <p> UnitList Component </p>,
  },
  {
    displayName: 'tenants',
    component: <p> TenantList Component </p>,
  },
];

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
  ))
  .add('UnitListItem', () => (
    <UnitListItem
      name="Unit 1"
      address1="123 Happy Lane"
      address2="Los Angeles, CA 90026"
      handicapAccessible
      matches={32}
    />
  ))
  .add('ComponentToggler', () => <ComponentToggler options={options} />);
