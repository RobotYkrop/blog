import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';

import NavBar from '../HeadNav/NavBar';
import PostList from '../PostList/PostList';
import Article from '../Article/Article';
import Login from '../Forms/Login/Login';
import Registration from '../Forms/Registration/Registration';
import Profile from '../Forms/EditProfile/EditProfile';

import app from './App.module.scss';
import 'antd/dist/antd.min.css';

const App = () => {
  return (
    <div className={app['App']}>
      <NavBar />
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/articles" element={<PostList />} />
          <Route path="/articles/:slug" element={<Article />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Registration />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
