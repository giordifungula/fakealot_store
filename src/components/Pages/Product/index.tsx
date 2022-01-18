import React from 'react';
import { Product } from '@chec/commerce.js/types/product';
import { useParams } from 'react-router-dom';
// @components
import GlobalContainer from 'components/utils/Container';
import { commerce } from 'lib/commerce';
import {
	Card,
	CardMedia,
	Grid,
	makeStyles,
	Typography,
	CircularProgress,
	Box,
	Chip,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Paper,
	CardActionArea,
	CardContent,
	Button,
	CardActions,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { AddShoppingCart, Star } from '@material-ui/icons';
// @local
import AppContext from 'AppContext';

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
	cardMedia: {
		transition: 'all .5s',
		'&:hover': {
			cursor: 'pointer',
			transform: 'scale(0.9)',
			padding: '0px',
		},
	},
	chipCity: {
		borderRadius: '10px',
		marginRight: '10px',
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
}));

const FetchProduct = () => {
	const classes = useStyles();

	const { onAddToCart } = React.useContext(AppContext);

	const { id } = useParams<{ id: string }>();
	const [product, setProduct] = React.useState<Product | null>(null);
	const [loading, setLoading] = React.useState(true);

	const getProduct = async (id: string) => {
		try {
			const res = await commerce.products.retrieve(id);
			setProduct(res);
			setLoading(false);
		} catch (error) {
			console.log('{error}', error);
		}
	};

	React.useEffect(() => {
		getProduct(id);
	}, [id]);

	const handleClick = () => {
		console.info('You clicked the Chip.');
	};

	return (
		<GlobalContainer>
			<Grid container style={{ marginTop: '2em' }}>
				{product ? (
					<Grid
						item
						container
						spacing={3}
						style={{ marginTop: '5em' }}
					>
						<Grid item container spacing={1} xs={12} sm={8}>
							<Grid item xs={12} sm={5}>
								<Card
									style={{
										height: '350px',
										border: '1px solid grey',
										padding: '10px',
									}}
									className={classes.cardMedia}
								>
									{/* <CardContent></CardContent> */}
									<CardMedia
										image={product.media.source}
										title={product.name}
										component="img"
									/>
								</Card>
							</Grid>

							<Grid item xs={12} sm={7}>
								<Box style={{ display: 'flex' }}>
									<Typography>{product.name}</Typography>
								</Box>
								<hr />
								<Box>
									<Typography variant="h5">
										{product.description}
									</Typography>
								</Box>
								<hr />

								<Box borderColor="transparent">
									<Rating name="pristine" value={5}></Rating>
								</Box>
							</Grid>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Paper className={classes.paper}>
								<Box
									style={{
										display: 'flex',
										alignItems: 'center',
										marginBottom: '10px',
										justifyContent: 'center',
									}}
								>
									<Typography>Price:</Typography>
									<Chip
										label={'R500'}
										onClick={handleClick}
										variant="outlined"
									/>
								</Box>
								<Box>
									<Chip label="FREE SHIPPING"></Chip>
									<Chip
										color="secondary"
										label="FREE Delivery"
									></Chip>
								</Box>

								<Box
									style={{
										display: 'flex',
										alignItems: 'center',
										marginBottom: '10px',
										marginTop: '10px',
									}}
								>
									<Typography
										style={{
											fontWeight: 800,
											fontSize: '20',
										}}
									>
										In Stock Locations:
									</Typography>
									<Chip
										label={'CPT'}
										onClick={handleClick}
										variant="outlined"
										className={classes.chipCity}
										color="secondary"
									/>
									<Chip
										label={'JHB'}
										onClick={handleClick}
										variant="outlined"
										className={classes.chipCity}
										color="secondary"
									/>
									<Chip
										label={'DUR'}
										onClick={handleClick}
										variant="outlined"
										className={classes.chipCity}
										color="secondary"
									/>
								</Box>
								<Box>
									<List component="nav" aria-label="contacts">
										<ListItem button>
											<ListItemIcon>
												<Star />
											</ListItemIcon>
											<ListItemText primary="Expensive Delivery Available." />
										</ListItem>
										<ListItem button color="primary">
											<ListItemIcon>
												<Star />
											</ListItemIcon>
											<ListItemText primary="No Returns Available." />
										</ListItem>
										<ListItem button>
											<ListItemText
												inset
												primary="Hassle-Expensive Exchanges & Returns for 3 Days ."
											/>
										</ListItem>
									</List>
									<IconButton
										onClick={() =>
											onAddToCart(product.id, 1)
										}
										aria-label="add to shopping cart"
									>
										<AddShoppingCart />
									</IconButton>
								</Box>
							</Paper>
						</Grid>
						<Grid item container xs={12}>
							<Grid item xs={12}>
								<Typography
									variant="h4"
									style={{ fontWeight: 400 }}
								>
									You may also like
								</Typography>
							</Grid>
							{/* TODO: Add related products or just general products */}
							{[...Array(4).fill(0)].map((_, i) => (
								<Grid item xs={12} sm={3}>
									<Card
										className={classes.root}
										style={{
											marginLeft: '0',
											marginRight: '10px',
										}}
									>
										<CardActionArea>
											<CardMedia
												className={classes.media}
												image="https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
												title="Contemplative Reptile"
											/>
											<CardContent>
												<Typography
													gutterBottom
													variant="h5"
													component="h2"
												>
													Yeezy
												</Typography>
												<Typography
													variant="body2"
													color="textSecondary"
													component="p"
												>
													lorem ipsum dolor sit amet
													consectetur adipisicing
													elit.
												</Typography>
											</CardContent>
										</CardActionArea>
										<CardActions>
											<Button
												size="small"
												color="primary"
											>
												Shop Now
											</Button>
											<Button
												size="small"
												color="primary"
											>
												Learn More
											</Button>
										</CardActions>
									</Card>
								</Grid>
							))}
						</Grid>
					</Grid>
				) : loading ? (
					<CircularProgress
						style={{
							margin: '0 auto',
							textAlign: 'center',
							marginTop: '8em',
						}}
					/>
				) : null}
			</Grid>
		</GlobalContainer>
	);
};

export default FetchProduct;
