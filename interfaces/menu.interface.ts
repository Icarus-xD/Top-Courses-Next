import { LevelCategory } from './page.interface';

interface Id {
  secondCategory: string;
}

export interface PageItem {
  _id: string;
  title: string;
  alias: string;
  category: string;
}

export interface MenuItem {
  _id: Id;
  isOpened?: boolean;
  pages: PageItem[];
}

export interface FirstLevelMenuItem {
  id: LevelCategory;
  route: string;
  name: string;
  icon: JSX.Element;
}