import React from 'react';
import { Link } from 'react-router-dom';
// @material-ui
import { makeStyles } from '@material-ui/core/styles';
// @local
import logo from '../../../assets/logo.svg';
import Drawer from './Drawer';

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		height: '40px',
		margin: '15px auto',
	},
	logo: {
		height: '30px',
		'@media (max-width: 600px)': {
			height: '25px',
		},
	},
	textLabel: {
		'@media (max-width: 600px)': {
			display: 'none',
		},
	},
}));

const Brand = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div>
				<Drawer />
			</div>
			<Link to="/">
				<img className={classes.logo} src={logo} alt="brand-logo" />
			</Link>
		</div>
	);
};

export default Brand;
