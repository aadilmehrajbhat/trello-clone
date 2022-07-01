import { BaseComponentDriver } from '~/tests/drivers';

export default class ButtonDriver extends BaseComponentDriver {
  constructor(parent: HTMLElement, aid = 'button') {
    super(parent, aid);
  }
}
