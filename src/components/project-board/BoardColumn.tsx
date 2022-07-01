import { FC } from 'react';
import Card from '~/components/card';
import Button from '~/components/button';

import ColumnTitle from './ColumnTitle';
import TaskItem from './TaskItem';
import AddTask from './AddTask';
import type { BoardColumn as BoardColumnType } from './projectBoardSlice';
import useBoardColumn from './useBoardColumn';
import useProjectBoard from './useProjectBoard';

type BoardColumnProps = {
  board: BoardColumnType;
};

const BoardColumn: FC<BoardColumnProps> = ({ board }) => {
  const { canDeleteBoard, deleteBoard } = useProjectBoard();
  const { updateBoardData, addNewTask, deleteTask, updateTask, moveTask } =
    useBoardColumn(board.id);

  return (
    <Card
      data-aid="board-column"
      className="board-column"
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();
        const [taskId, sourceBoardId] = [
          e.dataTransfer.getData('taskId'),
          e.dataTransfer.getData('boardId'),
        ];

        moveTask({ taskId, sourceBoardId });
      }}
    >
      <ColumnTitle
        title={board.title}
        onTitleChange={updateBoardData('title')}
      />

      {board.tasks.map((task) => (
        <TaskItem
          id={task.id}
          boardId={board.id}
          key={task.id}
          task={task.text}
          onTaskChange={(text) => updateTask({ id: task.id, text })}
          onTaskDeleteClick={() => deleteTask(task.id)}
        />
      ))}

      <AddTask
        task={board.newTask}
        onTaskChange={updateBoardData('newTask')}
        onAddTaskClick={addNewTask}
      />
      <Button
        data-aid="delete-board"
        className="board-column__delete"
        color="accent"
        onClick={() => deleteBoard(board.id)}
        disabled={!canDeleteBoard}
      >
        Delete
      </Button>
    </Card>
  );
};

export default BoardColumn;
