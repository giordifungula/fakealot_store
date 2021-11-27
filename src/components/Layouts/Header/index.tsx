import React from 'react';
// @material-ui
import { AppBar, LinearProgress } from '@material-ui/core';
// @local
import useStyles from './styles';

// todo header needs to take in loading state, search items?
interface IHeaderProps {
	loading?: boolean;
}

const Header = ({ loading = true }: IHeaderProps) => {
	const classes = useStyles();

	return (
		<AppBar
			className={classes.appBar}
			elevation={1}
			style={{ display: 'flex', justifyContent: 'center' }}
		>
			<h1>Fakealot</h1>
			{loading && <LinearProgress color="secondary" />}
		</AppBar>
	);
};

export default Header;
