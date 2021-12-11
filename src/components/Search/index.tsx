import React from 'react';
// @components
import GlobalContainer from 'components/utils/Container';
import Query from './Query';
import CurrentPath from './CurrentPage';
import { Banner } from './Banner';
import AppContext from '../../AppContext';

const SearchContainer = () => {
	const { sortedProducts, query } = React.useContext(AppContext);
	// TODO: Filter based on query instead from API?

	return (
		<GlobalContainer>
			<Query sortedProducts={sortedProducts} query={query}>
				<CurrentPath />
				<Banner numOfProds={18} products={sortedProducts} xs={3} />
			</Query>
		</GlobalContainer>
	);
};

export default SearchContainer;
