import { FaBaby } from 'react-icons/fa';
import { GrRestroomWomen } from 'react-icons/gr';
import { MdSportsBaseball, MdCameraEnhance } from 'react-icons/md';

export interface IQuickIconLinks {
	icon: React.ReactNode;
	link: string;
	title: string;
}

export const quickIconLinks: IQuickIconLinks[] = [
	{
		icon: <MdSportsBaseball />,
		link: 'sports',
		title: 'Sports',
	},
	{
		icon: <MdCameraEnhance />,
		link: 'gadgets',
		title: 'Gadgets',
	},
	{
		icon: <FaBaby />,
		link: 'baby',
		title: 'Baby',
	},
	{
		icon: <GrRestroomWomen />,
		link: 'women',
		title: 'Women',
	},
];
