import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  BaseAvatar,
  BaseChip,
  BaseSidebar,
} from '../src/components/Dashboard/Base';
import { UnitCard, UnitListItem } from '../src/components/Dashboard/Unit';
import { TenantList } from '../src/components/Dashboard/Tenant/TenantList';
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
  .add('TenantList', () => (
    <TenantList
      tenants={[
        { name: 'Laurent Veronnez', unitMatch: 66, handicap: 'Yes' },
        { name: 'Chateau Flight', unitMatch: 2, handicap: 'Yes' },
        { name: 'Richie Hawtin', unitMatch: 129, handicap: 'Yes' },
        { name: 'Pepe Bradock', unitMatch: 92, handicap: 'No' },
        { name: 'Ellen Alien', unitMatch: 45, handicap: 'Yes' },
        { name: 'Hazem Beltagui', unitMatch: 10, handicap: 'No' },
        { name: 'Derrick May', unitMatch: 4, handicap: 'Yes' },
        { name: 'Marco Zenker', unitMatch: 61, handicap: 'No' },
        { name: 'Alina Baraz', unitMatch: 1221034201, handicap: 'No' },
        { name: 'Joey Youngman', unitMatch: 18, handicap: 'Yes' },
        { name: 'Brian Transeau', unitMatch: 46, handicap: 'No' },
      ]}
    />
  ))
  .add('ComponentToggler', () => <ComponentToggler options={options} />);
