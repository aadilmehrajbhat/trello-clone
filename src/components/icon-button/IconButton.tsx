import clsx from 'clsx';
import { FC, PropsWithChildren, ButtonHTMLAttributes } from 'react';

import { ICONS } from './constants';

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  width?: number | string;
  height?: number | string;
  icon: keyof typeof ICONS;
};

const IconButton: FC<PropsWithChildren<IconButtonProps>> = ({
  className,
  icon,
  width,
  height,
  ...props
}) => {
  const Icon = ICONS[icon];

  return (
    <button className={clsx('icon-button', className)} {...props}>
      <Icon width={width} height={height} />
    </button>
  );
};

IconButton.defaultProps = {
  width: '20px',
  height: '20px',
};

export default IconButton;
