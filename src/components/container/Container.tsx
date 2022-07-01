import { FC, PropsWithChildren } from 'react';
import Navbar from '~/components/navbar';

const Container: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Container;
