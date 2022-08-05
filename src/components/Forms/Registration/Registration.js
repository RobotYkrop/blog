import { Button, Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import reg from './Registration.module.scss';

const Registration = () => {
  const navigate = useNavigate();
  const LinkSignUp = () => {
    navigate('../sign-in', { replace: true });
  };
  return (
    <section className={reg['registration']}>
      <h2 className={reg['registration-title']}>Create new account</h2>
      <label className={reg['registration-label']}>
        Username
        <input placeholder="Username" />
      </label>
      <label className={reg['registration-label']}>
        Email address
        <input placeholder="Email address" />
      </label>
      <label className={reg['registration-label']}>
        Password
        <input placeholder="Password" />
      </label>
      <label className={reg['registration-label']}>
        Repeat Password
        <input placeholder="Password" />
      </label>
      <label className={reg['reg-checkdoc']}>
        <Checkbox defaultChecked />I agree to the processing of my personal information
      </label>
      <Button variant="contained">Create</Button>
      <span className={reg['registration-link']}>
        Already have an account?
        <button className={reg['linkSignIn']} onClick={() => LinkSignUp()}>
          Sign In
        </button>
        .
      </span>
    </section>
  );
};

export default Registration;
