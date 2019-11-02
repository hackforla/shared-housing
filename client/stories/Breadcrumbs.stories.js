import React from 'react';
import { storiesOf } from '@storybook/react';

import { Breadcrumbs } from '../src/components/common/Breadcrumbs';

const actions = {
  handleClick: event => {
    event.preventDefault();
    alert(`${event.target} link clicked!`);
  },
};

storiesOf('Breadcrumbs', module).add('Default', () => (
  <Breadcrumbs {...actions} />
));
