import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// @material-ui
import {
	Paper,
	Stepper,
	Step,
	StepLabel,
	Typography,
	CircularProgress,
	Divider,
	Button,
} from '@material-ui/core';
// @local
import { CheckoutToken } from '@chec/commerce.js/types/checkout-token';
import GlobalContainer from 'components/utils/Container';
import { commerce } from 'lib/commerce';
import AppContext from 'AppContext';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import useStyles from './styles';

export interface IShippingData {
	shippingCountry: string;
	shippingSubdivision: string;
	shippingOptions: string;
	shippingOption: string;
	firstName: string;
	lastName: string;
	address1: string;
	email: string;
	city: string;
	zip: string;
}

const steps = ['Shipping address', 'Payment details'];

const Checkout = () => {
	const classes = useStyles();
	const { handleCaptureCheckout } = React.useContext(AppContext);

	const { cart, order, error } = React.useContext(AppContext);

	const [checkoutToken, setCheckoutToken] = useState<CheckoutToken | null>(
		null,
	);

	const [activeStep, setActiveStep] = useState(0);
	// TODO remove shipping data
	const [shippingData, setShippingData] = useState<IShippingData | null>(
		null,
	);

	const [loading, setLoading] = React.useState(false);

	const history = useHistory();
	const goToHomeView = () => history.push('/');
	const goToCartPage = () => history.push('/cart');

	const nextStep = () =>
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	const backStep = () =>
		setActiveStep((prevActiveStep) => prevActiveStep - 1);

	useEffect(() => {
		if (cart) {
			const generateToken = async () => {
				try {
					setLoading(true);

					const token = await commerce.checkout.generateToken(
						cart.id,
						{
							type: 'cart',
						},
					);
					setLoading(false);

					if (token) setCheckoutToken(token);
				} catch (err) {
					console.log(err);
					if (activeStep !== steps.length) {
						goToHomeView();
					}
				}
			};

			generateToken();
		}
	}, [JSON.stringify(cart)]);

	const test = (data: IShippingData) => {
		setShippingData(data);
		console.log('test', data);
		nextStep();
	};

	let Confirmation = () =>
		order && order.customer ? (
			<>
				<div>
					<Typography variant="h5">
						Thank you for your purchase, {order.customer.firstname}{' '}
						{order.customer.lastname}!
					</Typography>
					<Divider className={classes.divider} />
					<Typography variant="subtitle2">
						Order ref: {order.customer_reference}
					</Typography>
				</div>
				<br />
				<Button variant="outlined" type="button" onClick={goToHomeView}>
					Back to home
				</Button>
			</>
		) : (
			<div className={`${classes.spinner}`}>
				<CircularProgress />
			</div>
		);

	if (error) {
		Confirmation = () => (
			<>
				<Typography variant="h5">Error: {error}</Typography>
				<br />
				<Button variant="outlined" type="button" onClick={goToHomeView}>
					Back to home
				</Button>
			</>
		);
	}

	const Form = () =>
		checkoutToken && activeStep === 0 ? (
			<AddressForm
				checkoutToken={checkoutToken}
				nextStep={nextStep}
				goToCartPage={goToCartPage}
				test={test}
			/>
		) : checkoutToken && shippingData ? (
			<PaymentForm
				checkoutToken={checkoutToken}
				nextStep={nextStep}
				backStep={backStep}
				shippingData={shippingData}
				onCaptureCheckout={handleCaptureCheckout}
			/>
		) : null;
	return (
		<GlobalContainer>
			<div className={classes.toolbar} />
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography variant="h4" align="center">
						Checkout
					</Typography>
					<Stepper
						activeStep={activeStep}
						className={classes.stepper}
					>
						{steps.map((label) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					{activeStep === steps.length ? (
						<Confirmation />
					) : loading ? (
						<div className={`${classes.spinner}`}>
							<CircularProgress />
						</div>
					) : (
						checkoutToken && <Form />
					)}
				</Paper>
			</main>
		</GlobalContainer>
	);
};

export default Checkout;
