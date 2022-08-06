import { Link } from 'react-router-dom';
import { Avatar, Checkbox } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

import { convertCreatedDate, mapTags, titleNull } from '../utilites/utilites';

import list from './PostItem.module.scss';

const PostItem = ({ slug, title, description, createdAt, tagList, author, favoritesCount }) => {
  const megaTitle = titleNull(title);
  const megaDate = convertCreatedDate(createdAt);
  const megaTags = mapTags(tagList);
  return (
    <li className={list['post']}>
      <div>
        <div className={list['post-header']}>
          <Link to={`${slug}`}>
            <h2 className={list['title']}>{megaTitle}</h2>
          </Link>
          <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
          <span>{favoritesCount}</span>
        </div>
        <span className={list['tag']}>{megaTags}</span>
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
