import '@testing-library/jest-dom';
import { configure } from '@testing-library/dom';

configure({
  testIdAttribute: 'data-aid',
});

jest.mock('nanoid', () => {
  return { nanoid: () => '1234' };
});
