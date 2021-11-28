import { createContext } from 'react';

// create the context interface
interface IAppContext {
	isLoading: boolean;
	handleLoading: () => void;
	// todo add more props here
}

// default state
const defaultState: IAppContext = {
	isLoading: false,
	handleLoading: () => true,
};

export default createContext<IAppContext>(defaultState);
