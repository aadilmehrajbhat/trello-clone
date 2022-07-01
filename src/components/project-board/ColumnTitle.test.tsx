import { render, cleanup } from '~/tests/utils';

import ColumnTitle from './ColumnTitle';
import ColumnTitleDriver from './ColumnTitle.driver';

describe('<ColumnTitle />', () => {
  const renderComponent = ({
    title = '',
    onTitleChange = jest.fn(),
  }: { title?: string; onTitleChange?: () => void } = {}) => {
    const { baseElement } = render(
      <ColumnTitle title={title} onTitleChange={onTitleChange} />,
    );

    return {
      driver: new ColumnTitleDriver(baseElement),
    };
  };

  afterEach(cleanup);

  it('should render', () => {
    const { driver } = renderComponent();

    expect(driver.exists).toBe(true);
  });

  describe('title', () => {
    it('should render', () => {
      const { driver } = renderComponent();

      expect(driver.title.exists).toBe(true);
    });

    it('should render correct text', () => {
      const { driver } = renderComponent({ title: 'Project Alpha' });

      expect(driver.title.text).toBe('Project Alpha');
    });
  });

  describe('input', () => {
    it('should not render by default', () => {
      const { driver } = renderComponent();

      expect(driver.input.exists).toBe(false);
    });

    describe('on double click', () => {
      it('should render', () => {
        const { driver } = renderComponent();

        driver.editTitle();

        expect(driver.input.exists).toBe(true);
      });

      it('should render correct text', () => {
        const { driver } = renderComponent({ title: 'Project Alpha' });

        driver.editTitle();

        expect(driver.input.value).toBe('Project Alpha');
      });

      describe('on change', () => {
        it('should render correct text', () => {
          const onTitleChange = jest.fn();
          const { driver } = renderComponent({
            title: 'Project Alpha',
            onTitleChange,
          });

          driver.editTitle();
          driver.input.change('Beta');

          expect(onTitleChange).toBeCalledTimes(1);
          expect(onTitleChange).toBeCalledWith('Beta');
        });
      });
    });
  });
});
