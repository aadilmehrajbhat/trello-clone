import { FC } from 'react';
import Input from '~/components/input';
import IconButton from '~/components/icon-button';

type AddTaskProps = {
  task: string;
  onTaskChange: (task: string) => void;
  onAddTaskClick: () => void;
};

const AddTask: FC<AddTaskProps> = ({ task, onTaskChange, onAddTaskClick }) => (
  <div data-aid="add-task" className="add-task">
    <Input
      data-aid="input"
      placeholder="Add Task"
      value={task}
      onChange={(e) => onTaskChange(e.target.value)}
    />
    <IconButton data-aid="add-btn" icon="add" onClick={onAddTaskClick} />
  </div>
);

export default AddTask;
