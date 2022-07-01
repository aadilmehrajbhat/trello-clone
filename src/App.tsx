import '~/theme/index.sass';
import { hot } from 'react-hot-loader';
import Container from '~/components/container';
import ProjectBoard from '~/components/project-board';
import { Provider } from 'react-redux';

import { store } from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Container>
        <ProjectBoard />
      </Container>
    </Provider>
  );
};

export default hot(module)(App);
