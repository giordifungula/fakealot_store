import React from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	root: {
		height: 35,
		minWidth: '100%',
		display: 'flex',
		alignItems: 'center',
		overflow: 'auto',
		whiteSpace: 'nowrap',
	},
	slug: {
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		'@media (max-width: 600px)': {
			width: '250px',
		},
		'@media (max-width: 360px)': {
			width: '160px',
		},
	},
	description: {
		width: '180px',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		'@media (max-width: 1280px)': {
			width: '150px',
		},
	},
	blackTextNoUnderline: {
		color: '#000',
		textDecoration: 'none',
		fontWeight: 600,
	},
}));

const CurrentPath = () => {
	const location = useLocation();
	const { name: slug } = useParams<{ name: string }>();

	const classes = useStyles();

	return (
		<Breadcrumbs aria-label="breadcrumb" className={classes.root}>
			<Link to="/" className={classes.blackTextNoUnderline}>
				Home
			</Link>
			<div className={classes.slug}>
				{slug ? (
					<span>{slug}</span>
				) : (
					<span>{location.pathname.replace('/', '')}</span>
				)}
			</div>
		</Breadcrumbs>
	);
};

export default CurrentPath;
