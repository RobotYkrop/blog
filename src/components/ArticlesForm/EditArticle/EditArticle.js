import { Button, Alert, AlertTitle, Box, TextField } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { uniqueId } from 'lodash';

import { putUpdateArticle } from '../../BlogApi/BlogApi';
import inputErr from '../../App/App.module.scss';
import article from '../NewArticle/NewArticle.module.scss';

const EditArticle = () => {
  const navigate = useNavigate();
  const { oneArticle, isError, token } = useSelector((state) => state.blogSlice);
  const { title, description, body } = oneArticle;
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [tagList, setTagList] = useState(oneArticle.tagList || []);
  const [tagValue, setTagValue] = useState('');

  const addTag = () => {
    setTagList([...tagList, tagValue]);
    setTagValue('');
  };

  const deleteTag = (id) => {
    setTagList(tagList.filter((_, index) => index !== id));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = ({ title, description, body }) => {
    dispatch(putUpdateArticle({ slug, title, description, body, tagList, token }));
    navigate('../articles', { replace: true });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={article['article']}>
      {isError && (
        <Alert severity="error">
          <AlertTitle>Ошибка</AlertTitle>
          При загрузке данных появилась ошибка — <strong>возможно, проблема с сервером</strong>
        </Alert>
      )}
      <h2 className={article['article-title']}>Edit Article</h2>
      <label className={article['article-label']}>
        Title
        <TextField
          defaultValue={title}
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
        <TextField
          defaultValue={description}
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
          defaultValue={body}
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
                onClick={() => deleteTag(id)}
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
          onClick={addTag}
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

export default EditArticle;
