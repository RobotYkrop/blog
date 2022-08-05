import { uniqueId } from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoaderIcon from 'react-loader-icon';
import { Alert, AlertTitle } from '@mui/material';
import { useParams } from 'react-router-dom';

import list from '../Article/Article.module.scss';
import { getOneArticle } from '../BlogApi/BlogApi';
import { convertCreatedDate } from '../utilites/utilites';

const Article = () => {
  const { oneArticle, author, isError, isLoading } = useSelector((state) => state.blogSlice);
  const { title, description, createdAt, tagList, body } = oneArticle;
  const { image, username } = author;
  const megaDate = convertCreatedDate(createdAt);
  const { slug } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneArticle(slug));
  }, [slug]);
  return (
    <>
      {isLoading && <LoaderIcon type={'spin'} color={'blue'} />}
      {isError && (
        <Alert severity="error">
          <AlertTitle>Ошибка</AlertTitle>
          При загрузке данных появилась ошибка — <strong>возможно, проблема с сервером</strong>
        </Alert>
      )}
      {oneArticle && (
        <section className={list['expanded-post']}>
          <div key={uniqueId()} className={list['post']}>
            <div>
              <h2 className={list['title']}>{title}</h2>
              <span className={list['tag']}>{tagList}</span>
              <p className={list['description']}>{description}</p>
            </div>
            <div className={list['user']}>
              <div className={list['user-name']}>
                <span>{username}</span>
                <span className={list['created-date']}>{megaDate}</span>
              </div>
              <img className={list['image']} src={image} />
            </div>
          </div>
          <p>{body}</p>
        </section>
      )}
    </>
  );
};

export default Article;
