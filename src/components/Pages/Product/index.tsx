import React from 'react';
import { Product } from '@chec/commerce.js/types/product';
import { useLocation, useParams } from 'react-router-dom';
// @components
import GlobalContainer from 'components/utils/Container';
import { commerce } from 'lib/commerce';
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	IconButton,
	LinearProgress,
	makeStyles,
	Typography,
} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	actionCard: {},
	contentCard: {},
	root: {
		margin: theme.spacing(2),
	},
	card: {
		maxWidth: 345,
		margin: theme.spacing(2),
	},
	media: {
		height: 190,
	},
}));

const FetchProduct = () => {
	const classes = useStyles();

	const location = useLocation();
	const { id } = useParams<{ id: string }>();
	const [product, setProduct] = React.useState<Product | null>(null);
	const [loading, setLoading] = React.useState(true);

	const getProduct = async (id: string) => {
		try {
			const res = await commerce.products.retrieve(id);
			setProduct(res);
			setLoading(false);
		} catch (error) {
			console.log('error', error);
		}
	};

	React.useEffect(() => {
		getProduct(id);
	}, [id]);

	return (
		<GlobalContainer>
			{product ? (
				<Grid container style={{ marginTop: '8em' }}>
					<Grid item xs={12}>
						<Card className={classes.root}>
							<CardMedia
								className={classes.media}
								title={product.name}
								src={product.media.source}
							/>
							<CardContent>
								<div>
									<Typography
										gutterBottom
										variant="h5"
										component="h2"
									>
										{product.name}
									</Typography>
									<Typography
										gutterBottom
										variant="h5"
										component="h2"
									>
										R{product.price.formatted}
									</Typography>
								</div>
								<Typography
									dangerouslySetInnerHTML={{
										__html: product.description,
									}}
									variant="body2"
									color="textSecondary"
									component="p"
								/>
							</CardContent>
							<CardActions
								disableSpacing
								// className={classes.cardActions}
							>
								<IconButton
									aria-label="Add to Cart"
									// onClick={() => onAddToCart(product.id, 1)}
								>
									<AddShoppingCart />
								</IconButton>
							</CardActions>
						</Card>
					</Grid>
				</Grid>
			) : loading ? (
				<LinearProgress />
			) : null}
		</GlobalContainer>
	);
};

export default FetchProduct;
