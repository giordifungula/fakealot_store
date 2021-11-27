import React from 'react';
import Home from 'components/Home';
import {
	Switch,
	withRouter,
	RouteComponentProps,
	Route,
	Redirect,
} from 'react-router-dom';

const App = ({ location }: RouteComponentProps) => {
	return (
		<>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="*">
					<Route render={() => <Redirect to="/" />} />
				</Route>
			</Switch>
		</>
	);
};

export default withRouter(App);
