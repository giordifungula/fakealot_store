import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

interface IFormInput {
	name: string;
	label: string;
	required: boolean;
}

function FormInput({ name, label, required, ...props }: IFormInput) {
	const { control } = useFormContext();
	const isError = false;

	return (
		<Grid item xs={12} sm={6}>
			<Controller
				{...props}
				render={({ field: { onChange, value } }) => (
					<TextField
						label={label}
						value={value}
						onChange={onChange}
						error={isError}
						required={required}
						style={{ width: '100%' }}
					/>
				)}
				name={name}
				control={control}
			/>
		</Grid>
	);
}

export default FormInput;
