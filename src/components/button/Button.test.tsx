import { render, cleanup } from '~/tests/utils';

import Button from './Button';
import ButtonDriver from './Button.driver';

describe('<Button />', () => {
  const renderComponent = ({ onClick }: { onClick?: () => void } = {}) => {
    const { baseElement } = render(<Button onClick={onClick}>Click me</Button>);

    return {
      driver: new ButtonDriver(baseElement),
    };
  };

  afterEach(cleanup);

  it('should render', () => {
    const { driver } = renderComponent();

    expect(driver.exists).toBe(true);
  });

  it('should render correct text', () => {
    const { driver } = renderComponent();

    expect(driver.text).toBe('Click me');
  });

  describe('on click', () => {
    it('should call callback', () => {
      const onClick = jest.fn();
      const { driver } = renderComponent({
        onClick,
      });

      driver.click();

      expect(onClick).toBeCalledTimes(1);
    });
  });
});
