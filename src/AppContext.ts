import { createContext } from 'react';
import { Product } from '@chec/commerce.js/types/product';
import { Cart } from '@chec/commerce.js/types/cart';
import { BiAngry } from 'react-icons/bi';

// create the context interface
interface IAppContext {
	isLoading: boolean;
	productsList: Product[] | null;
	sortedProducts: Product[] | null;
	cart: Cart | null;
	// todo add more props here
	searchProducts: (searchTerm: string) => void;
	setQuery: React.Dispatch<React.SetStateAction<string>> | string;
	query: string;
}

// default state
const defaultState: IAppContext = {
	isLoading: false,
	productsList: [],
	cart: null,
	sortedProducts: [],
	searchProducts: (searchTerm: string) => true,
	setQuery: '',
	query: '',
};

export default createContext<IAppContext>(defaultState);