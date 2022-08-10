import styles from './Rating.module.css';
import cn from 'classnames';
import StarIcon from './star.svg';
import { RatingProps } from './Rating.props';
import { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef, useRef } from 'react';

export const Rating = forwardRef((
  {isEditable = false, rating, setRating, error, tabIndex, ...props}: RatingProps,
  ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
  
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

  const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    constructRating(rating);
  }, [rating, tabIndex]);

  const changeDisplay = (i: number): void => {
    isEditable && constructRating(i);
  };

  const onClick = (i: number): void => {
    isEditable && setRating && setRating(i);
  };

  const computeFocus= (r: number, i: number): number => {
    if (!isEditable) {
      return -1;
    }

    if (!r && i === 0) {
      return tabIndex ?? 0;
    }

    if (r === i + 1) {
      return tabIndex ?? 0;
    }

    return -1;
  };

  const handleKey = (e: KeyboardEvent): void => {
    if (!isEditable || !setRating) {
      return;
    }

    if (e.code === 'ArrowRight' || e.code === 'ArrowUp') {
      e.preventDefault();
      rating ? setRating(rating < 5 ? ++rating : 5) : setRating(1);
      ratingArrayRef.current[rating - 1]?.focus();
    } else if (e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
      e.preventDefault();
      rating ? setRating(rating > 1 ? --rating : 1) : setRating(1);
      ratingArrayRef.current[rating - 1]?.focus();
    }
  };

  const constructRating = (currentRating: number): void => {
    const updatedArray = ratingArray.map((_: JSX.Element, i: number) => {
      return (
        <span
          className={cn(styles.star, {
            [styles.filled]: i < currentRating,
            [styles.editable]: isEditable,
          })} 
          onMouseEnter={(): void => changeDisplay(i + 1)}
          onMouseLeave={(): void => changeDisplay(rating)}
          onClick={(): void => onClick(i + 1)}
          onKeyDown={handleKey}
          tabIndex={computeFocus(rating, i)}
          ref={(r: HTMLSpanElement): number | undefined => ratingArrayRef.current?.push(r)}
          role={isEditable ? 'slider' : ''}
          aria-label={isEditable ? 'Укажите рейтинг' : ('рейтинг' + rating)}
          aria-valuenow={rating}
          aria-valuemax={5}
          aria-valuemin={1}
          aria-invalid={!!error}
        >
          <StarIcon />
        </span>
        
      );
    });
    setRatingArray(updatedArray);
  };

  return (
    <div 
      className={cn(styles.rating, {
        [styles.error]: error,
      })} 
      ref={ref} 
      {...props} 
    >
      {ratingArray.map((r, i) => <span key={i}>{r}</span>)}
      {error && <span role='alert' className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
});