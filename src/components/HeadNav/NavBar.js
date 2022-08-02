import nav from './NavBar.module.scss';

const NavBar = () => {
  return (
    <nav className={nav['nav']}>
      <h3>Realworld Blog</h3>
      <div className={nav['nav-sign']}>
        <button className={nav['sign_in']}>Sign In</button>
        <button className={nav['sign_up']}>Sign Up</button>
      </div>
    </nav>
  );
};
export default NavBar;
