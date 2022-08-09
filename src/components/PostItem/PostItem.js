import { Link } from 'react-router-dom';
import { Avatar, Checkbox } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { uniqueId } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { convertCreatedDate, titleNull } from '../utilites/utilites';
import { postLikes, deleteLikes } from '../BlogApi/BlogApi';

import list from './PostItem.module.scss';

const PostItem = ({ slug, title, description, createdAt, tagList, author, favoritesCount }) => {
  const { token, favorited } = useSelector((state) => state.blogSlice);
  const [checkFavorite, setCheckFavorite] = useState(favorited);
  const [Count, setFavoriteCount] = useState(favoritesCount);
  const megaTitle = titleNull(title);
  const megaDate = convertCreatedDate(createdAt);

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
  const dispatch = useDispatch();
  return (
    <li className={list['post']}>
      <div>
        <div className={list['post-header']}>
          <Link to={`${slug}`}>
            <h2 className={list['title']}>{megaTitle}</h2>
          </Link>
          {token ? (
            <Checkbox
              icon={<FavoriteBorder />}
              onChange={(e) => likeButtonHandler(e)}
              checkedIcon={<Favorite />}
              checked={checkFavorite}
            />
          ) : (
            <Checkbox icon={<FavoriteBorder />} disabled />
          )}
          {Count}
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
          <span>{author.username}</span>
          <span className={list['created-date']}>{megaDate}</span>
        </div>
        <Avatar className={list['image']} src={author.image} alt="No Avatar" />
      </div>
    </li>
  );
};

export default PostItem;
