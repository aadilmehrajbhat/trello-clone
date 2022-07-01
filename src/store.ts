import { configureStore } from '@reduxjs/toolkit';
import { reducer as projectBoardReducer } from '~/components/project-board';

export const createStore = () =>
  configureStore({
    reducer: {
      projectBoard: projectBoardReducer,
    },
  });

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
