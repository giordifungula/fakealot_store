import Slider from 'react-slick';
import { Product } from '@chec/commerce.js/types/product';
import {
	Grid,
	Card,
	CardActionArea,
	CardMedia,
	Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

interface IGalleryProps {
	products: Product[] | null;
	title: string;
}

// TODO: Use this for next Arrow
function SampleNextArrow(props: any) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: 'block', background: 'red' }}
			onClick={onClick}
		/>
	);
}
// TODO: Use this for next Previous
function SamplePrevArrow(props: any) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: 'block', background: 'green' }}
			onClick={onClick}
		/>
	);
}

const ProductsGallery = ({ products, title }: IGalleryProps) => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 6,
		slidesToScroll: 3,
		arrows: true,
		// TODO: Add Colors for arrows
	};

	return (
		<div>
			<Typography variant="h4" style={{ marginBottom: '10px' }}>
				{title}
			</Typography>
			<Slider {...settings}>
				{products
					? products.map((product, i) => (
							<div style={{ marginRight: '10px' }}>
								<Link
									key={i}
									to={`/product/${product.name
										.split(' ')
										.join('-')}/${product.id}`}
									// className={classes.link}
								>
									<Card elevation={0}>
										<CardActionArea key={i}>
											{product.assets
												.slice(0, 1)
												.map((image, i) => (
													<CardMedia
														key={i}
														style={{
															height: '300px',
															width: '90%',
														}}
														component="img"
														alt={product.name}
														image={image.url}
													/>
												))}
											<div>{product.name}</div>
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
							</div>
					  ))
					: null}
			</Slider>
		</div>
	);
};

export default ProductsGallery;
