import { makeStyles } from '@material-ui/styles';
import { Theme, alpha } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		position: 'fixed',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
	searchIcon: {
		padding: '1px 1px 1px 10px',
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: 'black',
	},
	inputRoot: {
		width: '100%',
	},
	inputInput: {
		padding: '10px',
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${30}px)`,
		transition: '',
	},
	info: {
		minWidth: '200px',
	},
	search: {
		'@media (max-width: 959px)': {
			display: 'none',
		},
	},
	appBar: {
		'@media (max-width: 960px)': {
			height: '110px',
		},
	},
	toolBar: {
		'@media (max-width: 959px)': {
			minHeight: '20px',
			marginBottom: 5,
		},
	},

	mobileSearch: {
		display: 'none',
		'@media (max-width: 959px)': {
			width: '100%',
			display: 'block',
		},
	},

	searchBtn: {
		'@media (max-width: 600px)': {
			display: 'none',
		},
	},
	searchBox: {
		position: 'relative',
		border: '1px solid #c8c8c8',
		borderRadius: '3px',
		backgroundColor: alpha('#fff', 0.15),
		marginRight: 10,
		height: '40px',
		'@media (max-width: 600px)': {
			marginRight: 0,
		},
	},
}));

export default useStyles;
