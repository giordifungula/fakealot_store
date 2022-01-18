import React from 'react';
import { useHistory } from 'react-router-dom';
// @material-ui
import { Box, InputBase, Button } from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';
import AppContext from 'AppContext';
// @local
import useStyles from './styles';

const Search = () => {
	const { searchProducts, setQuery, query } = React.useContext(AppContext);

	const history = useHistory();
	const classes = useStyles();

	const storeQuery = (value: string) => {
		const query = value.split(' ').join(' ');
		setQuery ? setQuery(query) : null;
	};

	const search = () => {
		if (query && query.length > 0) {
			setQuery ? setQuery('') : null;

			searchProducts(query);
			history.push(`/search/${query}`);
		}
	};

	const handleKeyPress = (event: any) => {
		if (event.key === 'Enter') {
			search();
		}
	};

	return (
		<Box
			flexGrow={1}
			style={{
				display: 'flex',
			}}
		>
			<Box flexGrow={1}>
				<div className={classes.searchBox}>
					<InputBase
						placeholder="Search for any products, or brands"
						value={query}
						onChange={(e) => {
							storeQuery(e.target.value);
						}}
						onKeyPress={handleKeyPress}
						inputProps={{
							'aria-label':
								'Search products, brands and categories',
						}}
						style={{
							width: '100%',
							padding: '0 10px 0 10px',
							height: '100%',
						}}
						endAdornment={<SearchIcon onClick={search} />}
					/>
				</div>
			</Box>
			<Box className={classes.searchBtn}>
				<Button
					style={{
						height: '95%',
						width: '100%',
						color: 'white',
					}}
					variant="contained"
					color="primary"
					onClick={() => search()}
				>
					Search
				</Button>
			</Box>
		</Box>
	);
};

export default Search;
