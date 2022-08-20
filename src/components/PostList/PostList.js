import { uniqueId } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoaderIcon from 'react-loader-icon';
import { Pagination, Alert, AlertTitle } from '@mui/material';

import { getArticle } from '../BlogApi/BlogApi';
import PostItem from '../PostItem/PostItem';

import list from './PostList.module.scss';

const PostList = () => {
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState();
  const { postsCount, articles, isError, isLoading } = useSelector((state) => state.blogSlice);

  useEffect(() => {
    dispatch(getArticle(offset));
  }, [offset]);

  useEffect(() => {
    setPage(offset / 5 + 1);
  }, [page, offset]);

  return (
    <div>
      {isLoading && <LoaderIcon type={'spin'} color={'blue'} />}
      {isError && (
        <Alert severity="error">
          <AlertTitle>Ошибка</AlertTitle>
          При загрузке данных появилась ошибка — <strong>возможно, проблема с сервером</strong>
        </Alert>
      )}
      {!isLoading && !isError && (
        <div>
          <ul className={list['post-list']}>
            {articles.map((post) => {
              return <PostItem key={uniqueId()} {...post} />;
            })}
          </ul>
          <Pagination
            color="primary"
            className={list['list-pagination']}
            count={Math.ceil(postsCount / 5)}
            page={page}
            shape="rounded"
            onChange={(_, num) => {
              setOffset((num - 1) * 5);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PostList;
