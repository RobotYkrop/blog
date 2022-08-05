import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import login from './Login.module.scss';

const Login = () => {
  const navigate = useNavigate();
  const LinkSignUp = () => {
    navigate('../sign-up', { replace: true });
  };
  return (
    <section className={login['login']}>
      <h2 className={login['login-title']}>Sign In</h2>
      <label className={login['login-label']}>
        Email address
        <input placeholder="Email address" />
      </label>
      <label className={login['login-label']}>
        Password
        <input placeholder="Password" />
      </label>
      <Button variant="contained">Login</Button>
      <span className={login['login-link']}>
        Don`t have an account?
        <button className={login['linkSignUp']} onClick={() => LinkSignUp()}>
          Sign Up
        </button>
        .
      </span>
    </section>
  );
};

export default Login;
