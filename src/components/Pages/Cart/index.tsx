import React from 'react';
import { useHistory } from 'react-router-dom';
// @material ui
import {
	Container,
	Typography,
	Button,
	Grid,
	CircularProgress,
	useTheme,
} from '@material-ui/core';
import AppContext from '../../../AppContext';
// @local
import CartItem from './CartItem';
import useStyles from './styles';

const Page = () => {
	const { cart, updateCartQty, removeFromCart, handleEmptyCart } =
		React.useContext(AppContext);

	const history = useHistory();

	const smallScreen = useTheme().breakpoints.down('sm');

	const goToHomeView = () => history.push('/');
	const goToCheckoutView = () => history.push('/checkout');

	const classes = useStyles();

	const renderEmptyCart = () => (
		<Typography variant="subtitle1">
			You have no items in your shopping cart,
			<Button color="primary" variant="contained" onClick={goToHomeView}>
				start adding some
			</Button>
			!
		</Typography>
	);

	const handleCheckoutPage = () => {
		goToCheckoutView();
	};

	if (cart == null) {
		return <CircularProgress color="secondary" />;
	}

	const renderCart = () => (
		<>
			<Grid container spacing={3}>
				{cart.line_items.map((lineItem) => (
					<Grid item xs={12} sm={4} key={lineItem.id}>
						<CartItem
							item={lineItem}
							updateCartQty={updateCartQty}
							removeFromCart={removeFromCart}
						/>
					</Grid>
				))}
			</Grid>
			<div className={classes.cardDetails}>
				<Grid container>
					<Grid item>
						<Typography variant="h4">
							Subtotal: {cart.subtotal.formatted_with_symbol}
						</Typography>
					</Grid>
					<Grid item container style={{ marginBottom: '2em' }}>
						<Grid
							item
							xs={12}
							sm={4}
							style={{
								textAlign: 'center',
								marginBottom: smallScreen ? '10px' : '0px',
							}}
						>
							<Button
								className={classes.checkoutButton}
								onClick={handleCheckoutPage}
								size="large"
								type="button"
								variant="contained"
								color="primary"
							>
								Checkout
							</Button>
						</Grid>
						<Grid
							item
							xs={12}
							sm={4}
							style={{
								textAlign: 'center',
								marginBottom: smallScreen ? '10px' : '0px',
							}}
						>
							<Button
								className={classes.checkoutButton}
								onClick={goToHomeView}
								size="large"
								type="button"
								variant="outlined"
								color="secondary"
							>
								Back
							</Button>
						</Grid>
						<Grid
							item
							xs={12}
							sm={4}
							style={{
								textAlign: smallScreen ? 'center' : 'right',
								marginBottom: smallScreen ? '10px' : '0px',
							}}
						>
							<Button
								size="large"
								type="button"
								variant="contained"
								onClick={handleEmptyCart}
								style={{
									background: '#f50057',
									color: 'white',
								}}
							>
								Empty cart
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</div>
		</>
	);

	return (
		<Container>
			<div className={classes.toolbar} />
			<Typography
				className={classes.title}
				align="center"
				variant="h2"
				gutterBottom
				color="secondary"
			>
				Your Shopping Cart
			</Typography>
			{!cart.line_items.length ? renderEmptyCart() : renderCart()}
		</Container>
	);
};

export default Page;
