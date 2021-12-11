import Slider from 'react-slick';
import { Product } from '@chec/commerce.js/types/product';
import { Link } from 'react-router-dom';
import {
	Grid,
	Card,
	CardActionArea,
	CardMedia,
	Typography,
	useTheme,
	Box,
	Avatar,
	CardContent,
	CardHeader,
	IconButton,
	makeStyles,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
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

interface IGalleryProps {
	products: Product[] | null;
	title: string;
	loading: boolean;
}

// TODO: Use this for next Arrow

// TODO: Use this for next Previous

const data = [
	{
		src: 'https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ',
		title: 'Don Diablo @ Tomorrowland Main Stage 2019 | Official…',
		channel: 'Don Diablo',
		views: '396 k views',
		createdAt: 'a week ago',
	},
	{
		src: 'https://i.ytimg.com/vi/_Uu12zY01ts/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCpX6Jan2rxrCAZxJYDXppTP4MoQA',
		title: 'Queen - Greatest Hits',
		channel: 'Queen Official',
		views: '40 M views',
		createdAt: '3 years ago',
	},
	{
		src: 'https://i.ytimg.com/vi/kkLk2XWMBf8/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLB4GZTFu1Ju2EPPPXnhMZtFVvYBaw',
		title: 'Calvin Harris, Sam Smith - Promises (Official Video)',
		channel: 'Calvin Harris',
		views: '130 M views',
		createdAt: '10 months ago',
	},
];

const ProductsGallery = ({ products, title, loading }: IGalleryProps) => {
	const theme = useTheme();
	const classes = useStyles();

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 6,
		slidesToScroll: 3,
		arrows: true,
		// TODO: Add Colors for arrows
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};

	function SamplePrevArrow(props: any) {
		const { className, style, onClick } = props;
		return (
			<div
				className={className}
				style={{
					...style,
					background: theme.palette.primary.main,
					border: '1px solid black',
				}}
				onClick={onClick}
			/>
		);
	}

	function SampleNextArrow(props: any) {
		const { className, style, onClick } = props;
		return (
			<div
				className={className}
				style={{
					...style,
					display: 'block',
					background: theme.palette.primary.main,
					border: '1px solid black',
				}}
				onClick={onClick}
			/>
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
