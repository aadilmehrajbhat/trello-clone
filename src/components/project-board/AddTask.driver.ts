import { BaseComponentDriver, BaseInputDriver } from '~/tests/drivers';

export default class AddTaskDriver extends BaseComponentDriver {
  constructor(parent: HTMLElement, aid = 'add-task') {
    super(parent, aid);
  }

  get add() {
    return new BaseComponentDriver(this.element, 'add-btn');
  }

  get input() {
    return new BaseInputDriver(this.element!, 'input');
  }
}
