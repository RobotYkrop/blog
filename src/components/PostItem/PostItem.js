import { useSelector } from 'react-redux';

import { getApi } from '../BlogApi/BlogApi';

import list from './PostItem.module.scss';

const PostItem = () => {
  const { posts } = useSelector((state) => state.blogSlice);
  console.log(posts);
  getApi('articles');
  return (
    <section className={list['post']}>
      <div>
        <h2 className={list['title']}>Title</h2>
        <span className={list['tag']}>Tag1</span>
        <p className={list['description']}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </p>
      </div>
      <div>
        <span>Name</span>
        <span>Date</span>
        <span>logo</span>
      </div>
    </section>
  );
};

export default PostItem;
