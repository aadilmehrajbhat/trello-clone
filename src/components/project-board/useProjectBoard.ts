import { useCallback, useMemo } from 'react';
import useAppDispatch from '~/hooks/useAppDispatch';
import useAppSelector from '~/hooks/useAppSelector';
import { BoardColumn, selectors } from './projectBoardSlice';
import { boardAdded, boardDeleted } from './projectBoardSlice';

const useProjectBoard = () => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) =>
    selectors.selectAllBoards(state.projectBoard),
  );

  const canDeleteBoard = useMemo(() => boards.length > 1, [boards]);

  const addNewBoard = useCallback(() => {
    dispatch(boardAdded());
  }, [dispatch]);

  const deleteBoard = useCallback(
    (id: BoardColumn['id']) => {
      dispatch(boardDeleted(id));
    },
    [dispatch],
  );

  return {
    boards,
    canDeleteBoard,

    addNewBoard,
    deleteBoard,
  };
};

export default useProjectBoard;
