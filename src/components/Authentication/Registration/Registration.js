import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoaderIcon from 'react-loader-icon';
import { Alert, AlertTitle, Button, Checkbox, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

import input from '../../App/App.module.scss';
import { postRegisterUser } from '../../BlogApi/BlogApi';
import reg from '../Auth.module.scss';
import { schema } from '../../utilites/shemaValidation';

const Registration = () => {
  const { isError, isLoading } = useSelector((state) => state.blogSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  console.log(errors);
  const onSubmit = (data) => {
    const { username, email, password, image } = data;
    dispatch(postRegisterUser({ username, email, password, image }));
    navigate('../articles', { replace: true });
    reset();
    console.log(data);
  };
  const LinkSignUp = () => {
    navigate('../sign-in', { replace: true });
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
      <section className={reg['modal']}>
        <h2 className={reg['modal-title']}>Create new account</h2>
        <label className={reg['modal-label']}>
          Username
          <TextField
            style={{ border: errors.username?.message ? '1px solid red' : '' }}
            {...register('username')}
            placeholder="Username"
          />
          {errors.username && <span className={input['error']}>{errors.username.message}</span>}
        </label>
        <label className={reg['modal-label']}>
          Email address
          <TextField
            style={{ border: errors.email?.message ? '1px solid red' : '' }}
            type="email"
            {...register('email')}
            placeholder="Email address"
          />
          {errors.email && <span className={input['error']}>{errors.email.message}</span>}
        </label>
        <label className={reg['modal-label']}>
          Password
          <TextField
            style={{ border: errors.password?.message ? '1px solid red' : '' }}
            type="password"
            {...register('password')}
            placeholder="Password"
          />
          {errors.password && <span className={input['error']}>{errors.password.message}</span>}
        </label>
        <label className={reg['modal-label']}>
          Repeat Password
          <TextField
            style={{ border: errors.repeat_password?.message ? '1px solid red' : '' }}
            type="password"
            {...register('repeat_password', {
              required: 'Passwords must match',
              validate: (val) => {
                if (watch('password') != val) {
                  return 'Passwords must match';
                }
              },
            })}
            placeholder="Password"
          />
          {errors.repeat_password && <span className={input['error']}>{errors.repeat_password.message}</span>}
        </label>
        <label className={reg['reg-checkdoc']}>
          <Checkbox defaultChecked />I agree to the processing of my personal information
        </label>
        <Button type="submit" variant="contained">
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
