import React from 'react';
import { Product } from '@chec/commerce.js/types/product';
import { useHistory, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
// @material-ui
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const Styles = makeStyles((theme) => ({
	root: {
		marginTop: `${76}px`,
		marginBottom: 16,
		minHeight: '50vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	btn: {
		color: 'white',
		margin: '10px 0 40px 0',
	},
	searchIconDiv: {
		background: 'white',
		borderRadius: 100,
		width: 100,
		height: 100,
		margin: 'auto',
	},
	searchResultText: {
		fontSize: '1rem',
		fontWeight: 500,
		marginBottom: 15,
	},
	searchDivContainer: {
		minHeight: 300,
		textAlign: 'center',
		marginTop: '50px',
	},
}));

interface IQueryProps {
	query: string | null;
	sortedProducts: Product[] | null;
	children: React.ReactNode;
}

const Query = ({ children, sortedProducts, query }: IQueryProps) => {
	const classes = Styles();
	const history = useHistory();
	const { name } = useParams<{ name: string }>();

	const [saveQuery, setSaveQuery] = React.useState('');

	if (name.trim().length === 0) history.push('/');

	const searchIcon = 'https://img.icons8.com/ios/50/000000/search--v1.png';

	React.useEffect(() => {
		if (query) {
			setSaveQuery(query);
		}
	}, [query]);

	return (
		<section className={classes.root}>
			{sortedProducts && sortedProducts.length ? (
				<div style={{ width: '100%' }}>{children}</div>
			) : (
				<div className={classes.searchDivContainer}>
					<div className={classes.searchIconDiv}>
						<img
							style={{ height: '100%' }}
							src={searchIcon}
							alt="searchIcon"
						/>
					</div>
					<h2
						className={classes.searchResultText}
					>{`There are no results for "${saveQuery}" at this stage 😦. But we are on it!`}</h2>
					<p>
						- Check your spelling for typing errors
						<br />- Try searching with short and simple keywords
						<br />- Try searching more general terms - you can then
						filter the search results
					</p>
					<Link to="/" style={{ textDecoration: 'none' }}>
						<Button
							className={classes.btn}
							variant="contained"
							color="primary"
							size="large"
						>
							Go To HomePage
						</Button>
					</Link>
				</div>
			)}
		</section>
	);
};

export default Query;
