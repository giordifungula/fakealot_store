import React from 'react';
import { Link } from 'react-router-dom';
// @material-ui
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// @components
import { IHeroProps } from 'components/Home/Hero';

const useStyles = makeStyles((theme) => ({
	link: {
		animation: '1.5s ease-in-out',
		'&:hover': {
			background: theme.palette.primary.main,
			color: '#fff',
			transition: 'all 0.3s ease-in-out',
		},
	},
	listItemButton: {
		display: 'flex',
		alignItems: 'center',
		paddingLeft: '8px',
		height: '32px',
	},
	iconStyles: {
		width: '20px',
		fontSize: '20px',
	},
	iconText: {
		display: 'flex',
		alignItems: 'center',
		fontSize: '.80rem',
		padding: ' 0 0 4px 4px',
	},
}));

const Categories = ({ categories, searchProducts }: IHeroProps) => {
	const classes = useStyles();

	return (
		<List component="nav" aria-label="main categories">
			{categories &&
				searchProducts &&
				categories.map(({ name, icon, path }, i) => (
					<Link
						to={`/search/${path}`}
						key={i}
						style={{ textDecoration: 'none', color: '#000' }}
					>
						<div onClick={() => searchProducts(path)}>
							<ListItem
								button
								className={`${classes.link} ${classes.listItemButton}`}
							>
								<span className={classes.iconStyles}>
									{icon}
								</span>
								<span className={classes.iconText}>{name}</span>
							</ListItem>
						</div>
					</Link>
				))}
		</List>
	);
};

export default Categories;
