import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import nav from './NavBar.module.scss';

const NavBar = () => {
  return (
    <nav className={nav['nav']}>
      <Link to={'articles'}>
        <h3>Realworld Blog</h3>
      </Link>
      <div className={nav['nav-sign']}>
        <Link to={'sign-in'}>
          <Button variant="outlined" className={nav['sign_in']}>
            Sign In
          </Button>
        </Link>
        <Link to={'sign-up'}>
          <Button variant="text" className={nav['sign_up']}>
            Sign Up
          </Button>
        </Link>
      </div>
    </nav>
  );
};
export default NavBar;
