import { uniqueId } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoaderIcon from 'react-loader-icon';
import { Pagination } from '@mui/material';

import { getArticle } from '../BlogApi/BlogApi';
import PostItem from '../PostItem/PostItem';

import list from './PostList.module.scss';

export function createPages(pages, pagesCount, currentPage) {
  if (pagesCount > 10) {
    if (currentPage > 5) {
      for (let i = currentPage - 4; i <= currentPage + 5; i++) {
        pages.push(i);
        if (i == pagesCount) break;
      }
    } else {
      for (let i = 1; i <= 10; i++) {
        pages.push(i);
        if (i == pagesCount) break;
      }
    }
  } else {
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
  }
}

const PostList = () => {
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  const articles = useSelector((state) => state.blogSlice.articles);
  const postsCount = useSelector((state) => state.blogSlice.postsCount);
  const pagesCount = Math.ceil(postsCount / offset);
  console.log(articles);

  useEffect(() => {
    dispatch(getArticle({ offset }));
  }, [dispatch, offset]);

  if (articles.length === 0) {
    return <LoaderIcon type={'spin'} color={'blue'} />;
  } else {
    return (
      <div>
        <ul className={list['post-list']}>
          {articles.map((post) => {
            return <PostItem key={uniqueId()} {...post} />;
          })}
        </ul>
        <Pagination
          count={pagesCount}
          page={offset / 5 + 1}
          shape="rounded"
          onChange={(_, num) => {
            setOffset((num - 1) * 5);
          }}
        />
      </div>
    );
  }
};

export default PostList;
