import moment from 'moment';

import list from './PostItem.module.scss';

// const validateArrayChar = (array, validator) => {
//   return array.every((element) => validator.test(element));
// };
//   const arrayChar = new RegExp(/^[a-z0-9,'"\s]+$/i);

const PostItem = ({ title, description, createdAt, tagList, author }) => {
  const convertCreatedDate = moment(createdAt).format('DD MMM, YYYY');
  const titleNull = !title.trim().length ? 'Заголовок отсутствует' : title;
  const tags = tagList.length === 0 ? 'Теги отсутствуют' : tagList.map((tag) => tag);
  return (
    <li className={list['post']}>
      <div>
        <h2 className={list['title']}>{titleNull}</h2>
        <span className={list['tag']}>{tags}</span>
        <p className={list['description']}>{description}</p>
      </div>
      <div className={list['user']}>
        <div className={list['user-name']}>
          <span>{author.username}</span>
          <span className={list['created-date']}>{convertCreatedDate}</span>
        </div>
        <img className={list['image']} src={author.image} />
      </div>
    </li>
  );
};

export default PostItem;
