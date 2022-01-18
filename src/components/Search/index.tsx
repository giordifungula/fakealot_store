import React from 'react';
// @components
import GlobalContainer from 'components/utils/Container';
import AppContext from 'AppContext';
// @local
import Query from './Query';
import CurrentPath from './CurrentPage';
import { Banner } from './Banner';

const SearchContainer = () => {
	const { sortedProducts, query } = React.useContext(AppContext);

	return (
		<GlobalContainer>
			<Query sortedProducts={sortedProducts} query={query}>
				<CurrentPath />
				<Banner products={sortedProducts} xs={3} />
			</Query>
		</GlobalContainer>
	);
};

export default SearchContainer;
