import React, { useState, useEffect } from 'react';
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
import { commerce } from '../../lib/commerce';
import FormInput from './CustomTextField';
import { ICheckoutTokenProps, IShippingData } from './Checkout/Checkout';
import classes from './styles.module.css';

interface IAddresProps {
	nextStep: () => void;
	goToCartPage: () => void;
	setShippingData: (data: IShippingData) => void;
	checkoutToken: ICheckoutTokenProps;
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

const AddressForm = ({
	nextStep,
	goToCartPage,
	setShippingData,
	checkoutToken,
	test,
}: IAddresProps) => {
	const [shippingCountries, setShippingCountries] = useState([]);
	const [shippingCountry, setShippingCountry] = useState<string>('');
	const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
	const [shippingSubdivision, setShippingSubdivision] = useState<string>('');
	const [shippingOptions, setShippingOptions] = useState([]);
	const [shippingOption, setShippingOption] = useState<string>('');
	const methods = useForm<Inputs>();
	const [loading, setLoading] = React.useState(false);

	const fetchShippingCountries = async (checkoutTokenId) => {
		const { countries } =
			await commerce.services.localeListShippingCountries(
				checkoutTokenId,
			);

		setShippingCountries(countries);
		setShippingCountry(Object.keys(countries)[0]);
	};

	const fetchSubdivisions = async (countryCode) => {
		const { subdivisions } = await commerce.services.localeListSubdivisions(
			countryCode,
		);

		setShippingSubdivisions(subdivisions);
		setShippingSubdivision(Object.keys(subdivisions)[0]);
	};

	const fetchShippingOptions = async (
		checkoutTokenId,
		country,
		stateProvince = null,
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
		fetchShippingCountries(checkoutToken.id);
		setLoading(false);
	}, []);

	useEffect(() => {
		if (shippingCountry) fetchSubdivisions(shippingCountry);
	}, [shippingCountry]);

	useEffect(() => {
		if (shippingSubdivision)
			fetchShippingOptions(
				checkoutToken.id,
				shippingCountry,
				shippingSubdivision,
			);
	}, [shippingSubdivision]);

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
									e: React.ChangeEvent<HTMLInputElement>,
								) => setShippingCountry(e.target.value)}
							>
								{Object.entries(shippingCountries)
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
							<InputLabel>Shipping Subdivision</InputLabel>
							<Select
								value={shippingSubdivision}
								fullWidth
								onChange={(
									e: React.ChangeEvent<HTMLInputElement>,
								) => setShippingSubdivision(e.target.value)}
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
									e: React.ChangeEvent<HTMLInputElement>,
								) => setShippingOption(e.target.value)}
							>
								{shippingOptions
									.map((sO) => ({
										id: sO.id,
										label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
									}))
									.map((item) => (
										<MenuItem key={item.id} value={item.id}>
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
