import { queryAllByTestId } from '~/tests/utils';
import { BaseComponentDriver } from '~/tests/drivers';
import BoardColumnDriver from './BoardColumn.driver';

export default class ProjectBoardDriver extends BaseComponentDriver {
  constructor(parent: HTMLElement, aid = 'project-board') {
    super(parent, aid);
  }

  get board() {
    const boards = queryAllByTestId(this.element, 'board-column');

    return {
      length: boards.length,
      at(i: number) {
        return new BoardColumnDriver(boards[i], null);
      },
    };
  }

  get addBoard() {
    return new BaseComponentDriver(this.element, 'add-board');
  }
}
