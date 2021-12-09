import { makeStyles } from '@material-ui/styles';
import logo from '../../img/image-placeholders.jpg';

export default makeStyles((theme) => ({
	paper: {
		marginBottom: '16px',
		width: '100%',
		minWidth: '700px',
		padding: '10px',
	},
	doubleBannerpaper: {
		marginBottom: '16px',
		width: '100%',
		padding: '10px',
	},
	description: {
		width: '180px',
		fontSize: '12px',
		margin: '5px',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textDecoration: 'none',
		textOverflow: 'ellipsis',
		'@media (max-width: 1280px)': {
			width: '150px',
		},
	},
	placeholder: {
		height: 257,
		// backgroundImage: `url(${logo})`,
		backgroundSize: 'cover',
		backgroundRepeat: 'noRepeat',
		backgroundPosition: 'center',
		'@media (max-width: 1280px)': {
			height: 207,
		},
	},
	fluidBox: {
		overflow: 'auto',
		whiteSpace: 'nowrap',
	},
	bannerTitle: {
		'@media (max-width: 600px)': {
			fontSize: 16,
		},
	},
	thumbnailsTitle: {
		'@media (max-width: 800px)': {
			display: 'none',
		},
	},
	singleBanner: {
		'@media (max-width: 800px)': {
			display: 'none',
		},
	},
	link: {
		textDecoration: 'none',
		transition: 'transform 1.5s',
		'&:hover': {
			transform: 'scale(1.5)',
		},
	},
}));
