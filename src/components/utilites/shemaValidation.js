import * as yup from 'yup';

export const schema = yup
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
