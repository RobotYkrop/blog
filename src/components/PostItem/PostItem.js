import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { uniqueId } from 'lodash';

import SystemLikes from '../utilites/systemLikes';
import { convertCreatedDate, titleNull } from '../utilites/utilites';

import list from './PostItem.module.scss';

const PostItem = ({ slug, title, description, createdAt, tagList, author, favoritesCount, favorited }) => {
  const megaTitle = titleNull(title);
  const megaDate = convertCreatedDate(createdAt);

  return (
    <li className={list['post']}>
      <div>
        <div className={list['post-header']}>
          <Link to={`${slug}`}>
            <h2 className={list['title']}>{megaTitle}</h2>
          </Link>
          <SystemLikes favorited={favorited} favoritesCount={favoritesCount} slug={slug} />
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
