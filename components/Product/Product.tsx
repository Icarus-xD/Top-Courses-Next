import { Card } from '../Card/Card';
import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import cn from 'classnames';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { priceRu, declOfNumber } from '../../helpers/helpers';
import { Button } from '../Button/Button';
import { Divider } from '../Divider/Divider';
import Image from 'next/image';
import { ForwardedRef, forwardRef, Fragment, useRef, useState } from 'react';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { motion } from 'framer-motion';

export const Product = motion(
  forwardRef((
    {product, className, ...props}: ProductProps,
    ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
  
  const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);

  const reviewRef = useRef<HTMLDivElement>(null);

  const variants = {
    visible: {opacity: 1, height: 'auto'},
    hidden: {opacity: 0, height: 0},
  };

  const scrollToReview = (): void => {
    setIsReviewOpened(true);
    reviewRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
    reviewRef.current?.focus();
  };

  return (
    <div className={className} ref={ref} {...props}>
      <Card className={styles.product}>
        <div className={styles.logo}>
          <img
            src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
            alt={product.title}
            width={70}
            height={70}
          />
        </div>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.price}>
          <span className='visualyHidden'>цена</span>
          {priceRu(product.price)}
          {
            product.oldPrice && 
            <Tag className={styles.oldPrice} color='green'>
              <span className='visualyHidden'>скидка</span>
              {priceRu(product.price - product.oldPrice)}
            </Tag>
          }
          </div>
        <div className={styles.credit}>
          <span className='visualyHidden'>кредит</span>
          {priceRu(product.credit)}/
          <span className={styles.month}>мес</span>
        </div>
        <div className={styles.rating}>
        <span className='visualyHidden'>{`рейтинг ${product.reviewAvg ?? product.initialRating}`}</span>
          <Rating rating={product.reviewAvg ?? product.initialRating} />
        </div>
        <div className={styles.tags}>
          {
            product.categories.map(c => (
              <Tag key={c} className={styles.category}>{c}</Tag>
            ))
          }
        </div>
        <div className={styles.priceTitle} aria-hidden>цена</div>
        <div className={styles.creditTitle} aria-hidden>в кредит</div>
        <div className={styles.ratingTitle}>
          <a href='#ref' onClick={scrollToReview}>
            {product.reviewCount} 
            {declOfNumber(product.reviewCount, [' отзыв', ' отзыва', ' отзывов'])}
          </a>
        </div>
        <Divider className={cn(styles.hr, styles.hr1)} />
        <div className={styles.description}>{product.description}</div>
        <div className={styles.features}>
          {product.characteristics.map(c => (
            <div key={c.name} className={styles.characteristic}>
              <span className={styles.characteristicName}>{c.name}</span>
              <span className={styles.characteristicDots}></span>
              <span className={styles.characteristicValue}>{c.value}</span>
            </div>
          ))}
        </div>
        <div className={styles.advBlock}>
          {product.advantages &&
            <div className={styles.advantages}>
              <div className={styles.advTitle}>Преимущества</div>
              {product.advantages}
            </div>
          }
          {product.disadvantages &&
            <div className={styles.disadvantages}>
              <div className={styles.advTitle}>Недостатки</div>
              {product.disadvantages}
            </div>
          }
        </div>
        <Divider className={cn(styles.hr, styles.hr2)} />
        <div className={styles.actions}>
          <Button appearance='primary'>Узнать подробнее</Button>
          <Button 
            className={styles.button} 
            appearance='ghost' 
            arrow={isReviewOpened ? 'down' : 'right'}
            onClick={(): void => setIsReviewOpened(prev => !prev)}
            aria-expended={isReviewOpened}
          >
            Читать отзывы
          </Button>
        </div>
      </Card>
      <motion.div
        animate={isReviewOpened ? 'visible' : 'hidden'}
        variants={variants}
        initial='hidden'
        tabIndex={-1}
      >
        <Card 
          className={styles.reviews} 
          color='grey'
          ref={reviewRef}
          tabIndex={isReviewOpened ? 0 : -1}
        >
          {
            product.reviews.map(r => (
              <Fragment key={r._id}>
                <Review review={r} />
                <Divider />
              </Fragment>
            ))
          }
          <ReviewForm productId={product._id} isOpened={isReviewOpened} />
        </Card>
      </motion.div>
    </div>
  );
}));