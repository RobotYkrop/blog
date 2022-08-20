import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';

import NavBar from '../HeadNav/NavBar';
import PostList from '../PostList/PostList';
import Article from '../ArticlesForm/Article/Article';
import Login from '../Authentication/Login/Login';
import Registration from '../Authentication/Registration/Registration';
import Profile from '../Authentication/EditProfile/EditProfile';
import NewArticle from '../ArticlesForm/NewArticle/NewArticle';
import EditArticle from '../ArticlesForm/EditArticle/EditArticle';
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
          <Route path="/" element={<Navigate to="/articles" replace />} />
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
