import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { Checkbox } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { red } from '@mui/material/colors';

import { deleteLikes, postLikes } from '../BlogApi/BlogApi';
import list from '../PostItem/PostItem.module.scss';

const SystemLikes = ({ slug, favorited, favoritesCount }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.blogSlice);
  const [checkFavorite, setCheckFavorite] = useState(favorited);
  const [Count, setFavoriteCount] = useState(favoritesCount);

  const likeButtonHandler = () => {
    if (!checkFavorite) {
      dispatch(postLikes({ slug, token })).then((res) => {
        if (res.payload.article.favorited) {
          setCheckFavorite(true);
          setFavoriteCount(res.payload.article.favoritesCount);
        }
      });
    } else {
      dispatch(deleteLikes({ slug, token })).then((res) => {
        if (!res.payload.article.favorited) {
          setCheckFavorite(false);
          setFavoriteCount(res.payload.article.favoritesCount);
        }
      });
    }
  };
  return (
    <div>
      {token ? (
        <Checkbox
          sx={{
            mr: '5px',
            '&.Mui-checked': {
              color: red[500],
            },
          }}
          icon={<FavoriteBorder />}
          onChange={likeButtonHandler}
          checkedIcon={<Favorite />}
          checked={checkFavorite}
        />
      ) : (
        <Checkbox icon={<FavoriteBorder />} disabled />
      )}
      <span className={list['count']}>{Count}</span>
    </div>
  );
};

export default SystemLikes;
