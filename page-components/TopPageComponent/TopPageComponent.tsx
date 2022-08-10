import { Advantages, Htag, P, Product, Sort, Tag } from '../../components';
import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import { HHData } from '../../components/HHData/HHData';
import { LevelCategory } from '../../interfaces/page.interface';
import { SortEnum } from '../../components/Sort/Sort.props';
import { useEffect, useReducer } from 'react';
import { sortReducer } from './sort.reducer';
import { useReducedMotion } from 'framer-motion';

export const TopPageComponent = ({page, products, firstCategory}: TopPageComponentProps): JSX.Element => {

  const [{sort, products: sortedProducts}, dispatchSort] = useReducer(sortReducer, {sort: SortEnum.Rating, products});
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    dispatchSort({type: 'reset', initialState: products});
  }, [products]);

  const setSort = (sort: SortEnum): void => {
    dispatchSort({type: sort});
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag='h1'>{page.title}</Htag>
        {products && <Tag size='m' color='grey' aria-label={products.length + 'элементов'}>{products.length}</Tag>}
        <Sort sort={sort} setSort={setSort} />
      </div>
      <div role='list'>
        {sortedProducts && sortedProducts.map(p => <Product key={p._id} layout={shouldReduceMotion ? false : true} product={p} role='list-item' />)}
      </div>
      <div className={styles.hhTitle}>
        <Htag tag='h2'>Вакансии - {page.category}</Htag>
        <Tag size='m' color='red'>hh.ru</Tag>
      </div>
      {firstCategory === LevelCategory.Courses && page.hh && <HHData {...page.hh} />}
      {
        page.advantages && page.advantages.length > 0 &&
        <>
          <Htag tag='h2'>Преимущества</Htag>
          <Advantages advantages={page.advantages} />
        </>
      }
      {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{__html: page.seoText}} />}
      <Htag tag='h2'>Получаемые навыки</Htag>
      {page.tags.map(t => <Tag key={t} className={styles.tag} color='primary'>{t}</Tag>)}
    </div>
  );
};