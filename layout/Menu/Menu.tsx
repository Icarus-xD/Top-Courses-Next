import { KeyboardEvent, useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AppContext } from '../../context/app.context';
import {FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import styles from './Menu.module.css';
import cn from 'classnames';
import { firstLevelMenu } from '../../helpers/helpers';
import { motion, useReducedMotion } from 'framer-motion';


export const Menu = (): JSX.Element => {

  const {menu, setMenu, firstCategory} = useContext(AppContext);

  const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();

  const router = useRouter();

  const shouldReduceMotion = useReducedMotion();

  const variants = {
		visible: {
			marginBottom: 20,
			transition: shouldReduceMotion ? {} : {
				when: 'beforeChildren',
				staggerChildren: 0.1
			}
		},
		hidden: { marginBottom: 0 }
	};

	const variantsChildren = {
		visible: {
			opacity: 1,
			height: 29
		},
		hidden: { opacity: 0, height: 0 }
	};

  const openSecondLevel = (secondCategory: string): void => {
    setMenu && setMenu(menu.map(m =>  {
      if (m._id.secondCategory === secondCategory) {
        setAnnounce(m.isOpened ? 'closed' : 'opened');
        m.isOpened = !m.isOpened;
      } 
      return m;
    }));
  };

  const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string): void => {
    if (key.code === 'Space' || key.code === 'Enter') {
      key.preventDefault();
      openSecondLevel(secondCategory);
    }
  };

  const buildFirstLevel = (): JSX.Element => {
    return (
      <ul>
        {
          firstLevelMenu.map(m => (
            <li key={m.route} aria-expended={m.id === firstCategory}>
              <Link href={`/${m.route}`}>
                <a>
                  <div className={cn(styles.first, {
                    [styles.firstActive]: m.id === firstCategory,
                  })}>
                    {m.icon}
                    <span>{m.name}</span>
                  </div>
                </a>
              </Link>
              {m.id === firstCategory && buildSecondLevel(m)}
            </li>
          ))
        }
      </ul>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem): JSX.Element => {
    return (
      <ul className={styles.secondWrapper}>
        {
          menu.map(m => {
            if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
              m.isOpened = true;
            }

            return (
              <li key={m._id.secondCategory}>
                <button
                  className={styles.second} 
                  onClick={(): void => openSecondLevel(m._id.secondCategory)}
                  onKeyDown={(key: KeyboardEvent): void => openSecondLevelKey(key, m._id.secondCategory)}
                  aria-expanded={m.isOpened}
                >
                  {m._id.secondCategory}
                </button>
                <motion.ul 
                  layout
                  variants={variants}
                  initial={m.isOpened ? 'visible' : 'hidden'}
                  animate={m.isOpened ? 'visible' : 'hidden'}
                  className={cn(styles.secondBlock)}

                >
                  {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
                </motion.ul>
              </li>
            );
          })
        }
      </ul>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean): JSX.Element[] => {
    return pages.map(page => (
      <motion.li key={page.title} variants={variantsChildren}>
        <Link href={`/${route}/${page.alias}`}>
          <a 
            className={cn(styles.third, {
              [styles.thirdActive]: `/${route}/${page.alias}` === router.asPath,
            })} 
            tabIndex={isOpened ? 0 : -1} 
            aria-current={`/${route}/${page.alias}` === router.asPath ? 'page' : false}
          >
            {page.category}
          </a>
        </Link>
      </motion.li>
    ));
  };

  return (
    <nav className={styles.menu} role='navigation'>
      {announce && <span role='log' className='visualyHidden'>{announce === 'opened' ? 'развёрнуто' : 'свёрнуто'}</span>}
      {buildFirstLevel()}
    </nav>
  );
};