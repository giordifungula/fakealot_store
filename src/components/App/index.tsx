import React from 'react';
import { Switch, withRouter, Route, Redirect } from 'react-router-dom';
// @components
import Home from 'components/Home';
import Header from 'components/Layouts/Header';
import SearchContainer from 'components/Search';
import Product from 'components/Pages/Product';
import Cart from 'components/Pages/Cart';
import Checkout from 'components/Pages/Checkout/Checkout';

const App = () => {
	return (
		<>
			<Header />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/search/:name" component={SearchContainer} />
				<Route exact path="/product/:name/:id" component={Product} />
				<Route exact path="/cart" component={Cart} />
				<Route exact path="/checkout" component={Checkout} />
				<Route path="*">
					<Route render={() => <Redirect to="/" />} />
				</Route>
			</Switch>
		</>
	);
};

export default withRouter(App);
