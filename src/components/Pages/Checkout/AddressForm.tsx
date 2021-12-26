import React, { useState, useEffect } from 'react';
import { GetShippingOptionsResponse } from '@chec/commerce.js/features/checkout';
import { CheckoutToken } from '@chec/commerce.js/types/checkout-token';
// @material-ui
import {
	InputLabel,
	Select,
	MenuItem,
	Button,
	Grid,
	Typography,
	CircularProgress,
} from '@material-ui/core';
// @Form
import { useForm, FormProvider } from 'react-hook-form';
// @local
import { commerce } from 'lib/commerce';
import FormInput from './CustomTextField';
import { IShippingData } from './Checkout';

const useStyles = () => ({
	spinner: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

interface IAddresProps {
	nextStep: () => void;
	goToCartPage: () => void;
	checkoutToken?: CheckoutToken;
	test: ({ ...data }: IShippingData) => void;
}

type Inputs = {
	shippingCountries: string[];
	shippingSubdivisions: string[];
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
};

interface IDataMap {
	[key: string]: string;
}

const AddressForm = ({
	nextStep,
	goToCartPage,
	checkoutToken,
	test,
}: IAddresProps) => {
	const classes = useStyles();

	const [shippingCountries, setShippingCountries] = useState<IDataMap>({});
	const [shippingCountry, setShippingCountry] = useState<string>('');
	const [shippingSubdivisions, setShippingSubdivisions] = useState<IDataMap>(
		{},
	);
	const [shippingSubdivision, setShippingSubdivision] = useState<string>('');
	const [shippingOptions, setShippingOptions] = useState<
		GetShippingOptionsResponse[] | null
	>(null);
	const [shippingOption, setShippingOption] = useState<string>('');
	const methods = useForm<Inputs>();
	const [loading, setLoading] = React.useState(false);

	const fetchShippingCountries = async (checkoutTokenId: string) => {
		const { countries } =
			await commerce.services.localeListShippingCountries(
				checkoutTokenId,
			);

		setShippingCountries(countries);
		setShippingCountry('ZA');
	};

	const fetchSubdivisions = async (countryCode: string) => {
		const { subdivisions } = await commerce.services.localeListSubdivisions(
			countryCode,
		);
		setShippingSubdivisions(subdivisions);

		setShippingSubdivision(Object.keys(subdivisions)[0]);
	};

	const fetchShippingOptions = async (
		checkoutTokenId: string,
		country: string,
		stateProvince = '',
	) => {
		const options = await commerce.checkout.getShippingOptions(
			checkoutTokenId,
			{ country, region: stateProvince },
		);

		setShippingOptions(options);
		setShippingOption(options[0].id);
	};

	useEffect(() => {
		setLoading(true);
		checkoutToken
			? fetchShippingCountries(checkoutToken.id)
			: fetchShippingCountries('');
		setLoading(false);
	}, []);

	useEffect(() => {
		if (shippingCountry) fetchSubdivisions(shippingCountry);
	}, [shippingCountry]);

	useEffect(() => {
		if (shippingSubdivision && checkoutToken)
			fetchShippingOptions(
				checkoutToken.id,
				shippingCountry,
				shippingSubdivision,
			);
	}, [shippingSubdivision, JSON.stringify(checkoutToken)]);

	return (
		<>
			<div className={`${classes.spinner}`}>
				{loading ? <CircularProgress /> : null}
			</div>
			<Typography variant="h6" gutterBottom>
				Shipping address
			</Typography>
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit((data) =>
						test({
							...data,
							shippingCountry,
							shippingSubdivision,
							shippingOption,
						}),
					)}
				>
					<Grid container spacing={3}>
						<FormInput
							required
							name="firstName"
							label="First name"
						/>
						<FormInput required name="lastName" label="Last name" />
						<FormInput
							required
							name="address1"
							label="Address line 1"
						/>
						<FormInput required name="email" label="Email" />
						<FormInput required name="city" label="City" />
						<FormInput
							required
							name="zip"
							label="Zip / Postal code"
						/>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Country</InputLabel>
							<Select
								value={shippingCountry}
								fullWidth
								onChange={(
									event: React.ChangeEvent<{
										name?: string | undefined;
										value: unknown;
									}>,
									// eslint-disable-next-line @typescript-eslint/no-unused-vars
									_child: React.ReactNode,
								) =>
									setShippingCountry(
										event.target.value as string,
									)
								}
							>
								{Object.entries(shippingCountries)
									.map(([code, name]) => ({
										id: code,
										label: name,
									}))
									.map((item) => (
										<MenuItem
											key={item.id}
											disabled={
												item.label !== 'South Africa'
											}
											value={item.id}
										>
											{item.label}
										</MenuItem>
									))}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Subdivision</InputLabel>
							<Select
								value={shippingSubdivision}
								fullWidth
								onChange={(
									event: React.ChangeEvent<{
										name?: string | undefined;
										value: unknown;
									}>,
									// eslint-disable-next-line @typescript-eslint/no-unused-vars
									child: React.ReactNode,
								) =>
									setShippingSubdivisions(
										event.target.value as IDataMap,
									)
								}
							>
								{Object.entries(shippingSubdivisions)
									.map(([code, name]) => ({
										id: code,
										label: name,
									}))
									.map((item) => (
										<MenuItem key={item.id} value={item.id}>
											{item.label}
										</MenuItem>
									))}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Options</InputLabel>
							<Select
								value={shippingOption}
								fullWidth
								onChange={(
									event: React.ChangeEvent<{
										name?: string | undefined;
										value: unknown;
									}>,
									// eslint-disable-next-line @typescript-eslint/no-unused-vars
									child: React.ReactNode,
								) =>
									setShippingOption(
										event.target.value as string,
									)
								}
							>
								{shippingOptions &&
									shippingOptions
										.map((sO) => ({
											id: sO.id,
											label: `National Shipping - (${sO.price.formatted_with_symbol})`,
										}))
										.map((item) => (
											<MenuItem
												key={item.id}
												value={item.id}
											>
												{item.label}
											</MenuItem>
										))}
							</Select>
						</Grid>
					</Grid>
					<br />
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<Button variant="outlined" onClick={goToCartPage}>
							Back to Cart
						</Button>
						<Button
							type="submit"
							variant="contained"
							color="primary"
						>
							Next
						</Button>
					</div>
				</form>
			</FormProvider>
		</>
	);
};

export default AddressForm;
