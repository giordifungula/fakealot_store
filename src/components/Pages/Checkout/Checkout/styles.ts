import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
	root: {
		position: 'fixed',
	},
	appBar: {
		position: 'relative',
	},
	toolbar: {
		display: 'inline',
		marginTop: '10px',
	},
	layout: {
		marginTop: '10%',
		width: 'auto',
		marginLeft: '20px',
		marginRight: '20px',
		[theme.breakpoints.down(1200)]: {
			width: '100%',
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: '20px',
		marginBottom: '20px',
		padding: '20px',
		[theme.breakpoints.down(1200)]: {
			margin: '20px 0px',
		},
		[theme.breakpoints.down(420)]: {
			width: '100%',
			marginTop: '60px',
		},
	},
	stepper: {
		padding: '10px',
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
	divider: {
		margin: '20px 0',
	},
	spinner: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
}));
