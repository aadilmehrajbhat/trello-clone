import clsx from 'clsx';
import { FC, PropsWithChildren, ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: 'primary' | 'secondary' | 'accent';
};

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  color = 'primary',
  className,
  ...props
}) => (
  <button
    data-aid="button"
    className={clsx('button', className)}
    data-color={color}
    {...props}
  />
);

export default Button;
