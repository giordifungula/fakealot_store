import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// @material-ui
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// @components
import RoutesApp from 'components/App';
// @local
import theme from './theme';
import AppContext from './AppContext';

const App = () => {
	const [isLoading, setIsLoading] = React.useState(true);

	const handleLoading = () => {
		return;
	};

	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AppContext.Provider value={{ isLoading, handleLoading }}>
					<RoutesApp />
				</AppContext.Provider>
			</ThemeProvider>
		</BrowserRouter>
	);
};
export default App;
