import { Link } from 'react-router-dom';

import { convertCreatedDate, mapTags, titleNull } from '../utilites/utilites';

import list from './PostItem.module.scss';

const PostItem = ({ slug, title, description, createdAt, tagList, author }) => {
  const megaTitle = titleNull(title);
  const megaDate = convertCreatedDate(createdAt);
  const megaTags = mapTags(tagList);
  return (
    <li className={list['post']}>
      <div>
        <Link to={`${slug}`}>
          <h2 className={list['title']}>{megaTitle}</h2>
        </Link>
        <span className={list['tag']}>{megaTags}</span>
        <p className={list['description']}>{description}</p>
      </div>
      <div className={list['user']}>
        <div className={list['user-name']}>
          <span>{author.username}</span>
          <span className={list['created-date']}>{megaDate}</span>
        </div>
        <img className={list['image']} src={author.image} />
      </div>
    </li>
  );
};

export default PostItem;
