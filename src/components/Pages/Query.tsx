import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
		color: theme.palette.primary.main,
		margin: '10px 0 40px 0',
	},
}));

interface IQueryProps {
	query: string;
	children: React.ReactNode;
	sortedProducts: any;
}

const Query = ({ children, sortedProducts, query }: IQueryProps) => {
	const classes = Styles();
	const history = useHistory();
	const { name } = useParams<{ name: string }>();

	if (name.trim().length === 0) history.push('/');

	const searchIcon = 'https://img.icons8.com/ios/50/000000/search--v1.png';

	return (
		<section className={classes.root}>
			{sortedProducts.length ? (
				<div style={{ width: '100%' }}>{children}</div>
			) : (
				<div
					style={{
						minHeight: 300,
						textAlign: 'center',
						marginTop: '50px',
					}}
				>
					<div
						style={{
							background: 'white',
							borderRadius: 100,
							width: 100,
							height: 100,
							margin: 'auto',
						}}
					>
						<img
							style={{ height: '100%' }}
							src={searchIcon}
							alt=""
						/>
					</div>
					<h2
						style={{
							fontSize: '1rem',
							fontWeight: 500,
							marginBottom: 15,
						}}
					>{`There are no results for "${
						query.length === 0 ? name : query
					}" yet.`}</h2>
					<p>
						- Check your spelling for typing errors
						<br />- Try searching with short and simple keywords
						<br />- Try searching more general terms - you can then
						filter the search results
					</p>
					<Link to="/">
						<Button
							className={classes.btn}
							variant="contained"
							color="secondary"
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