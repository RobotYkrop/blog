import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getOneArticle, putUpdateArticle } from '../../BlogApi/BlogApi';
import FormArticle from '../FormArticle';

const EditArticle = () => {
  const { token, oneArticle } = useSelector((state) => state.blogSlice);
  const { slug } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneArticle(slug));
  }, [dispatch, slug]);

  const formEdit = ({ title, description, body }, tagList) => {
    dispatch(putUpdateArticle({ slug, title, description, body, tagList, token }));
  };
  return <FormArticle oneArticle={oneArticle} formSubmit={formEdit} />;
};

export default EditArticle;
