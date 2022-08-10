import { Menu } from '../Menu/Menu';
import { SidebarProps } from './Sidebar.props';
import Logo from '../logo.svg';
import styles from './Sidebar.module.css';
import { Search } from '../../components';

export const Sidebar = (props: SidebarProps): JSX.Element => {
  return (
    <div className={styles.sidebar} {...props} >
        <Logo className={styles.logo} />
        <Search />
        <Menu />
    </div>
  );
};