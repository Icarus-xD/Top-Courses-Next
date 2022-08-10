import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import BooksIcon from './icons/books.svg';
import ProductsIcon from './icons/products.svg';
import { LevelCategory } from '../interfaces/page.interface';
import { FirstLevelMenuItem } from '../interfaces/menu.interface';

export const firstLevelMenu: FirstLevelMenuItem[] = [
  {id: LevelCategory.Courses, route: 'courses', name: 'Курсы', icon: <CoursesIcon />},
  {id: LevelCategory.Services, route: 'services', name: 'Сервисы', icon: <ServicesIcon />},
  {id: LevelCategory.Books, route: 'books', name: 'Книги', icon: <BooksIcon />},
  {id: LevelCategory.Products, route: 'products', name: 'Товары', icon: <ProductsIcon />},
];

export const priceRu = (price: number): string => {
  return Intl.NumberFormat('ru-RU', {
    style: 'currency', 
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(price);
};

export const declOfNumber = (number: number, titles: [string, string, string]): string => {
  
  const cases = [2, 0, 1, 1, 1, 2];

  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 > 5) ? number % 10 : 5]];
};