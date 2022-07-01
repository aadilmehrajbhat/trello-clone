import { queryByTestId, prettyDOM, fireEvent } from '@testing-library/react';

class BaseComponentDriver {
  parent: HTMLElement;
  aid: string | null;
  constructor(parent: HTMLElement, aid: string | null = null) {
    this.parent = parent;
    this.aid = aid;
  }

  get element() {
    return this.aid ? queryByTestId(this.parent, this.aid)! : this.parent;
  }

  get exists() {
    return !!this.element;
  }

  get text() {
    return this.element!.textContent;
  }

  get disabled() {
    if (
      this.element instanceof HTMLInputElement ||
      this.element instanceof HTMLButtonElement
    ) {
      return this.element.disabled;
    }

    return false;
  }

  focus() {
    this.element!.focus();
  }

  blur() {
    // this.element!.blur();
    fireEvent.focusOut(this.element);
  }

  click() {
    fireEvent.click(this.element!);
  }

  debug() {
    console.log(this.toString());
  }

  triggerEvent(
    type: 'click' | 'doubleClick' | 'change' | 'submit',
    data?: any,
  ) {
    fireEvent[type](this.element!, data);
  }

  getAttribute(attribute: string) {
    return this.element!.getAttribute(attribute);
  }
}

BaseComponentDriver.prototype.toString = function () {
  return `${this.constructor.name} ${
    this.aid ? `(aid: ${this.aid})` : ''
  }:\n${prettyDOM(this.element!)}`;
};

export default BaseComponentDriver;
