import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	carouselHeight: {
		maxHeight: '500px',
	},
}));

const HeroCarousel = () => {
	const classes = useStyles();
	return (
		<Carousel
			showIndicators
			showThumbs={false}
			infiniteLoop
			autoPlay
			showStatus={false}
			interval={5000}
		>
			<div>
				<img src="./images/image-1.png" alt="carousel-img-1" />
			</div>
			<div>
				<img src="./images/image-2.jpg" alt="carousel-img-3" />
			</div>
			<div>
				<img src="./images/image-3.jpg" alt="carousel-img-3" />
			</div>
			<div>
				<img src="./images/image-4.jpg" alt="" />
			</div>
		</Carousel>
	);
};

export default HeroCarousel;
