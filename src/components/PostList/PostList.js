import { useSelector } from 'react-redux';

import { getApi } from '../BlogApi/BlogApi';
import PostItem from '../PostItem/PostItem';

import list from './PostList.module.scss';

const PostList = () => {
  const { posts } = useSelector((state) => state.blogSlice);
  console.log(posts);
  getApi('articles');
  return (
    <ul className={list['post-list']}>
      <PostItem />
    </ul>
  );
};

export default PostList;
