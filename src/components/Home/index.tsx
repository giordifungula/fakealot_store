import React from 'react';
import { Product } from '@chec/commerce.js/types/product';
// @components
import GlobalContainer from 'components/utils/Container';

interface IProps {
	products: Product | null;
	searchProducts: (searchText: string) => void; // TODO: define type
}

const Home = ({ products }: IProps) => {
	return (
		<GlobalContainer>
			<h1 style={{ marginTop: '20em' }}>Home</h1>
		</GlobalContainer>
	);
};

export default Home;
