import { useCallback, useMemo } from 'react';
import useAppDispatch from '~/hooks/useAppDispatch';

import {
  BoardColumn,
  boardUpdated,
  taskAdded,
  taskDeleted,
  taskMoved,
  taskUpdated,
} from './projectBoardSlice';

const useBoardColumn = (id: string) => {
  const dispatch = useAppDispatch();

  const updateBoardData = useCallback(
    (key: keyof Partial<Pick<BoardColumn, 'newTask' | 'title'>>) =>
      (value: BoardColumn[typeof key]) =>
        dispatch(boardUpdated({ id, changes: { [key]: value } })),
    [dispatch, id],
  );

  const addNewTask = useCallback(
    () => dispatch(taskAdded({ id })),
    [dispatch, id],
  );

  const deleteTask = useCallback(
    (taskId: BoardColumn['tasks'][0]['id']) =>
      dispatch(taskDeleted({ id, taskId })),
    [dispatch, id],
  );

  const updateTask = useCallback(
    (task: BoardColumn['tasks'][0]) =>
      dispatch(taskUpdated({ id, taskId: task.id, text: task.text })),
    [dispatch, id],
  );

  const moveTask = useCallback(
    ({
      taskId,
      sourceBoardId,
    }: {
      taskId: BoardColumn['tasks'][0]['id'];
      sourceBoardId: BoardColumn['id'];
    }) => dispatch(taskMoved({ taskId, sourceBoardId, targetBoardId: id })),
    [dispatch, id],
  );

  return {
    updateBoardData,
    addNewTask,
    deleteTask,
    updateTask,
    moveTask,
  };
};

export default useBoardColumn;
