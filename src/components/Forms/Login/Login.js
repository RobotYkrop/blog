import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import LoaderIcon from 'react-loader-icon';
import { Alert, AlertTitle, Button } from '@mui/material';

import input from '../../App/App.module.scss';
import { postUserLogin } from '../../BlogApi/BlogApi';

import log from './Login.module.scss';

const Login = () => {
  const { isError, isLoading } = useSelector((state) => state.blogSlice);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  console.log(errors);

  const onSubmit = async (data) => {
    const { email, password } = data;
    dispatch(postUserLogin({ email, password }));
    console.log(data);
    // navigate('../articles', { replace: true });
    reset();
  };

  const LinkSignUp = () => {
    navigate('../sign-up', { replace: true });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isLoading && <LoaderIcon type={'spin'} color={'blue'} />}
      {isError && (
        <Alert severity="error">
          <AlertTitle>Ошибка</AlertTitle>
          При загрузке данных появилась ошибка — <strong>возможно, проблема с сервером</strong>
        </Alert>
      )}
      <section className={log['login']}>
        <h2 className={log['login-title']}>Sign In</h2>
        <label className={log['login-label']}>
          Email address
          <input
            placeholder="Email address"
            style={{ border: errors.email?.message ? '1px solid red' : '' }}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Entered value does not match email format',
              },
            })}
            type="email"
          />
          {errors.email && <span className={input['error']}>{errors.email.message}</span>}
        </label>
        <label className={log['login-label']}>
          Password
          <input
            placeholder="Password"
            style={{ border: errors.password?.message ? '1px solid red' : '' }}
            type="password"
            {...register('password', {
              required: 'Your password needs to be at least 6 characters.',
              minLength: { value: 6, message: 'Min lenght is 6' },
              maxLength: { value: 40, message: 'Max lenght is 40' },
            })}
          />
          {errors.password && <span className={input['error']}>{errors.password.message}</span>}
        </label>
        <Button type="submit" variant="contained">
          Login
        </Button>
        <span className={log['login-link']}>
          Don`t have an account?
          <button className={log['linkSignUp']} onClick={() => LinkSignUp()}>
            Sign Up
          </button>
          .
        </span>
      </section>
    </form>
  );
};

export default Login;
