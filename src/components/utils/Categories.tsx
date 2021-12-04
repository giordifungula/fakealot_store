import React from 'react';
import { Link } from 'react-router-dom';
// @material-ui
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { ICategory } from '../../Data/categories';

interface ICategoriesProps {
	categories: ICategory[];
	searchProducts: (category: string) => void;
}

const useStyles = makeStyles((theme) => ({
	link: {
		'&:hover': {
			background: theme.palette.secondary.main,
		},
	},
}));

const Categories = ({ categories, searchProducts }: ICategoriesProps) => {
	const classes = useStyles();

	return (
		<List component="nav" aria-label="main categories">
			{categories &&
				categories.map(({ name, icon, path }, i) => (
					<Link to={`/search/${path}`} key={i}>
						<div onClick={() => searchProducts(path)}>
							<ListItem
								button
								style={{
									display: 'flex',
									alignItems: 'center',
									paddingLeft: '8px',
									height: '32px',
								}}
								className={classes.link}
							>
								<span
									style={{
										width: '20px',
										fontSize: '20px',
									}}
								>
									{icon}
								</span>
								<span
									style={{
										display: 'flex',
										alignItems: 'center',
										fontSize: '.80rem',
										padding: ' 0 0 4px 4px',
									}}
								>
									{name}
								</span>
							</ListItem>
						</div>
					</Link>
				))}
		</List>
	);
};

export default Categories;
