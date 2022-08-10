import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { ReviewProps } from './Review.props';
import styles from './Review.module.css';
import cn from 'classnames';
import UserIcon from './user.svg';
import { Rating } from '../Rating/Rating';

export const Review = ({review, className, ...props}: ReviewProps): JSX.Element => {
  
  const {name, title, description, createdAt, rating} = review;
  
  return (
    <div className={cn(styles.review, className)} {...props}>
      <UserIcon className={styles.avatar} />
      <div className={styles.title}>
        <span className={styles.name}>{name}:&nbsp;&nbsp;</span>
        <span>{title}</span>
      </div>
      <div className={styles.date}>
        {format(new Date(createdAt), 'dd MMMM yyyy', {locale: ru})}
      </div>
      <Rating rating={rating} />
      <div className={styles.description}>
        {description}
      </div>
    </div>
  );
};