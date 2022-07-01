import { BaseComponentDriver, BaseInputDriver } from '~/tests/drivers';

export default class TaskItemDriver extends BaseComponentDriver {
  constructor(parent: HTMLElement, aid: string | null = 'task-item') {
    super(parent, aid);
  }

  get input() {
    return new BaseInputDriver(this.element, 'edit-input');
  }

  get task() {
    return new BaseComponentDriver(this.element, 'task');
  }

  get edit() {
    return new BaseComponentDriver(this.element, 'edit-task');
  }

  get delete() {
    return new BaseComponentDriver(this.element, 'delete-task');
  }
}
