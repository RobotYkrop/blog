import { Button, Checkbox } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import input from '../../App/App.module.scss';
import { postRegisterUser } from '../../BlogApi/BlogApi';

import reg from './Registration.module.scss';

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

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
      <section className={reg['registration']}>
        <h2 className={reg['registration-title']}>Create new account</h2>
        <label className={reg['registration-label']}>
          Username
          <input
            style={{ border: errors.username?.message ? '1px solid red' : '' }}
            {...register('username', {
              required: 'Username is required',
              minLength: { value: 3, message: 'Min lenght is 4' },
              maxLength: { value: 20, message: 'Max lenght is 20' },
            })}
            placeholder="Username"
          />
          {errors.username && <span className={input['error']}>{errors.username.message}</span>}
        </label>
        <label className={reg['registration-label']}>
          Email address
          <input
            style={{ border: errors.email?.message ? '1px solid red' : '' }}
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Entered value does not match email format',
              },
            })}
            placeholder="Email address"
          />
          {errors.email && <span className={input['error']}>{errors.email.message}</span>}
        </label>
        <label className={reg['registration-label']}>
          Password
          <input
            style={{ border: errors.password?.message ? '1px solid red' : '' }}
            type="password"
            {...register('password', {
              required: 'Your password needs to be at least 6 characters.',
              minLength: { value: 6, message: 'Min lenght is 6' },
              maxLength: { value: 40, message: 'Max lenght is 40' },
            })}
            placeholder="Password"
          />
          {errors.password && <span className={input['error']}>{errors.password.message}</span>}
        </label>
        <label className={reg['registration-label']}>
          Repeat Password
          <input
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
        <span className={reg['registration-link']}>
          Already have an account?
          <button className={reg['linkSignIn']} onClick={() => LinkSignUp()}>
            Sign In
          </button>
          .
        </span>
      </section>
    </form>
  );
};

export default Registration;
