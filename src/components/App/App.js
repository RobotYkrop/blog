import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';

import NavBar from '../HeadNav/NavBar';
import PostList from '../PostList/PostList';
import Article from '../Article/Article';

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
        </Routes>
      </Container>
    </div>
  );
};

export default App;
