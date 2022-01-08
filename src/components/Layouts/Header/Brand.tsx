import React from 'react';
import { Link } from 'react-router-dom';
// @material-ui
import { makeStyles } from '@material-ui/core/styles';
// @local
import logo from '../../../assets/logo.png';
import Drawer from './Drawer';

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		height: '80px',
		margin: '10px auto',
	},
	logo: {
		height: '100px',
		width: '100px',
		'@media (max-width: 600px)': {
			height: '25px',
		},
	},
	textLabel: {
		'@media (max-width: 600px)': {
			display: 'none',
		},
	},
	FTextStyles: {
		color: '#4C4C4F',
		fontSize: '3em',
		fontWeight: 600,
		background: 'transparent',
		margin: '50px auto',
		marginRight: '2px',
	},
}));

const Brand = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div>
				<Drawer />
			</div>
			<Link
				to="/"
				style={{
					textDecoration: 'none',
					textAlign: 'center',
				}}
			>
				<img
					className={classes.logo}
					style={{ marginLeft: '1px' }}
					src="./images/giordiStore.png"
					alt="brand-logo"
				/>
			</Link>
		</div>
	);
};

export default Brand;
