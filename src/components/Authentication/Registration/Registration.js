import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import LoaderIcon from 'react-loader-icon';
import { Alert, AlertTitle, Button, Checkbox } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { blue } from '@mui/material/colors';

import input from '../../App/App.module.scss';
import { postRegisterUser } from '../../BlogApi/BlogApi';
import reg from '../Auth.module.scss';

const Registration = () => {
  const schema = yup
    .object()
    .shape({
      email: yup.string().required('Email is required.').email('Email is not valid.'),
      password: yup.string().min(6, 'Your password needs to be at least 6 characters.').max(40, 'Max lenght is 40.'),
      username: yup.string().min(3, 'Min lenght username is 3.').max(20, 'Max lenght username is 20.'),
      repeat_password: yup.string().oneOf([yup.ref('password')], 'Passwords must match.'),
      checkbox: yup.bool().oneOf([true], 'You must agree to the terms.'),
    })
    .required();
  const { userInfo, isError, isLoading, token } = useSelector((state) => state.blogSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    const { username, email, password, image } = data;
    dispatch(postRegisterUser({ username, email, password, image }));
    userInfo ?? reset();
  };
  const LinkSignUp = () => {
    navigate('/sign-in', { replace: true });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {token && <Navigate to="/articles" replace />}
      {isLoading && <LoaderIcon type={'spin'} color={'blue'} />}
      {isError && (
        <Alert severity="error">
          <AlertTitle>Ошибка</AlertTitle>
          При загрузке данных появилась ошибка — <strong>возможно, проблема с сервером</strong>
        </Alert>
      )}
      <section className={reg['modal']}>
        <h2 className={reg['modal-title']}>Create new account</h2>
        <label className={reg['modal-label']}>
          Username
          <input
            style={{ border: errors.username?.message ? '1px solid red' : '' }}
            {...register('username')}
            placeholder="Username"
          />
          {errors.username && <span className={input['error']}>{errors.username.message}</span>}
        </label>
        <label className={reg['modal-label']}>
          Email address
          <input
            style={{ border: errors.email?.message ? '1px solid red' : '' }}
            type="email"
            {...register('email')}
            placeholder="Email address"
          />
          {errors.email && <span className={input['error']}>{errors.email.message}</span>}
        </label>
        <label className={reg['modal-label']}>
          Password
          <input
            style={{ border: errors.password?.message ? '1px solid red' : '' }}
            type="password"
            {...register('password')}
            placeholder="Password"
          />
          {errors.password && <span className={input['error']}>{errors.password.message}</span>}
        </label>
        <label className={reg['modal-label']}>
          Repeat Password
          <input
            style={{ border: errors.repeat_password?.message ? '1px solid red' : '' }}
            type="password"
            {...register('repeat_password')}
            placeholder="Password"
          />
          {errors.repeat_password && <span className={input['error']}>{errors.repeat_password.message}</span>}
        </label>
        <label className={reg['reg-checkdoc']}>
          <div>
            <Checkbox
              sx={{
                color: blue[500],
                '&.Mui-checked': {
                  color: blue[500],
                },
              }}
              {...register('checkbox')}
            />
            <span className={reg['reg-span']}>I agree to the processing of my personal information</span>
          </div>
          {errors.checkbox && <span className={input['error']}>{errors.checkbox.message}</span>}
        </label>
        <Button className={reg['button_submit']} type="submit" variant="contained">
          Create
        </Button>
        <span className={reg['modal-link']}>
          Already have an account?
          <button className={reg['linkSign']} onClick={() => LinkSignUp()}>
            Sign In
          </button>
          .
        </span>
      </section>
    </form>
  );
};

export default Registration;
