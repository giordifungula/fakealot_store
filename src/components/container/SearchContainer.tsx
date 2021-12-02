import React from 'react';
// @components
import GlobalContainer from 'components/utils/Container';
import Query from 'components/Pages/Query';
import CurrentPath from 'components/Pages/CurrentPage';
import Banner from 'components/Banner/Banner';
import AppContext from '../../AppContext';

const SearchContainer = () => {
	const { sortedProducts, query } = React.useContext(AppContext);

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
