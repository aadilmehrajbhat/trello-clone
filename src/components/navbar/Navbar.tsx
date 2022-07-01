import { FC } from 'react';
import Button from '~/components/button';

const Navbar: FC = () => {
  return (
    <div className="navbar">
      <h1 className="logo">Trello clone</h1>
      <Button color="secondary">Sign Out</Button>
    </div>
  );
};

export default Navbar;
