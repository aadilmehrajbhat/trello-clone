import IconButton from '~/components/icon-button';
import BoardColumn from './BoardColumn';
import useProjectBoard from './useProjectBoard';

const ProjectBoard = () => {
  const { boards, addNewBoard } = useProjectBoard();

  return (
    <div data-aid="project-board" className="project-board">
      {boards.map((board) => (
        <BoardColumn key={board.id} board={board} />
      ))}
      <IconButton
        data-aid="add-board"
        className="project-board__add-board"
        icon="add"
        onClick={addNewBoard}
        width={24}
        height={24}
      >
        Add
      </IconButton>
    </div>
  );
};

export default ProjectBoard;
