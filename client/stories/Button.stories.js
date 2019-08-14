import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button } from '../src/components/common';

const actions = {
  onClick: action('clicked'),
};

storiesOf('Button', module)
  .add('Default', () => <Button text="Generic Button" {...actions} />)
  .add('Primary', () => (
    <Button text="Primary Button" color="primary" {...actions} />
  ))
  .add('Secondary', () => (
    <Button text="Secondary Button" color="secondary" {...actions} />
  ))
  .add('Disabled', () => (
    <Button text="Disabled Button" disabled {...actions} />
  ));
