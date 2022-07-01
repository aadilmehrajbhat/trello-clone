import BaseComponentDriver from './BaseComponentDriver';

class BaseInputDriver extends BaseComponentDriver {
  constructor(parent: HTMLElement, aid = 'input') {
    super(parent, aid);
  }

  get value() {
    return (this.element! as HTMLInputElement).value;
  }

  change(value: string) {
    this.triggerEvent('change', { target: { value } });
  }

  submit() {
    this.triggerEvent('submit');
  }
}

export default BaseInputDriver;
