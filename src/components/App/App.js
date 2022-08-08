import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';

import NavBar from '../HeadNav/NavBar';
import PostList from '../PostList/PostList';
import Article from '../Article/Article';
import Login from '../Forms/Login/Login';
import Registration from '../Forms/Registration/Registration';
import Profile from '../Forms/EditProfile/EditProfile';
import NewArticle from '../Forms/NewArticle/NewArticle';
import EditArticle from '../Forms/EditArticle/EditArticle';
import NotFound from '../PageNotFount/NotFound';

import app from './App.module.scss';
import 'antd/dist/antd.min.css';

const App = () => {
  const { token } = useSelector((state) => state.blogSlice);
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
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/new-article" element={token ? <NewArticle /> : <Navigate to={'/sign-in'} />} />
          <Route path="/articles/:slug/edit" element={token ? <EditArticle /> : <Navigate to={'/sign-in'} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
