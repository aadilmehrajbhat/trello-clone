import { useRef, useState, useEffect, FC } from 'react';
import Card from '~/components/card';
import Input from '~/components/input';
import IconButton from '~/components/icon-button';

type TaskItemProps = {
  id: string;
  boardId: string;
  task: string;
  onTaskChange: (task: string) => void;
  onTaskDeleteClick: () => void;
};

const TaskItem: FC<TaskItemProps> = ({
  id,
  boardId,
  task,
  onTaskChange,
  onTaskDeleteClick,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [editable, setEditable] = useState<boolean>(false);

  useEffect(() => {
    if (editable) {
      inputRef.current?.focus();
    }
  }, [editable]);

  return (
    <Card
      data-aid="task-item"
      className="task-item"
      draggable="true"
      onDragStart={(e) => {
        e.dataTransfer.setData('taskId', id);
        e.dataTransfer.setData('boardId', boardId);
      }}
    >
      {editable ? (
        <Input
          data-aid="edit-input"
          type="text"
          ref={inputRef}
          className="task-item__input"
          placeholder="Edit task"
          value={task}
          onChange={(e) => onTaskChange(e.target.value)}
          onBlur={() => setEditable(false)}
        />
      ) : (
        <>
          <h3 data-aid="task" className="task-item__text">
            {task}
          </h3>
          <div className="task-item__actions">
            <IconButton
              data-aid="edit-task"
              className="task-item__edit"
              icon="edit-pen"
              onClick={() => setEditable(true)}
            />
            <IconButton
              data-aid="delete-task"
              className="task-item__delete"
              icon="cancel"
              onClick={() => onTaskDeleteClick()}
            />
          </div>
        </>
      )}
    </Card>
  );
};

export default TaskItem;
