import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import CloseIcon from './close.svg';
import { Input } from '../Input/Input';
import { Textarea } from '../Textarea/Textarea';
import { Rating } from '../Rating/Rating';
import { Button } from '../Button/Button';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../helpers/api';
import { useState } from 'react';

export const ReviewForm = ({productId, isOpened, className, ...props}: ReviewFormProps): JSX.Element => {

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const {register, control, handleSubmit, formState: {errors}, reset, clearErrors} = useForm<IReviewForm>();

  const onSubmit = async (formData: IReviewForm): Promise<void> => {
    
    try {
      const {data} = await axios
        .post<IReviewSentResponse>(API.review.createDemo, {...formData, productId});
      
      if (data.message) {
        setIsSuccess(true);

        reset();
      } else { 
        setError('Что-то пошло не так...');
      }

    } catch(err) {
      setError((err as Error).message);
    }
  };  

  return (
    <form onSubmit={handleSubmit(onSubmit)} tabIndex={-1}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input
          {...register(
            'name', 
            {required: {
              value: true, 
              message: 'Заполните имя'
            }}
          )}
          className={styles.name}
          error={errors.name}
          placeholder='Имя'
          tabIndex={isOpened ? 0 : -1} 
          aria-invalid={!!errors.name}
        />
        <Input 
          {...register(
            'title',
            {required: {
              value: true,
              message: 'Заполните заголовок'
            }}
          )} 
          className={styles.title}
          error={errors.title}
          placeholder='Заголовок отзыва'
          tabIndex={isOpened ? 0 : -1} 
          aria-invalid={!!errors.title}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name='rating'
            rules={
              {required: {
                value: true,
                message: 'Поставьте оценку'
              }}
            }
            render={({field}): JSX.Element => (
              <Rating 
                isEditable 
                rating={field.value} 
                ref={field.ref} 
                setRating={field.onChange}
                error={errors.rating}
                tabIndex={isOpened ? 0 : -1} 
              />
            )}
          />
        </div>
        <Textarea 
          {...register(
            'description',
            {required: {
              value: true,
              message: 'Заполните отзыв'
            }}
          )} 
          className={styles.description} 
          error={errors.description}
          placeholder='Текст отзыва'
          tabIndex={isOpened ? 0 : -1} 
          aria-label='Текст отзыва'
          aria-invalid={!!errors.description}
        />
        <div className={styles.submit}>
          <Button appearance='primary' tabIndex={isOpened ? 0 : -1} onClick={(): void => clearErrors()}>Отправить</Button>
          <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      {
        isSuccess &&
        <div className={cn(styles.message, styles.success)} role='alert'>
          <div className={styles.messageTitle}>Ваш отзыв отправлен</div>
          <button 
            className={styles.messageClose} 
            onClick={(): void => setIsSuccess(false)}
            aria-label='Закрыть оповещение'
            >
            <CloseIcon />
          </button>
          <div className={styles.messageDescription}>Спасибо, ваш отзыв будет опубликован после проверки.</div>
        </div>
      }
      {
        error &&
        <div className={cn(styles.message, styles.error)} role='alert'>
          <div className={styles.messageTitle}>Что-то пошло не так, попробуйте обновить страницу</div>
          <button 
            className={styles.messageClose} 
            onClick={(): void => setError('')}
            aria-label='Закрыть оповещение'
          >
            <CloseIcon />
          </button>
          <div className={styles.messageDescription}>{error}</div>
        </div>
      }
    </form>
  );
};