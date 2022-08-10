import { SearchProps } from './Search.props';
import styles from './Search.module.css';
import GlassIcon from './glass.svg';
import { Button } from '../Button/Button';
import { KeyboardEvent, useState } from 'react';
import { Input } from '../Input/Input';
import { useRouter } from 'next/router';

export const Search = (props: SearchProps): JSX.Element => {

  const [search, setSearch] = useState<string>('');

  const router = useRouter();

  const goToSearch = (): void => {
    router.push({
      pathname: '/search',
      query: {
        q: search,
      },
    });
  };

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Enter') {
      goToSearch();
    }
  };

  return (
    <form className={styles.search} {...props} role='search'>
      <Input
        className={styles.input}
        value={search}
        placeholder='Поиск...'
        onChange={(e): void => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        className={styles.button}
        appearance='primary'
        onClick={goToSearch}
        aria-label='Искать по сайту'
      >
        <GlassIcon />
      </Button>
    </form>
  );
};