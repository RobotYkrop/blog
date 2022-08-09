import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, AlertTitle, Button, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { putUpdateUser } from '../../BlogApi/BlogApi';
import input from '../../App/App.module.scss';
import profile from '../Auth.module.scss';

const Profile = () => {
  const schema = yup
    .object()
    .shape({
      email: yup.string().email().required('Email is required'),
      password: yup
        .string()
        .min(6, 'Min lenght is 6')
        .max(40, 'Max lenght is 40')
        .required('Your password needs to be at least 6 characters.'),
      username: yup.string().min(3, 'Min lenght is 3').max(20, 'Max lenght is 20').required('Username is required'),
      image: yup.string().url().required('URL required'),
    })
    .required();
  const dispatch = useDispatch();
  const { userInfo, token, isError } = useSelector((state) => state.blogSlice);
  const { username, email } = userInfo;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  console.log(errors);
  const onSubmit = (data) => {
    const { username, email, password, image } = data;
    dispatch(putUpdateUser({ ...data, username, email, password, image, token }));
    console.log(data);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isError && (
        <Alert severity="error">
          <AlertTitle>Ошибка</AlertTitle>
          При загрузке данных появилась ошибка — <strong>возможно, проблема с сервером</strong>
        </Alert>
      )}
      <section className={profile['modal']}>
        <h2 className={profile['modal-title']}>Edit Profile</h2>
        <label className={profile['modal-label']}>
          Username
          <TextField
            style={{ border: errors.username?.message ? '1px solid red' : '' }}
            defaultValue={username}
            {...register('username')}
            placeholder="Username"
          />
          {errors.username && <span className={input['error']}>{errors.username.message}</span>}
        </label>
        <label className={profile['modal-label']}>
          Email address
          <TextField
            style={{ border: errors.email?.message ? '1px solid red' : '' }}
            defaultValue={email}
            type="email"
            {...register('email')}
            placeholder="Email address"
          />
          {errors.email && <span className={input['error']}>{errors.email.message}</span>}
        </label>
        <label className={profile['modal-label']}>
          New Password
          <TextField
            style={{ border: errors.password?.message ? '1px solid red' : '' }}
            type="password"
            {...register('password')}
            placeholder="New Password"
          />
          {errors.password && <span className={input['error']}>{errors.password.message}</span>}
        </label>
        <label className={profile['modal-label']}>
          Avatar image (url)
          <TextField
            style={{ border: errors.password?.message ? '1px solid red' : '' }}
            placeholder="Avatar image"
            {...register('image')}
            type="url"
          />
          {errors.url && <span className={input['error']}>{errors.url.message}</span>}
        </label>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </section>
    </form>
  );
};

export default Profile;
