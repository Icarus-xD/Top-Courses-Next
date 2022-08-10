import { LevelCategory, PageModel } from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/product.interface';

export interface TopPageComponentProps extends Record<string, unknown> {
	firstCategory: LevelCategory;
	page: PageModel;
	products: ProductModel[];
}