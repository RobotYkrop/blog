const URL = 'https://blog.kata.academy/api/';

export const getApi = async (url) => {
  const res = await fetch(URL + url);
  if (!res.ok) {
    throw new Error('Не найден API' + `${res.status}`);
  }
  const arr = await res.json();
  console.log(arr);
  return arr;
};

// export const getArticle = async () => {
//   const res = await fetch(getApi('article'));
//   if (!res.ok) {
//     throw new Error('Не найден API' + `${res.status}`);
//   }
//   console.log(res);
//   return await res.json();
// };
