import { BaseComponentDriver, BaseInputDriver } from '~/tests/drivers';
import { queryAllByTestId } from '~/tests/utils';
import ColumnTitleDriver from './ColumnTitle.driver';
import AddTaskDriver from './AddTask.driver';
import TaskItemDriver from './TaskInput.driver';

export default class BoardColumnDriver extends BaseComponentDriver {
  constructor(parent: HTMLElement, aid: string | null = 'board-column') {
    super(parent, aid);
  }

  get title() {
    return new ColumnTitleDriver(this.element);
  }

  get addTask() {
    return new AddTaskDriver(this.element);
  }

  get taskItem() {
    const taskItems = queryAllByTestId(this.element, 'task-item');

    return {
      length: taskItems.length,
      at(i: number) {
        return new TaskItemDriver(taskItems[i], null);
      },
    };
  }

  get deleteBoard() {
    return new BaseComponentDriver(this.element, 'delete-board');
  }
}
