import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import LoaderIcon from 'react-loader-icon';
import { Alert, AlertTitle, Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import input from '../../App/App.module.scss';
import { postUserLogin } from '../../BlogApi/BlogApi';
import log from '../Auth.module.scss';

const Login = () => {
  const schema = yup
    .object()
    .shape({
      email: yup.string().email().required('Email is required.'),
      password: yup
        .string()
        .min(6, 'Your password needs to be at least 6 characters.')
        .max(40, 'Max lenght password is 40.'),
    })
    .required();
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
    console.log(data);
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
            <input
              placeholder="Email address"
              style={{ border: errors.email?.message ? '1px solid red' : '' }}
              {...register('email')}
              type="email"
            />
            {errors.email && <span className={input['error']}>{errors.email.message}</span>}
          </label>
          <label className={log['modal-label']}>
            Password
            <input
              placeholder="Password"
              style={{ border: errors.password?.message ? '1px solid red' : '' }}
              type="password"
              {...register('password')}
            />
            {errors.password && <span className={input['error']}>{errors.password.message}</span>}
          </label>
          <Button className={log['button_submit']} type="submit" variant="contained">
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
