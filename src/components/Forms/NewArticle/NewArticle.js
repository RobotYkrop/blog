import { Button, Alert, AlertTitle, Box, TextField } from '@mui/material';
import { uniqueId } from 'lodash';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import inputErr from '../../App/App.module.scss';
import { postCreateArticle } from '../../BlogApi/BlogApi';

import article from './NewArticle.module.scss';

const NewArticle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, isError } = useSelector((state) => state.blogSlice);

  const [tagList, setTagList] = useState([]);
  const [tagValue, setTagValue] = useState('');

  const handleClickAddTag = () => {
    setTagList([...tagList, tagValue]);
    setTagValue('');
  };

  const handleClickDeleteTag = (id) => {
    setTagList(tagList.filter((_, index) => index !== id));
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { title, description, body } = data;
    dispatch(postCreateArticle({ title, description, body, tagList, token }));
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
        <input
          placeholder="Title"
          {...register('title', {
            required: 'Title is required',
            minLength: { value: 1, message: 'Min lenght is 1' },
          })}
        />
        {errors.title && <span className={inputErr['error']}>{errors.title.message}</span>}
      </label>
      <label className={article['article-label']}>
        Short description
        <input
          placeholder="Description"
          {...register('description', {
            required: 'Description is required',
            minLength: { value: 1, message: 'Min lenght is 1' },
          })}
        />
        {errors.description && <span className={inputErr['error']}>{errors.description.message}</span>}
      </label>
      <label className={article['article-label']}>
        Text
        <textarea
          className={article['body']}
          placeholder="Text"
          {...register('body', {
            required: 'Text is required',
            minLength: { value: 1, message: 'Min lenght is 1' },
          })}
        />
        {errors.description && <span className={inputErr['error']}>{errors.description.message}</span>}
      </label>
      <span>Tags</span>
      <div>
        {tagList &&
          tagList.map((item, id) => (
            <Box key={uniqueId()} sx={{ mb: 2 }}>
              <TextField id={item} value={item} size="small" sx={{ mr: 2 }} {...register('tagList')} />
              <Button
                variant="outlined"
                color="error"
                sx={{
                  textTransform: 'none',
                }}
                onClick={() => handleClickDeleteTag(id)}
              >
                Delete
              </Button>
            </Box>
          ))}
        {/* поле создания тега */}
        <TextField
          id="tag"
          value={tagValue}
          variant="outlined"
          size="small"
          sx={{
            mr: 1,
          }}
          {...register('tagList')}
          onChange={(event) => {
            setTagValue(event.target.value);
          }}
        />

        <Button
          variant="outlined"
          sx={{
            mb: 2,
            textTransform: 'none',
          }}
          onClick={handleClickAddTag}
        >
          Add Tag
        </Button>
      </div>
      <Button type="submit" variant="contained" className={article['send']}>
        Send
      </Button>
    </form>
  );
};

export default NewArticle;
