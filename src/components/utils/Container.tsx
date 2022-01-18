import React from 'react';
// @material-ui
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

interface IProps {
	children: React.ReactNode;
}

const useStyles = makeStyles(() => ({
	root: {
		maxWidth: '1280px',
		'@media (max-width: 1200px)': {
			maxWidth: '1040px',
			margin: 'auto',
		},
	},
}));

const GlobalContainer = ({ children }: IProps) => {
	const classes = useStyles();
	return (
		<Container className={classes.root}>
			<div>{children}</div>
		</Container>
	);
};

export default GlobalContainer;
