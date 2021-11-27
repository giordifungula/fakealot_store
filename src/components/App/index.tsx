import React from 'react';
import Home from 'components/Home';
import {
	Switch,
	withRouter,
	RouteComponentProps,
	Route,
	Redirect,
} from 'react-router-dom';
// @components
import Header from 'components/Layouts/Header';
import About from 'components/About';

const App = ({ location }: RouteComponentProps) => {
	return (
		<>
			<Header />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/about" component={About} />
				<Route path="*">
					<Route render={() => <Redirect to="/" />} />
				</Route>
			</Switch>
		</>
	);
};

export default withRouter(App);
