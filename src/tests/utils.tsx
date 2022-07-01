import { ReactNode, FC, ReactElement } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '../store';

export {
  render,
  renderHook,
  cleanup,
  queryAllByTestId,
  act,
  waitFor,
} from '@testing-library/react';

const AllTheProviders: FC<{ children: ReactNode }> = ({ children }) => (
  <Provider store={createStore()}>{children} </Provider>
);

export const renderWithProviders = (component: ReactElement) => {
  return render(component, {
    wrapper: AllTheProviders,
  });
};
