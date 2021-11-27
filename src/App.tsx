import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// @material-ui
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// @components
import RoutesApp from 'components/App';
// @local
import theme from './theme';

const App = () => (
	<BrowserRouter>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<RoutesApp />
		</ThemeProvider>
	</BrowserRouter>
);
export default App;
