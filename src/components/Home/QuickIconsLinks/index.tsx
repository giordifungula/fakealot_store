import React from 'react';
// @material-ui
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
// @local
import { quickIconLinks } from 'Data/quickIconLinks';
import QuickIconLink from './QuickIconLink';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: '0px 0px 16px -8px',
		'@media (max-width: 960px)': {
			display: 'none',
		},
	},
}));

interface IProps {
	searchProducts: (search: string) => void;
}

const QuickIconLinks = ({ searchProducts }: IProps) => {
	const classes = useStyles();

	return (
		<Grid container spacing={2} className={classes.root}>
			{quickIconLinks.map(({ title, icon, link: path }, index) => (
				<QuickIconLink
					key={index}
					title={title}
					icon={icon}
					link={path}
					searchProducts={searchProducts}
				/>
			))}
		</Grid>
	);
};

export default QuickIconLinks;
