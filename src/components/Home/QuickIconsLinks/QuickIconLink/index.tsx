import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { IQuickIconLinks } from 'Data/quickIconLinks';

interface IQuickIconLink extends IQuickIconLinks {
	searchProducts: (search: string) => void;
}

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: 56,
		padding: 5,
		'&:hover': {
			background: theme.palette.primary.main,
			transition: 'all 0.3s ease-in-out',
			color: 'white',
		},
		'@media (max-width: 960px)': {
			padding: '0 8px',
		},
	},
	icon: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		// can text align center too
	},
	item: { background: '' },
	link: {
		textDecoration: 'none',
	},
}));

const QuickIconLink = ({
	icon,
	title,
	link: path,
	searchProducts,
}: IQuickIconLink) => {
	const classes = useStyles();

	return (
		<Grid item xs={6} md={3} onClick={() => searchProducts(path)}>
			<Link to={`/search/${path}`} className={classes.link}>
				<Paper className={classes.root}>
					<Grid
						container
						alignItems="center"
						alignContent="center"
						className={classes.item}
					>
						<Grid item xs={2} className={classes.icon}>
							<span>{icon}</span>
						</Grid>
						<Grid item xs={10}>
							<span
								style={{ fontSize: '1rem', fontWeight: 'bold' }}
							>
								{title}
							</span>
						</Grid>
					</Grid>
				</Paper>
			</Link>
		</Grid>
	);
};

export default QuickIconLink;
