import { Button, Avatar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../../store/configureStore';

import nav from './NavBar.module.scss';

const NavBar = () => {
  const { token, userInfo } = useSelector((state) => state.blogSlice);
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logout());
  };
  return (
    <nav className={nav['nav']}>
      <Link to={'articles'}>
        <h3 className={nav['nav-title']}>Realworld Blog</h3>
      </Link>
      {!token && (
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
      )}
      {token && (
        <div className={nav['nav-sign']}>
          <Link to={'new-article'}>
            <Button variant="outlined" className={nav['create_article']}>
              Create article
            </Button>
          </Link>
          <div className={nav['nav-user--block']}>
            <Link to={`profile/${userInfo.username}`}>
              <span className={nav['username']}>{userInfo.username}</span>
            </Link>
            <Link to={`profile/${userInfo.username}`}>
              <Avatar className={nav['username-image']} src={userInfo.image} alt="No Avatar" />
            </Link>
          </div>
          <Button onClick={() => logOut()} variant="text" className={nav['log_out']}>
            Log Out
          </Button>
        </div>
      )}
    </nav>
  );
};
export default NavBar;
