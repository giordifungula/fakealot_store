import React from 'react';
// @components
import GlobalContainer from 'components/utils/Container';
import Query from 'components/Pages/Query';
import AppContext from '../../AppContext';

const SearchContainer = () => {
	const { sortedProducts, query } = React.useContext(AppContext);

	return (
		<GlobalContainer>
			<Query sortedProducts={sortedProducts} query={query}>
				<h1>Hello</h1>
			</Query>
		</GlobalContainer>
	);
};

export default SearchContainer;
