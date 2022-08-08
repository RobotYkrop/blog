import moment from 'moment';

export const convertCreatedDate = (date) => {
  return moment(date).format('DD MMM, YYYY');
};

export const titleNull = (title) => {
  return !title.trim().length ? 'Заголовок отсутствует' : title;
};
