import CommerceSDK from '@chec/commerce.js';

const PUBLIC_ENV = process.env.REACT_APP_CHEC_PUBLIC_KEY;
console.log('REACT_APP_CHEC_PUBLIC_KEY', PUBLIC_ENV);

const checAPIKey = PUBLIC_ENV ? PUBLIC_ENV : '';

const devEnvironment = process.env.NODE_ENV === 'development';
const prodEnv = process.env.NODE_ENV === 'production';
console.log('devEnvironment', devEnvironment);
console.log('checAPIKey', checAPIKey);

// Commerce.js constructor options
const commerceConfig = {
	axiosConfig: {
		headers: {
			'X-Chec-Agent': 'commerce.js/v2',
			'Chec-Version': '2021-03-10',
		},
	},
};

if (devEnvironment && !checAPIKey) {
	throw Error(
		'Your public API key must be provided as an environment variable named `NEXT_PUBLIC_CHEC_PUBLIC_API_KEY`. Obtain your Chec public key by logging into your Chec account and navigate to Setup > Developer, or can be obtained with the Chec CLI via with the command chec whoami',
	);
}

export const commerce = new CommerceSDK(
	checAPIKey,
	prodEnv ? prodEnv : devEnvironment,
	commerceConfig,
);

console.log('commerce', commerce);
