import type { Preview } from '@storybook/react';
import { withTests } from '@storybook/addon-jest';

import results from '../.jest-test-results.json';

export const decorators = [
  withTests({
    results,
  }),
];

const preview: Preview = {
  parameters: {
    a11y: {
      element: '#storybook-root',
      config: {
        rules: [
          {
            id: 'autocomplete-valid',
            selector: '*:not([autocomplete="nope"])',
          },
          {
            id: 'image-alt',
            enabled: true,
          },
        ],
      },
      options: {},
      manual: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
