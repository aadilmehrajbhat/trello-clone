import { BaseComponentDriver, BaseInputDriver } from '~/tests/drivers';

export default class ColumnTitleDriver extends BaseComponentDriver {
  constructor(parent: HTMLElement, aid = 'board-title') {
    super(parent, aid);
  }

  get title() {
    return new BaseComponentDriver(this.element, 'title');
  }

  get input() {
    return new BaseInputDriver(this.element!, 'input');
  }

  editTitle() {
    this.title.triggerEvent('doubleClick');
  }
}
