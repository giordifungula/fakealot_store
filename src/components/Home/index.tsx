import React from 'react';
// @components
import GlobalContainer from 'components/utils/Container';
import { categories } from 'Data/categories';
import AppContext from 'AppContext';
// @local
import Hero from './Hero';
import HeroCarousel from './Hero/Carousel';
import InfoLink from './Hero/infoLink';

const Home = () => {
	const { sortedProducts, query, searchProducts } =
		React.useContext(AppContext);

	// todo add sortedProducts to context

	return (
		<GlobalContainer>
			<Hero searchProducts={searchProducts}>
				<Hero.Categories
					categories={categories}
					searchProducts={searchProducts}
				/>
				<Hero.ImageSlide>
					<HeroCarousel />
				</Hero.ImageSlide>
				<Hero.InformativeLinks>
					<InfoLink
						path="/abc"
						icon="abc"
						title="ABC"
						subTitle="ABC"
					/>
					{/* todo add more info links here */}
				</Hero.InformativeLinks>
				{/* todo add images here */}
			</Hero>
			{/* Add Product Components Below */}
		</GlobalContainer>
	);
};

export default Home;
