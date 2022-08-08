import { uniqueId } from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoaderIcon from 'react-loader-icon';
import { Alert, AlertTitle, Avatar, Button, Checkbox } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import Favorite from '@mui/icons-material/Favorite';
import { FavoriteBorder } from '@mui/icons-material';

import list from '../Article/Article.module.scss';
import { getOneArticle } from '../BlogApi/BlogApi';
import { convertCreatedDate } from '../utilites/utilites';
import ModalDelete from '../ModalDelete/ModalDelete';

const Article = () => {
  const { oneArticle, author, isError, isLoading, token } = useSelector((state) => state.blogSlice);
  const { title, description, createdAt, tagList, body, favoritesCount } = oneArticle;
  const { image, username } = author;
  const megaDate = convertCreatedDate(createdAt);
  const { slug } = useParams();
  const dispatch = useDispatch();

  // const [checkFavorite, setCheckFavorite] = useState(favorited);
  // const [Count, setFavoriteCount] = useState(favoritesCount);

  // const likeButtonHandler = (e) => {
  //   if (e.target.checked) {
  //     dispatch(postLikes({ slug, token }));
  //     setCheckFavorite(true);
  //     setFavoriteCount(Count + 1);
  //   } else {
  //     dispatch(deleteLikes({ slug, token }));
  //     setCheckFavorite(false);
  //     setFavoriteCount(Count - 1);
  //   }
  // };

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
                    <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                  ) : (
                    <Checkbox icon={<FavoriteBorder />} disabled />
                  )}
                  <span>{favoritesCount}</span>
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
                <span>{username}</span>
                <span className={list['created-date']}>{megaDate}</span>
              </div>
              <Avatar className={list['image']} src={image} alt={username} />
              {token && (
                <div className={list['buttons']}>
                  <ModalDelete />
                  <Link to={'edit'}>
                    <Button className={list['edit']}>Edit</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <p>{body}</p>
        </section>
      )}
    </>
  );
};

export default Article;

// function App() {
//   const [allCards, setAllCards] = React.useState([]);
//   const [loading, setLoading] = React.useState(false);

//   React.useEffect(() => {
//     setLoading(true);

//     const apiUrl = 'https://test-api-921f7-default-rtdb.firebaseio.com/cards.json';
//     axios.get(apiUrl).then((resp) => {
//       const allCards = resp.data;
//       setAllCards(allCards);
//       setLoading(false);
//     });
//   }, []);

//   const likeButtonHandler = (id) => {
//     setAllCards(allCards.map((item) => (item.id === id ? { ...item, liked: !item.liked } : item)));
//   };

//   return (
//     <div className="app">
//       <div>
//         {loading
//           ? 'Loading...'
//           : allCards.map(({ id, name, liked, link }) => (
//               <div
//                 key={id}
//                 style={{
//                   border: '1px solid black',
//                   margin: '1rem',
//                   padding: '1rem',
//                 }}
//               >
//                 <div>Name: {name}</div>
//                 <div>Liked: {liked.toString()}</div>
//                 <img src={link} style={{ maxWidth: '100px' }} />
//                 <button onClick={() => likeButtonHandler(id)}>{liked ? 'unlike me' : 'like me'}</button>
//               </div>
//             ))}
//       </div>
//     </div>
//   );
// }
