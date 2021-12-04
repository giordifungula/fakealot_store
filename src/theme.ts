import { red } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createTheme({
	palette: {
		primary: {
			main: '#1D79BF',
		},
		secondary: {
			main: '#556cd6',
		},
		error: {
			main: red.A400,
		},
	},
});

export default theme;
