import { FC, PropsWithChildren, HTMLAttributes } from 'react';
import clsx from 'clsx';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

const Card: FC<PropsWithChildren<CardProps>> = ({ className, ...props }) => (
  <div className={clsx('card', className)} {...props}></div>
);

export default Card;
