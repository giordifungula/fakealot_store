import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Product } from '@chec/commerce.js/types/product';
import { Cart } from '@chec/commerce.js/types/cart';
import { Order } from '@chec/commerce.js/types/order';
import { CheckoutCapture } from '@chec/commerce.js/types/checkout-capture';
import { CheckoutCaptureResponse } from '@chec/commerce.js/types/checkout-capture-response';
// @material-ui
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// @components
import RoutesApp from 'components/App';
// @local
import { toast } from 'react-toastify';
import theme from './theme';
import AppContext from './AppContext';
import { commerce } from './lib/commerce';

const App = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [productsList, setProductsList] = useState<Product[] | null>(null);
	const [cart, setCart] = useState<Cart | null>(null);
	const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
	const [query, setQuery] = useState<string | null>(null);
	const [order, setOrder] = useState<CheckoutCaptureResponse | null>(null);
	const [errorMessage, setErrorMessage] = useState<unknown | string>('');

	const searchProducts = async (search: string) => {
		setIsLoading(true);
		const products = productsList
			? productsList.filter(
					(prod) =>
						prod.seo.title &&
						prod.name.toLowerCase().includes(search.toLowerCase()),
			  )
			: [];
		setSortedProducts(products);
		setIsLoading(false);
	};

	const fetchProducts = async () => {
		const response = await commerce.products.list();
		setIsLoading(true);
		const { data } = response;
		// response returns data and meta.pagination to collect
		setProductsList(data);
		setIsLoading(false);
	};

	const fetchCart = async () => {
		const res = await commerce.cart.retrieve();
		setCart(res);
	};

	useEffect(() => {
		fetchProducts();
		fetchCart();
	}, []);

	const addToCartClick = async (productId: string, quantity: number) => {
		const item = await commerce.cart.add(productId, quantity);
		setCart(item.cart);
		toast.success('Item added to cart');
	};

	const updateCartQty = async (lineItemId: string, quantity: number) => {
		const response = await commerce.cart.update(lineItemId, { quantity });
		setCart(response.cart);
		toast.success('Cart has been updated');
	};

	const removeFromCart = async (lineItemId: string) => {
		const response = await commerce.cart.remove(lineItemId);
		setCart(response.cart);
		toast.success('Item has been removed from cart');
	};

	const handleEmptyCart = async () => {
		const response = await commerce.cart.empty();

		setCart(response.cart);
		toast.success('Cart has been Emptied');
	};

	const refreshCart = async () => {
		const newCart = await commerce.cart.refresh();

		setCart(newCart);
		toast.success('Cart has been refreshed');
	};

	const handleCaptureCheckout = async (
		checkoutTokenId: string,
		newOrder: CheckoutCapture,
	) => {
		try {
			const incomingOrder = await commerce.checkout.capture(
				checkoutTokenId,
				newOrder,
			);
			setOrder(incomingOrder);
			refreshCart();
		} catch (error: unknown) {
			console.log('error', error);
			// const errorMessage = error.message || error;
			// setErrorMessage(error.data.error.message);
		}
	};

	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AppContext.Provider
					value={{
						isLoading,
						productsList,
						cart,
						searchProducts,
						sortedProducts,
						setQuery,
						query,
						onAddToCart: addToCartClick,
						handleEmptyCart,
						refreshCart,
						removeFromCart,
						updateCartQty,
						handleCaptureCheckout,
						order,
						error: errorMessage,
					}}
				>
					<RoutesApp />
				</AppContext.Provider>
			</ThemeProvider>
		</BrowserRouter>
	);
};
export default App;
