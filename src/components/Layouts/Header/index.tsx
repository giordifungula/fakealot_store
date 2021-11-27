import React from 'react';
// @material-ui
import { AppBar, Grid, LinearProgress, Toolbar } from '@material-ui/core';
import GlobalContainer from 'components/utils/Container';
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
			<GlobalContainer>
				<Toolbar disableGutters className={classes.toolBar}>
					<Grid container spacing={2}>
						<Grid item xs={7} sm={6} md={2} lg={2}>
							{/* Brand */}
							<h2>Brand</h2>
						</Grid>
						<Grid
							item
							sm={6}
							md={6}
							lg={7}
							className={classes.search}
						>
							{/* Search Container */}
							<h2>Search Container</h2>
						</Grid>
						<Grid item xs={5} sm={6} md={4} lg={3}>
							{/* cart section? */}
							<h2>Cart Section</h2>
						</Grid>
					</Grid>
				</Toolbar>
				<div className={classes.mobileSearch}>
					{/* Search Products */}
					<h2>Search Products</h2>
				</div>
			</GlobalContainer>
		</AppBar>
	);
};

export default Header;
