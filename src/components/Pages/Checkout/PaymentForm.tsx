import React from 'react';
import { CheckoutToken } from '@chec/commerce.js/types/checkout-token';
import { CheckoutCapture } from '@chec/commerce.js/types/checkout-capture';
// @material-ui
import { Typography, Button, Divider } from '@material-ui/core';
// @stripe
import {
	Elements,
	CardElement,
	ElementsConsumer,
} from '@stripe/react-stripe-js';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';

// @local
import Review from './Review';
import { IShippingData } from './Checkout';

const STRIPE_ENV = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

const STRIPE_ENV_STRING = STRIPE_ENV ? STRIPE_ENV : '';

const stripePromise = loadStripe(STRIPE_ENV_STRING);

interface IPaymentProps {
	checkoutToken: CheckoutToken;
	nextStep: () => void;
	backStep: () => void;
	onCaptureCheckout: (
		checkoutTokenId: string,
		newOrder: CheckoutCapture,
	) => void;
	shippingData: IShippingData;
}

const PaymentForm = ({
	checkoutToken,
	nextStep,
	backStep,
	shippingData,
	onCaptureCheckout,
}: IPaymentProps) => {
	const handleSubmit = async (
		event: React.FormEvent<HTMLFormElement>,
		elements: StripeElements | null,
		stripe: Stripe | null,
	) => {
		event.preventDefault();

		if (!stripe || !elements) return;

		const cardElement = elements.getElement(CardElement);

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: cardElement ? cardElement : { token: '' },
		});

		if (error) {
			console.log('[error]', error);
		} else {
			const orderData = {
				line_items: checkoutToken.live.line_items,
				customer: {
					firstname: shippingData.firstName,
					lastname: shippingData.lastName,
					email: shippingData.email,
				},
				billing: {
					name: 'Local',
					street: shippingData.address1,
					town_city: shippingData.city,
					county_state: shippingData.shippingSubdivision,
					postal_zip_code: shippingData.zip,
					country: shippingData.shippingCountry,
				},
				shipping: {
					country: shippingData.shippingCountry,
					name: 'Local',
					street: shippingData.address1,
					town_city: shippingData.city,
				},
				fulfillment: { shipping_method: shippingData.shippingOption },
				payment: {
					gateway: 'stripe',
					stripe: {
						payment_method_id: paymentMethod
							? paymentMethod.id
							: ' ',
					},
				},
			};

			onCaptureCheckout(checkoutToken.id, orderData);

			nextStep();
		}
	};

	return (
		<>
			<Review checkoutToken={checkoutToken} />
			<Divider />
			<Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>
				Payment method
			</Typography>
			<Elements stripe={stripePromise}>
				<ElementsConsumer>
					{({ elements, stripe }) => (
						<form
							onSubmit={(e) => handleSubmit(e, elements, stripe)}
						>
							<CardElement />
							<br /> <br />
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
								}}
							>
								<Button variant="outlined" onClick={backStep}>
									Back
								</Button>
								<Button
									type="submit"
									variant="contained"
									disabled={!stripe}
									color="primary"
								>
									Pay{' '}
									{
										checkoutToken.live.subtotal
											.formatted_with_symbol
									}
								</Button>
							</div>
						</form>
					)}
				</ElementsConsumer>
			</Elements>
		</>
	);
};

export default PaymentForm;
