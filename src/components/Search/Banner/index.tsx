import React from 'react';
import { Product } from '@chec/commerce.js/types/product';
import { Link } from 'react-router-dom';
// @material-ui
import {
	Paper,
	Card,
	Divider,
	Typography,
	CardActionArea,
	CardMedia,
	Grid,
} from '@material-ui/core';
import useStyles from './styles';

interface IProps {
	title?: string;
	getProduct?: Product | null;
	xs: number;
	numOfProds: number;
	products: Product[] | null;
}

const Banner = ({
	products,
	title,
	numOfProds = 6,
	xs = 3,
	getProduct,
}: IProps) => {
	const classes = useStyles({});

	return (
		<div className={classes.fluidBox}>
			<Paper className={classes.paper}>
				<Typography
					variant="h5"
					gutterBottom
					className={classes.bannerTitle}
				>
					{title}
				</Typography>
				{numOfProds > 6 && (
					<div style={{ marginBottom: 10 }}>
						<p style={{ paddingBottom: 20, margin: 0 }}>
							{(products && products.length) || [].length}{' '}
							product(s) found
						</p>
						<Divider />
					</div>
				)}
				<Grid container spacing={1}>
					{Array.isArray(products)
						? products.slice(0, numOfProds).map((product, i) => (
								<Grid item xs={3} key={i}>
									<Link
										key={i}
										to={`/product/${product.name
											.split(' ')
											.join('-')}/${product.id}`}
									>
										<Card elevation={0}>
											<CardActionArea key={i}>
												{product.assets
													.slice(0, 1)
													.map((image, i) => (
														<CardMedia
															key={i}
															style={{
																height: 'auto',
																width: '100%',
															}}
															component="img"
															alt="Product"
															image={image.url}
														/>
													))}
												<div
													className={
														classes.description
													}
												>
													{product.name}
												</div>
												<div
													style={{
														fontSize: '16px',
														margin: '5px',
														fontWeight: 'bold',
													}}
												>
													{
														product.price
															.formatted_with_symbol
													}
												</div>
											</CardActionArea>
										</Card>
									</Link>
								</Grid>
						  ))
						: null}
				</Grid>
			</Paper>
		</div>
	);
};

export default Banner;
