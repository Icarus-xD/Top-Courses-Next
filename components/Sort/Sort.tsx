import { SortEnum, SortProps } from './Sort.props';
import styles from './Sort.module.css';
import SortIcon from './sort.svg';
import cn from 'classnames';

export const Sort = ({className, sort, setSort, ...props}: SortProps): JSX.Element => {
  return (
    <div className={cn(styles.sort, className)} {...props}>
      <div id='sort' className={styles.sortName}>Сортировка</div>
      <button
        id='rating'
        className={cn({
          [styles.active]: sort === SortEnum.Rating,
        })}
        onClick={(): void => setSort(SortEnum.Rating)}
        aria-selected={sort === SortEnum.Rating}
        aria-lebelledby='sort rating'
      >
        <SortIcon className={styles.icon} />
        По&nbsp;рейтингу
      </button>
      <button
        id='price'
        className={cn({
          [styles.active]: sort === SortEnum.Price,
        })}
        onClick={(): void => setSort(SortEnum.Price)}
        aria-selected={sort === SortEnum.Price}
        aria-lebelledby='sort price'
      >
        <SortIcon className={styles.icon} />
        По&nbsp;цене
      </button>
    </div>
  );
};