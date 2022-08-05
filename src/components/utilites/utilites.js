import moment from 'moment';

export const convertCreatedDate = (date) => {
  return moment(date).format('DD MMM, YYYY');
};

export const titleNull = (title) => {
  return !title.trim().length ? 'Заголовок отсутствует' : title;
};

export const mapTags = (tagList) => {
  return tagList.length === 0 ? 'Теги отсутствуют' : tagList.map((tag) => tag);
};
