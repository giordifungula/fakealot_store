import React from 'react';
import { useHistory } from 'react-router-dom';
// @material-ui
import {
	AppBar,
	Badge,
	Grid,
	IconButton,
	LinearProgress,
	MenuItem,
	Toolbar,
	Typography,
} from '@material-ui/core';
// @components
import GlobalContainer from 'components/utils/Container';
// @local
import { ShoppingCart } from '@material-ui/icons';
import useStyles from './styles';
import Brand from './Brand';
import Search from './Search';
import AppContext from '../../../AppContext';

const Header = () => {
	const { isLoading, cart } = React.useContext(AppContext);
	const classes = useStyles();
	const history = useHistory();

	const gotoCart = () => {
		history.push('/cart');
	};

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
			{isLoading && <LinearProgress color="secondary" />}
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
							<div>
								<MenuItem onClick={gotoCart}>
									<IconButton
										aria-label="Show cart items"
										color="primary"
									>
										<Badge
											badgeContent={
												cart
													? cart.total_unique_items
													: 0
											}
											color="primary"
										>
											<ShoppingCart />
										</Badge>
									</IconButton>
									<Typography variant="body1" color="primary">
										Proceed to Cart
									</Typography>
								</MenuItem>
							</div>
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
