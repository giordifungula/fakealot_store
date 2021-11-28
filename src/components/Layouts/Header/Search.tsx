import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// @material-ui
import { Box, InputBase, Button } from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './styles';

const Search = () => {
	// consume searchProducts from context?
	const history = useHistory();
	const classes = useStyles();
	const [query, setQuery] = useState('');

	const storeQuery = (value: string) => {
		const query = value.split(' ').join(' ');
		console.log('query', query);
		setQuery(query);
	};

	const search = () => {
		if (query.length > 0) {
			setQuery('');
			// searchProducts(query);
			history.push(`/search/${query}`);
			// todo add the search page
		}
	};

	// todo add types here
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
						placeholder="Search for any product, item "
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
