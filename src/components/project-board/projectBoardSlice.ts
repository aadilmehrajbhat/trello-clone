import {
  createSlice,
  createEntityAdapter,
  EntityState,
} from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export interface BoardColumn {
  id: string;
  title: string;
  newTask: string;
  tasks: { id: string; text: string }[];
}

const defaultId = nanoid();

const createNewTask = ({
  id = nanoid(),
  text,
}: {
  id?: string;
  text: string;
}) => ({ id, text });

const createNewBoard = (id: string = nanoid()): BoardColumn => ({
  id,
  title: 'Title',
  newTask: '',
  tasks: [],
});

const initialState: EntityState<BoardColumn> = {
  ids: [defaultId],
  entities: { [defaultId]: createNewBoard(defaultId) },
};

const projectBoardAdapter = createEntityAdapter<BoardColumn>({
  selectId: (board) => board.id,
});

export const projectBoardSlice = createSlice({
  name: 'project-board',
  initialState: projectBoardAdapter.getInitialState(initialState),
  reducers: {
    boardAdded(state) {
      projectBoardAdapter.addOne(state, createNewBoard());
    },
    boardUpdated: projectBoardAdapter.updateOne,
    boardDeleted: projectBoardAdapter.removeOne,
    taskAdded: (state, action) => {
      const { id } = action.payload;

      const board = state.entities[id];

      if (board && board.newTask) {
        board.tasks.push(createNewTask({ text: board.newTask }));
        board.newTask = '';
      }

      return state;
    },

    taskDeleted: (state, action) => {
      const { id, taskId } = action.payload;

      const board = state.entities[id];

      if (board) {
        board.tasks = board.tasks.filter((task) => task.id !== taskId);
      }

      return state;
    },

    taskUpdated: (state, action) => {
      const { id, taskId, text } = action.payload;

      const board = state.entities[id];

      if (board) {
        board.tasks = board.tasks.map((task) => {
          if (task.id === taskId) {
            task.text = text;
          }

          return task;
        });
      }

      return state;
    },

    taskMoved: (state, action) => {
      const { sourceBoardId, taskId, targetBoardId } = action.payload;

      const sourceBoard = state.entities[sourceBoardId];
      const targetBoard = state.entities[targetBoardId];

      const taskIndex =
        sourceBoard?.tasks.findIndex((task) => task.id === taskId) ?? -1;

      if (taskIndex !== -1) {
        const task = sourceBoard?.tasks[taskIndex];
        sourceBoard?.tasks.splice(taskIndex, 1);
        targetBoard?.tasks.push(task!);
      }

      return state;
    },
  },
});

export const {
  boardAdded,
  boardUpdated,
  boardDeleted,
  taskAdded,
  taskDeleted,
  taskUpdated,
  taskMoved,
} = projectBoardSlice.actions;

const { selectById: selectBoardById, selectAll: selectAllBoards } =
  projectBoardAdapter.getSelectors();

export const selectors = { selectBoardById, selectAllBoards };

export default projectBoardSlice.reducer;
