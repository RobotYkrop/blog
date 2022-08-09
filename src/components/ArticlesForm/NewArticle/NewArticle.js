import { useDispatch, useSelector } from 'react-redux';

import { postCreateArticle } from '../../BlogApi/BlogApi';
import FormArticle from '../FormArticle';

const NewArticle = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.blogSlice);

  const createArticle = ({ title, description, body }, tagList) => {
    dispatch(postCreateArticle({ title, description, body, tagList, token }));
  };

  return <FormArticle formSubmit={createArticle} />;
};

export default NewArticle;
