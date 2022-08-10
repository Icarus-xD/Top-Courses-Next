import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { withLayout } from '../../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../../interfaces/menu.interface';
import { LevelCategory, PageModel } from '../../interfaces/page.interface';
import { ParsedUrlQuery } from 'node:querystring';
import { ProductModel } from '../../interfaces/product.interface';
import { firstLevelMenu } from '../../helpers/helpers';
import { TopPageComponent } from '../../page-components';
import { API } from '../../helpers/api';
import Head from 'next/head';
import { Error404 } from '../404';

function TopPage({ firstCategory, page, products }:TopPageProps): JSX.Element {
	
	if (!page || !products) {
		return <Error404 />;
	}
	
	return (
		<>
			<Head>
				<title>{page.metaTitle}</title>
				<meta name='description' content={page.metaDescription} />
				<meta property='og:title' content={page.metaTitle} />
				<meta property='og:description' content={page.metaDescription} />
				<meta property='og:type' content='article' />
			</Head>
			<TopPageComponent 
				firstCategory={firstCategory} 
				page={page} 
				products={products} 
			/>
		</>
	);
}

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {

	let paths: string[] = [];

	for (const m of firstLevelMenu) {
		const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
			firstCategory: m.id,
		});

		paths = paths.concat(menu.flatMap(i => i.pages.map(p => `/${m.route}/${p.alias}`)));
	}

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
	
  if (!params) {
		return {
			notFound: true
		};
	}
  
	const firstCategoryItem = firstLevelMenu.find(m => m.route === params.type);

	if (!firstCategoryItem) {
		return {
			notFound: true,
		};
	}

	try {

		const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
			firstCategory: firstCategoryItem.id,
		});

		if (!menu.length) {
			return {
				notFound: true,
			};
		}

		const { data: page } = await axios.get<PageModel>(API.topPage.byAlias + params.alias);
		const { data: products } = await axios.post<ProductModel[]>(API.product.find, {
			category: page.category,
			limit: 10
		});

		return {
			props: {
				menu,
				firstCategory: firstCategoryItem.id,
				page,
				products
			}
		};

	} catch {

		return {
			notFound: true
		};
	}
};

interface TopPageProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: LevelCategory;
	page: PageModel;
	products: ProductModel[];
}