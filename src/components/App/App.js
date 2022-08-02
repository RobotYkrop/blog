import NavBar from '../HeadNav/NavBar';
import PostList from '../PostList/PostList';

import app from './App.module.scss';

const App = () => {
  return (
    <div className={app['App']}>
      <NavBar />
      <div className={app['container']}>
        <PostList />
      </div>
    </div>
  );
};

export default App;
