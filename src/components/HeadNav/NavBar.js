import { Link } from 'react-router-dom';

import nav from './NavBar.module.scss';

const NavBar = () => {
  return (
    <nav className={nav['nav']}>
      <Link to={'articles'}>
        <h3>Realworld Blog</h3>
      </Link>
      <div className={nav['nav-sign']}>
        <button className={nav['sign_in']}>Sign In</button>
        <button className={nav['sign_up']}>Sign Up</button>
      </div>
    </nav>
  );
};
export default NavBar;
