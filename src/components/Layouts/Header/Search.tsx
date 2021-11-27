import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import useStyles from './styles';

interface IProps {
	searchProducts?: () => void;
}

const Search = ({ searchProducts }: IProps) => {
	const history = useHistory();
	const classes = useStyles();
	const [query, setQuery] = useState('');

	const storeQuery = (value: string) => {
		const query = value.split(' ').join(' ');
		setQuery(query);
	};

	const search = () => {
		if (query.length > 0) {
			setQuery('');
			// searchProducts(query);
			history.push(`/search/${query}`);
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
						placeholder="Search products, brands and categories"
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
