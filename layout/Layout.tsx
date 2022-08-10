import styles from './Layout.module.css';
import cn from 'classnames';
import { FunctionComponent, KeyboardEvent, useRef, useState } from 'react';
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { LayoutProps } from './Layout.props';
import { Sidebar } from './Sidebar/Sidebar';
import { AppContextProvider, IAppContext } from '../context/app.context';
import { Up } from '../components';

const Layout = ({children}: LayoutProps): JSX.Element => {
  
  const bodyRef = useRef<HTMLDivElement>(null);

  const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState<boolean>(false);

  const skipContentAction = (key: KeyboardEvent): void => {
    if (key.code === 'Space' || key.code === 'Enter') {
      key.preventDefault();
      bodyRef.current?.focus();
    }
    
    if (key.code === 'Tab' || key.code === 'Space' || key.code === 'Enter') {
      setIsSkipLinkDisplayed(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <a 
        className={cn(styles.skipLink, {
          [styles.displayed]: isSkipLinkDisplayed,
        })} 
        tabIndex={1}
        onFocus={():void => setIsSkipLinkDisplayed(true)}
        onKeyDown={(key: KeyboardEvent): void => skipContentAction(key)}
      >
        Сразу к содержанию
      </a>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <main className={styles.body} ref={bodyRef} tabIndex={0} role='main'>
        {children}
      </main>
      <Footer className={styles.footer} />
      <Up />
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>
  (Component: FunctionComponent<T>): FunctionComponent<T> => {
  const withLayoutComponent = (props: T): JSX.Element => {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    );
  };
  return withLayoutComponent;
};