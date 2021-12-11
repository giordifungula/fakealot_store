import React from 'react';
// @material-ui
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
// @components
import Categories from 'components/utils/Categories';
import { ICategory } from 'Data/categories';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'grid',
		gridTemplateColumns: '1fr 4fr 1fr',
		gridGap: 20,
		marginBottom: 16,
		marginTop: `${76 + 8}px`,
		'@media (max-width: 1280px)': {
			gridTemplateColumns: '1fr 5fr',
		},
		'@media (max-width: 1030px)': {
			marginBottom: 16,
			gridTemplateColumns: '1fr',
		},
		'@media (max-width: 960px)': {
			marginTop: `${76 + 8 + 37}px`,
		},
		'@media (max-width: 600px)': {
			marginBottom: 16,
		},
	},
	paper: {
		height: '100%',
	},
	control: {
		padding: theme.spacing(2),
	},
	link: {
		'&:hover': {
			background: theme.palette.secondary.main,
		},
	},
	informativeLinks: {
		'@media (max-width: 1280px)': {
			display: 'none',
		},
	},
	categories: {
		'@media (max-width: 1030px)': {
			display: 'none',
		},
	},
	informativeBoxGrid: {
		display: 'grid',
		gridTemplateRows: '180px 1fr',
		gap: '16px',
		height: '100%',
	},
	boxGrid3fr: {
		display: 'grid',
		gridTemplateRows: '1fr 1fr 1fr',
		gap: '0px',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	boxGrid3frParent: {
		height: '100%',
		marginBottom: '16px',
		padding: '10px 5px',
	},
	gifphy: {
		height: '100%',
		backgroundImage: 'url(./images/animated.gif)',
		backgroundSize: 'cover',
		backgroundRepeat: 'repeat',
		backgroundPosition: 'center',
	},
}));

export interface IHeroProps {
	children?: React.ReactNode; // not every component has children
	searchProducts?: (value: string) => void;
	elementType?: keyof JSX.IntrinsicElements;
	categories?: ICategory[]; // only first component needs this
}

const Hero = ({
	searchProducts,
	children,
	elementType: ElementType = 'div',
}: IHeroProps) => {
	const classes = useStyles();
	return (
		<ElementType {...searchProducts} className={classes.root}>
			{children}
		</ElementType>
	);
};

Hero.Categories = ({ categories, searchProducts }: IHeroProps) => {
	const classes = useStyles();
	return (
		<div className={classes.categories}>
			<Paper className={classes.paper}>
				{categories && searchProducts ? (
					<Categories
						categories={categories}
						searchProducts={searchProducts}
					/>
				) : // this does not need children
				null}
			</Paper>
		</div>
	);
};

Hero.Slider = ({ children, elementType: ElementType = 'div' }: IHeroProps) => {
	const classes = useStyles();
	return (
		<ElementType>
			<Paper className={classes.paper}>{children}</Paper>
		</ElementType>
	);
};

Hero.InformationLinks = ({
	children,
	elementType: ElementType = 'div',
}: IHeroProps) => {
	const classes = useStyles();

	return (
		<ElementType className={classes.informativeLinks}>
			<Box className={classes.informativeBoxGrid}>
				<Box flexGrow={1}>
					<Paper className={classes.boxGrid3frParent}>
						<Box className={classes.boxGrid3fr}>{children}</Box>
					</Paper>
				</Box>
				<Box flexGrow={1}>
					<Paper className={classes.gifphy} />
				</Box>
			</Box>
		</ElementType>
	);
};

export default Hero;
