import { forwardRef, FC, PropsWithChildren, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={clsx('input', className)} {...props} />
  ),
);

export default Input;
