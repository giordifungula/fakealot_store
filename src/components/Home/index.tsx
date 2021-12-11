import React from 'react';
// @components
import GlobalContainer from 'components/utils/Container';
import { categories } from 'Data/categories';
import AppContext from 'AppContext';
// @components
import Gallery from 'components/Gallery';
// @local
import Hero from './Hero';
import HeroCarousel from './Hero/Carousel';
import InfoLink from './Hero/infoLink';
import QuickIconsLinks from './QuickIconsLinks';

const Home = () => {
	const { searchProducts, productsList, isLoading } =
		React.useContext(AppContext);

	const infoIcon = 'https://img.icons8.com/ios-glyphs/30/000000/info.png';
	const contactIcon =
		'https://img.icons8.com/ios-glyphs/30/000000/contact-card.png';
	const questionIcon =
		'https://img.icons8.com/ios-glyphs/30/000000/question.png';

	return (
		<GlobalContainer>
			<Hero searchProducts={searchProducts}>
				<Hero.Categories
					categories={categories}
					searchProducts={searchProducts}
				/>
				<Hero.Slider>
					<HeroCarousel />
				</Hero.Slider>
				<Hero.InformationLinks>
					<InfoLink
						path="/faq"
						icon={questionIcon}
						title="FAQ"
						subTitle="Frequently Asked Questions"
					/>
					<InfoLink
						path="/about"
						icon={infoIcon}
						title="About Us"
						subTitle="About Us"
					/>
					<InfoLink
						path="/contact"
						icon={contactIcon}
						title="Contact Us"
						subTitle="Talk to us"
					/>
					{/* todo add more info links here */}
				</Hero.InformationLinks>
				{/* todo add images here */}
			</Hero>
			{/* Add Product Components Below */}
			<QuickIconsLinks searchProducts={searchProducts} />
			<Gallery
				title="Most Popular"
				products={productsList}
				loading={isLoading}
			/>
		</GlobalContainer>
	);
};

export default Home;
