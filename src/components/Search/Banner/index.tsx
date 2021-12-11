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
	GridSize,
} from '@material-ui/core';
import useStyles from './styles';

interface IProps {
	title?: string;
	getProduct?: Product | null;
	xs?: boolean | GridSize;
	numOfProds: number;
	products: Product[] | null;
}

export const Banner = ({
	products,
	title,
	numOfProds = 6,
	xs = 2,
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

				<Grid container spacing={1}>
					{products
						? products.slice(0, 6).map((product, i) => (
								<Grid item sm={xs} key={i}>
									<Link
										key={i}
										to={`/product/${product.name
											.split(' ')
											.join('-')}/${product.id}`}
										className={classes.link}
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
															alt={product.name}
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
														textDecoration: 'none',
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
