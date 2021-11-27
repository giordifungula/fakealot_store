import React from 'react';
// @material-ui
import { AppBar, Grid, LinearProgress, Toolbar } from '@material-ui/core';
// @components
import GlobalContainer from 'components/utils/Container';
// @local
import useStyles from './styles';
import Brand from './Brand';
import Search from './Search';

// todo header needs to take in loading state, search items?
interface IHeaderProps {
	loading?: boolean;
}

const Header = ({ loading }: IHeaderProps) => {
	const classes = useStyles();

	return (
		<AppBar
			className={classes.appBar}
			elevation={1}
			style={{
				display: 'flex',
				justifyContent: 'center',
				backgroundColor: '#fff',
			}}
		>
			{loading && <LinearProgress color="secondary" />}
			<GlobalContainer>
				<Toolbar disableGutters className={classes.toolBar}>
					<Grid container spacing={2} alignItems="center">
						<Grid item xs={7} sm={6} md={2} lg={2}>
							<Brand />
						</Grid>
						<Grid
							item
							sm={6}
							md={6}
							lg={7}
							className={classes.search}
							alignContent="center"
						>
							<Search />
						</Grid>
						<Grid item xs={5} sm={6} md={4} lg={3}>
							{/* cart section? */}
							<h2 style={{ color: 'black' }}>Cart Section</h2>
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
