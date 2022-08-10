import { Button, Alert, AlertTitle, Box, InputBase } from '@mui/material';
import { uniqueId } from 'lodash';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import inputErr from '../../components/App/App.module.scss';

import article from './Article.module.scss';

const FormArticle = ({ oneArticle, formSubmit }) => {
  const schema = yup
    .object()
    .shape({
      title: yup.string().required('Title is required'),
      description: yup.string().required('Description is required'),
      body: yup.string().required('Text is required'),
    })
    .required();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.blogSlice);
  const [tags, setTagList] = useState(oneArticle?.tagList || []);
  const [value, setValue] = useState('');

  const addTag = () => {
    setTagList([...tags, value]);
    setValue('');
  };

  const deleteTag = (id) => {
    setTagList(tags.filter((_, index) => index !== id));
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: oneArticle?.title || '',
      description: oneArticle?.description || '',
      body: oneArticle?.body || '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    formSubmit({ ...data }, tags);
    console.log(data);
    navigate('../articles', { replace: true });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={article['article']}>
      {isError && (
        <Alert severity="error">
          <AlertTitle>Ошибка</AlertTitle>
          При загрузке данных появилась ошибка — <strong>возможно, проблема с сервером</strong>
        </Alert>
      )}
      <h2 className={article['article-title']}>Create new article</h2>
      <label className={article['article-label']}>
        Title
        <InputBase id="title" placeholder="Title" {...register('title')} />
        {errors.title && <span className={inputErr['error']}>{errors.title.message}</span>}
      </label>
      <label className={article['article-label']}>
        Short description
        <InputBase id="description" placeholder="Description" {...register('description')} />
        {errors.description && <span className={inputErr['error']}>{errors.description.message}</span>}
      </label>
      <label className={article['article-label']}>
        Text
        <textarea id="body" className={article['body']} placeholder="Text" {...register('body')} />
        {errors.description && <span className={inputErr['error']}>{errors.description.message}</span>}
      </label>
      Tags
      <div className={article['tags']}>
        {tags &&
          tags.map((item, id) => (
            <Box key={uniqueId()} sx={{ mb: 2 }}>
              <InputBase id={item} value={item} {...register('tagList')} />
              <Button variant="outlined" color="error" onClick={() => deleteTag(id)}>
                Delete
              </Button>
            </Box>
          ))}
        <InputBase
          id="tag"
          value={value}
          variant="outlined"
          {...register('tagList')}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
        <Button variant="outlined" onClick={addTag}>
          Add Tag
        </Button>
      </div>
      <Button type="submit" variant="contained" className={article['send']}>
        Send
      </Button>
    </form>
  );
};

export default FormArticle;
