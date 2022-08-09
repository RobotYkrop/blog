import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import LoaderIcon from 'react-loader-icon';
import { Alert, AlertTitle, Button, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

import input from '../../App/App.module.scss';
import { postUserLogin } from '../../BlogApi/BlogApi';
import log from '../Auth.module.scss';
import { schema } from '../../utilites/shemaValidation';

const Login = () => {
  const { isError, isLoading, token } = useSelector((state) => state.blogSlice);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const { email, password } = data;
    dispatch(postUserLogin({ email, password }));
  };

  const LinkSignUp = () => {
    navigate('../sign-up', { replace: true });
  };
  return (
    <div>
      {isLoading && <LoaderIcon type={'spin'} color={'blue'} />}
      {isError && (
        <Alert severity="error">
          <AlertTitle>Ошибка</AlertTitle>
          При загрузке данных появилась ошибка — <strong>возможно, проблема с сервером</strong>
        </Alert>
      )}
      {token && navigate('../articles', { replace: true })}
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className={log['modal']}>
          <h2 className={log['modal-title']}>Sign In</h2>
          <label className={log['modal-label']}>
            Email address
            <TextField
              placeholder="Email address"
              style={{ border: errors.email?.message ? '1px solid red' : '' }}
              {...register('email')}
              type="email"
            />
            {errors.email && <span className={input['error']}>{errors.email.message}</span>}
          </label>
          <label className={log['modal-label']}>
            Password
            <TextField
              placeholder="Password"
              style={{ border: errors.password?.message ? '1px solid red' : '' }}
              type="password"
              {...register('password')}
            />
            {errors.password && <span className={input['error']}>{errors.password.message}</span>}
          </label>
          <Button type="submit" variant="contained">
            Login
          </Button>
          <span className={log['modal-link']}>
            Don`t have an account?
            <button className={log['linkSign']} onClick={() => LinkSignUp()}>
              Sign Up
            </button>
            .
          </span>
        </section>
      </form>
    </div>
  );
};

export default Login;
