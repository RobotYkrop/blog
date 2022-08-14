import { uniqueId } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoaderIcon from 'react-loader-icon';
import { Alert, AlertTitle, Avatar, Button, Checkbox } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import Favorite from '@mui/icons-material/Favorite';
import { FavoriteBorder } from '@mui/icons-material';
import { red } from '@mui/material/colors';

import list from '../Article/Article.module.scss';
import { getOneArticle, deleteLikes, postLikes } from '../../BlogApi/BlogApi';
import { convertCreatedDate } from '../../utilites/utilites';
import ModalDelete from '../../ModalDelete/ModalDelete';

const Article = () => {
  const { oneArticle, author, isError, isLoading, token, userInfo } = useSelector((state) => state.blogSlice);
  const { title, description, createdAt, tagList, body, favoritesCount, favorited } = oneArticle;
  const { image, username } = author;
  const megaDate = convertCreatedDate(createdAt);
  const { slug } = useParams();
  const dispatch = useDispatch();

  const [checkFavorite, setCheckFavorite] = useState(favorited);
  const [Count, setFavoriteCount] = useState(favoritesCount);

  const likeButtonHandler = (e) => {
    if (e.target.checked) {
      dispatch(postLikes({ slug, token }));
      setCheckFavorite(true);
      setFavoriteCount(Count + 1);
    } else {
      dispatch(deleteLikes({ slug, token }));
      setCheckFavorite(false);
      setFavoriteCount(Count - 1);
    }
  };

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
              <div className={list['post-header']}>
                <h2 className={list['title']}>{title}</h2>
                <span>
                  {token ? (
                    <Checkbox
                      sx={{
                        '&.Mui-checked': {
                          color: red[500],
                        },
                      }}
                      onChange={(e) => likeButtonHandler(e)}
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      checked={checkFavorite}
                    />
                  ) : (
                    <Checkbox icon={<FavoriteBorder />} disabled />
                  )}
                  <span className={list['count']}>{Count}</span>
                </span>
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
