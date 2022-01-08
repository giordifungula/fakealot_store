import Slider from 'react-slick';
import { Product } from '@chec/commerce.js/types/product';
import { Link } from 'react-router-dom';
import {
	Card,
	CardActionArea,
	CardMedia,
	Typography,
	CardContent,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { RightArrow, LeftArrow } from '../utils/Icons';

interface IGalleryProps {
	products: Product[] | null;
	title: string;
	loading: boolean;
}

interface IArrowProps {
	onClick?: () => void;
}

const ProductsGallery = ({ products, title, loading }: IGalleryProps) => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 6,
		slidesToScroll: 3,
		arrows: true,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};

	function SamplePrevArrow(props: IArrowProps) {
		const { onClick } = props;
		return (
			<div
				className="slick-arrow slick-prev"
				style={{ display: 'block', marginLeft: '-20px' }}
				onClick={onClick}
			>
				<LeftArrow />
			</div>
		);
	}

	function SampleNextArrow(props: IArrowProps) {
		const { onClick } = props;
		return (
			<div
				className="slick-arrow slick-next"
				style={{ display: 'block', marginRight: '-20px' }}
				onClick={onClick}
			>
				<RightArrow />
			</div>
		);
	}

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
															width: '100%',
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
					: [...Array(6)].map((_, i) => (
							<div style={{ marginRight: '10px' }}>
								<Card elevation={0}>
									<CardContent
										style={{
											height: '500px',
											width: '100%',
										}}
									>
										<Skeleton
											animation="wave"
											height="500px"
										/>
									</CardContent>
								</Card>
							</div>
					  ))}
				{/* TODO to display card */}
			</Slider>
		</div>
	);
};

export default ProductsGallery;
