import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
	media: {
		height: 200,
	},
	cardContent: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	cardActions: {
		justifyContent: 'space-between',
	},
	buttons: {
		display: 'flex',
		alignItems: 'center',
	},
	title: {
		marginTop: '5%',
	},
	emptyButton: {
		minWidth: '150px',
	},
	checkoutButton: {
		minWidth: '150px',
	},
	link: {
		textDecoration: 'none',
	},
	danger: {
		background: '#f44336',
	},
	cardDetails: {
		display: 'flex',
		marginTop: '10%',
		width: '100%',
		justifyContent: 'space-evenly',
	},
	btnContain: {
		display: 'flex',
		justifyContent: 'space-around',
		padding: '10px',
	},
	toolbar: {
		marginTop: '8em',
	},
}));

export default styles;
