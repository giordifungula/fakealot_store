import { createContext } from 'react';
import { Product } from '@chec/commerce.js/types/product';
import { Cart } from '@chec/commerce.js/types/cart';

interface IAppContext {
	isLoading: boolean;
	productsList: Product[] | null;
	sortedProducts: Product[] | null;
	cart: Cart | null;
	onAddToCart: (productId: string, quantity: number) => void;
	searchProducts: (searchTerm: string) => void;
	setQuery: React.Dispatch<React.SetStateAction<string | null>> | null;
	query: string | null;
	handleEmptyCart: () => void;
	refreshCart: () => void;
	removeFromCart: (productId: string) => void;
	updateCartQty: (productId: string, quantity: number) => void;
}

const defaultState: IAppContext = {
	isLoading: false,
	productsList: [],
	cart: null,
	onAddToCart: (id: string, quantity: number) => true,
	sortedProducts: [],
	searchProducts: (searchTerm: string) => true,
	setQuery: null,
	query: null,
	handleEmptyCart: () => true,
	refreshCart: () => true,
	removeFromCart: (productId: string) => true,
	updateCartQty: (productId: string, quantity: number) => true,
};

export default createContext<IAppContext>(defaultState);
