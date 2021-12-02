import React from 'react';
// @components
import GlobalContainer from 'components/utils/Container';
import Query from 'components/Pages/Query';
import CurrentPath from 'components/Pages/CurrentPage';
import AppContext from '../../AppContext';

const SearchContainer = () => {
	const { sortedProducts, query } = React.useContext(AppContext);

	return (
		<GlobalContainer>
			<Query sortedProducts={sortedProducts} query={query}>
				<CurrentPath />
			</Query>
		</GlobalContainer>
	);
};

export default SearchContainer;
