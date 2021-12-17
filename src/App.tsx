import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Product } from '@chec/commerce.js/types/product';
import { Cart } from '@chec/commerce.js/types/cart';
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
					}}
				>
					<RoutesApp />
				</AppContext.Provider>
			</ThemeProvider>
		</BrowserRouter>
	);
};
export default App;
