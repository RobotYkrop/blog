import { Button } from '@mui/material';

import profile from './EditProfile.module.scss';

const Profile = () => {
  return (
    <section className={profile['profile']}>
      <h2 className={profile['profile-title']}>Edit Profile</h2>
      <label>
        Username
        <input placeholder="Email address" />
      </label>
      <label>
        Email address
        <input placeholder="Email address" />
      </label>
      <label>
        New Password
        <input placeholder="New password" />
      </label>
      <label>
        Avatar image (url)
        <input placeholder="Avatar image" />
      </label>
      <Button variant="contained">Login</Button>
    </section>
  );
};

export default Profile;
