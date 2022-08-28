import { uniqueId } from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoaderIcon from 'react-loader-icon';
import { Alert, AlertTitle, Avatar, Button } from '@mui/material';
import { useParams, Link } from 'react-router-dom';

import list from '../Article/Article.module.scss';
import { getOneArticle } from '../../BlogApi/BlogApi';
import { convertCreatedDate } from '../../utilites/utilites';
import ModalDelete from '../../ModalDelete/ModalDelete';
import SystemLikes from '../../utilites/systemLikes';

const Article = () => {
  const { oneArticle, author, isError, isLoading, token, userInfo } = useSelector((state) => state.blogSlice);
  const { title, description, createdAt, tagList, body, favoritesCount, favorited } = oneArticle;
  const { image, username } = author;
  const megaDate = convertCreatedDate(createdAt);
  const { slug } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneArticle(slug));
  }, [dispatch, slug]);
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
              <div className={list['post-header']}>
                <h2 className={list['title']}>{title}</h2>
                <SystemLikes favoritesCount={favoritesCount} favorited={favorited} slug={slug} />
              </div>
              {tagList.map((item) => {
                return (
                  <span key={uniqueId()} className={list['tag']}>
                    {item}
                  </span>
                );
              })}
              <p className={list['description']}>{description}</p>
            </div>
            <div className={list['user']}>
              <div className={list['user-name']}>
                <div className={list['author_date']}>
                  <span>{username}</span>
                  <span className={list['created-date']}>{megaDate}</span>
                </div>
                <Avatar className={list['image']} src={image} alt={username} />
              </div>
              {token && userInfo.username === username && (
                <div className={list['buttons']}>
                  <ModalDelete />
                  <Link to={'edit'}>
                    <Button className={list['edit']}>Edit</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <p className={list['body']}>{body}</p>
        </section>
      )}
    </>
  );
};

export default Article;
