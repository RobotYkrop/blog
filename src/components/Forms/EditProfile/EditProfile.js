import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import LoaderIcon from 'react-loader-icon';
import { Alert, AlertTitle, Button } from '@mui/material';

import input from '../../App/App.module.scss';
import { putUpdateUser } from '../../BlogApi/BlogApi';

import profile from './EditProfile.module.scss';

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo, token, isError, isLoading } = useSelector((state) => state.blogSlice);
  const { username, email } = userInfo;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  console.log(errors);
  const onSubmit = (data) => {
    const { username, email, password, image } = data;
    dispatch(putUpdateUser({ ...data, username, email, password, image, token }));
    console.log(data);
    reset();
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
      <section className={profile['profile']}>
        <h2 className={profile['profile-title']}>Edit Profile</h2>
        <label className={profile['profile-label']}>
          Username
          <input
            style={{ border: errors.username?.message ? '1px solid red' : '' }}
            defaultValue={username}
            {...register('username', {
              required: 'Username is required',
              minLength: { value: 3, message: 'Min lenght is 4' },
              maxLength: { value: 20, message: 'Max lenght is 20' },
            })}
            placeholder="Username"
          />
          {errors.username && <span className={input['error']}>{errors.username.message}</span>}
        </label>
        <label className={profile['profile-label']}>
          Email address
          <input
            style={{ border: errors.email?.message ? '1px solid red' : '' }}
            defaultValue={email}
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
        <label className={profile['profile-label']}>
          New Password
          <input
            style={{ border: errors.password?.message ? '1px solid red' : '' }}
            type="password"
            {...register('password', {
              required: 'Your password needs to be at least 6 characters.',
              minLength: { value: 6, message: 'Min lenght is 6' },
              maxLength: { value: 40, message: 'Max lenght is 40' },
            })}
            placeholder="New Password"
          />
          {errors.password && <span className={input['error']}>{errors.password.message}</span>}
        </label>
        <label className={profile['profile-label']}>
          Avatar image (url)
          <input
            style={{ border: errors.password?.message ? '1px solid red' : '' }}
            placeholder="Avatar image"
            {...register('image', {
              required: 'URL required',
              pattern: {
                value:
                  '[Hh][Tt][Tt][Pp][Ss]?://(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::d{2,5})?(?:/[^s]*)?',
                message: 'Not correct URL address',
              },
            })}
            type="url"
          />
          {errors.url && <span className={input['error']}>{errors.url.message}</span>}
        </label>
        <Button type="subnit" variant="contained">
          Save
        </Button>
      </section>
    </form>
  );
};

export default Profile;
