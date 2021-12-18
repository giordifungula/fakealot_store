import React, { useState, useEffect } from 'react';
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
// @components

// @local
import { LineItem } from '@chec/commerce.js/types/line-item';
import { Cart } from '@chec/commerce.js/types/cart';
import { CheckoutCaptureResponse } from '@chec/commerce.js/types/checkout-capture-response';
import { commerce } from '../../lib/commerce';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import classes from './Checkout.module.css';

export interface ICheckoutTokenProps {
	adjustments: [];
	cart_id: string;
	live: ILiveProps;
	id: string;
}

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

export interface ILiveProps {
	merchant_id: string;
	currency: { code: string; symbol: string };
	subtotal: { formatted_with_symbol: string };
	total: number;
	line_items: LineItem[];
}

const steps = ['Shipping address', 'Payment details'];

interface IProps {
	cart: Cart;
	onCaptureCheckout: (
		checkoutTokenId: string,
		newOrder: unknown,
	) => Promise<void>;
	error: string;
	order: CheckoutCaptureResponse;
	goToHomeView: () => void;
	goToCartPage: () => void;
}

const Checkout = ({
	cart,
	onCaptureCheckout,
	order,
	error,
	goToHomeView,
	goToCartPage,
}: IProps) => {
	const [checkoutToken, setCheckoutToken] = useState<string | null>(null);
	const [activeStep, setActiveStep] = useState(0);
	const [shippingData, setShippingData] = useState<IShippingData | null>(
		null,
	);
	const [loading, setLoading] = React.useState(false);

	const nextStep = () =>
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	const backStep = () =>
		setActiveStep((prevActiveStep) => prevActiveStep - 1);

	useEffect(() => {
		if (cart.id) {
			const generateToken = async () => {
				try {
					setLoading(true);

					const token = (await commerce.checkout.generateToken(
						cart.id,
						{
							type: 'cart',
						},
					)) as string;
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
	}, [cart]);

	const test = (data: IShippingData) => {
		setShippingData(data);
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
		activeStep === 0 ? (
			<AddressForm
				checkoutToken={checkoutToken}
				nextStep={nextStep}
				goToCartPage={goToCartPage}
				setShippingData={setShippingData}
				test={test}
			/>
		) : (
			<PaymentForm
				checkoutToken={checkoutToken}
				nextStep={nextStep}
				backStep={backStep}
				shippingData={shippingData}
				onCaptureCheckout={onCaptureCheckout}
			/>
		);
	return (
		<>
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
		</>
	);
};

export default Checkout;
