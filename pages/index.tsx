import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/api';
import Error from 'next/error';

const Home = ({menu}: HomeProps): JSX.Element => {

	const [rating, setRating] = useState<number>(4);

	return <Error statusCode={404} />;
};

export default withLayout(Home);

export const getStaticProps: GetStaticProps = async () => {

	const firstCategory = 0 as number;
	const {data: menu} = await axios
		.post<MenuItem[]>(API.topPage.find, {
			firstCategory
		});
	
	return {
		props: {
			menu,
			firstCategory,
		},
	};
};

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}