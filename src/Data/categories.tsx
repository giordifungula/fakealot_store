import React from 'react';
import { GrRestroomWomen, GrRestroomMen } from 'react-icons/gr';
import {
	GiBabyFace,
	GiPencilBrush,
	GiHeartBottle,
	GiAlliedStar,
	GiTShirt,
} from 'react-icons/gi';
import { BiHomeAlt, BiShoppingBag } from 'react-icons/bi';
import { FaHeartbeat, FaShoppingCart } from 'react-icons/fa';

const categories = [
	{
		name: 'Women',
		path: 'women',
		icon: <GrRestroomWomen />,
	},
	{
		name: 'Men',
		path: 'men',
		icon: <GrRestroomMen />,
	},
	{
		name: 'Kids & babies',
		path: 'kids',
		icon: <GiBabyFace />,
	},
	{
		name: 'Homeware',
		path: 'homeware',
		icon: <BiHomeAlt />,
	},
	{
		name: 'Sport',
		path: 'sport',
		icon: <FaHeartbeat />,
	},
	{
		name: 'Beauty',
		path: 'beauty',
		icon: <GiPencilBrush />,
	},
	{
		name: 'Grooming',
		path: 'grooming',
		icon: <GiHeartBottle />,
	},
	{
		name: 'Brands',
		path: 'brands',
		icon: <BiShoppingBag />,
	},
	{
		name: 'New Arrivals',
		path: 'arrivals',
		icon: <GiAlliedStar />,
	},
	{
		name: 'Sales & Deals',
		path: 'sales',
		icon: <FaShoppingCart />,
	},
	{
		name: 'Fashion',
		path: 'fashion',
		icon: <GiTShirt />,
	},
];

export default categories;
