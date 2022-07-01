import { renderWithProviders, cleanup, waitFor } from '~/tests/utils';

import ProjectBoard from './ProjectBoard';
import ProjectBoardDriver from './ProjectBoard.driver';

describe('<ProjectBoard />', () => {
  const renderComponent = ({}: {
    title?: string;
    onTitleChange?: () => void;
  } = {}) => {
    const { baseElement } = renderWithProviders(<ProjectBoard />);

    return {
      driver: new ProjectBoardDriver(baseElement),
    };
  };

  afterEach(cleanup);

  it('should render', () => {
    const { driver } = renderComponent();

    expect(driver.exists).toBe(true);
  });

  describe('board', () => {
    it('should render default board', () => {
      const { driver } = renderComponent();

      expect(driver.board.length).toBe(1);
    });

    describe('title', () => {
      it('should render ', () => {
        const { driver } = renderComponent();

        expect(driver.board.at(0).title.exists).toBe(true);
      });

      it('should render correct default text', () => {
        const { driver } = renderComponent();

        expect(driver.board.at(0).title.text).toBe('Title');
      });
    });

    describe('add task', () => {
      it('should render ', () => {
        const { driver } = renderComponent();

        expect(driver.board.at(0).addTask.exists).toBe(true);
      });

      describe('input', () => {
        it('should render ', () => {
          const { driver } = renderComponent();

          expect(driver.board.at(0).addTask.input.exists).toBe(true);
        });

        it('should be empty ', () => {
          const { driver } = renderComponent();

          expect(driver.board.at(0).addTask.input.value).toBe('');
        });

        it('should update the value', () => {
          const { driver } = renderComponent();

          expect(driver.board.at(0).addTask.input.value).toBe('');
          driver.board.at(0).addTask.input.change('Italian buffet');
          expect(driver.board.at(0).addTask.input.value).toBe('Italian buffet');
        });
      });

      describe('add', () => {
        it('should render ', () => {
          const { driver } = renderComponent();

          expect(driver.board.at(0).addTask.add.exists).toBe(true);
        });

        describe('on click', () => {
          it('should add new task ', () => {
            const { driver } = renderComponent();

            expect(driver.board.at(0).taskItem.length).toBe(0);

            driver.board.at(0).addTask.input.change('Italian buffet');
            driver.board.at(0).addTask.add.click();

            expect(driver.board.at(0).taskItem.length).toBe(1);
          });

          it('should clear the input ', () => {
            const { driver } = renderComponent();

            driver.board.at(0).addTask.input.change('Italian buffet');
            driver.board.at(0).addTask.add.click();

            expect(driver.board.at(0).addTask.input.value).toBe('');
          });
        });
      });

      describe('task items', () => {
        it('should not render by default', () => {
          const { driver } = renderComponent();

          expect(driver.board.at(0).taskItem.length).toBe(0);
        });

        it('should render', () => {
          const { driver } = renderComponent();

          driver.board.at(0).addTask.input.change('Italian buffet');
          driver.board.at(0).addTask.add.click();

          expect(driver.board.at(0).taskItem.length).toBe(1);
        });

        describe('text', () => {
          it('should render', () => {
            const { driver } = renderComponent();

            driver.board.at(0).addTask.input.change('Italian buffet');
            driver.board.at(0).addTask.add.click();

            expect(driver.board.at(0).taskItem.at(0).task.exists).toBe(true);
          });

          it('should render correct text', () => {
            const { driver } = renderComponent();

            driver.board.at(0).addTask.input.change('Italian buffet');
            driver.board.at(0).addTask.add.click();

            expect(driver.board.at(0).taskItem.at(0).task.text).toBe(
              'Italian buffet',
            );
          });
        });

        describe('input', () => {
          it('should not render by default', () => {
            const { driver } = renderComponent();

            driver.board.at(0).addTask.input.change('Italian buffet');
            driver.board.at(0).addTask.add.click();

            expect(driver.board.at(0).taskItem.at(0).input.exists).toBe(false);
          });

          it('should render on editing', () => {
            const { driver } = renderComponent();

            driver.board.at(0).addTask.input.change('Italian buffet');
            driver.board.at(0).addTask.add.click();
            driver.board.at(0).taskItem.at(0).edit.click();

            expect(driver.board.at(0).taskItem.at(0).input.exists).toBe(true);
          });

          it('should render correct value', () => {
            const { driver } = renderComponent();

            driver.board.at(0).addTask.input.change('Italian buffet');
            driver.board.at(0).addTask.add.click();
            driver.board.at(0).taskItem.at(0).edit.click();

            expect(driver.board.at(0).taskItem.at(0).input.value).toBe(
              'Italian buffet',
            );
          });

          it('should update value', () => {
            const { driver } = renderComponent();

            driver.board.at(0).addTask.input.change('Italian buffet');
            driver.board.at(0).addTask.add.click();
            driver.board.at(0).taskItem.at(0).edit.click();

            driver.board.at(0).taskItem.at(0).input.change('Italian noodles');

            expect(driver.board.at(0).taskItem.at(0).input.value).toBe(
              'Italian noodles',
            );
          });

          describe('on blur', () => {
            it('should update text', () => {
              const { driver } = renderComponent();

              driver.board.at(0).addTask.input.change('Italian buffet');
              driver.board.at(0).addTask.add.click();
              driver.board.at(0).taskItem.at(0).edit.click();

              driver.board.at(0).taskItem.at(0).input.change('Italian noodles');

              driver.board.at(0).taskItem.at(0).input.blur();

              expect(driver.board.at(0).taskItem.at(0).task.text).toBe(
                'Italian noodles',
              );
            });
          });
        });
      });
    });
  });
});
