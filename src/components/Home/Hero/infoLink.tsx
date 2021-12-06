import React from 'react';
// @material-ui
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

interface IProps {
	path: string;
	icon: string;
	title: string;
	subTitle: string;
}

const useStyles = makeStyles((theme) => ({
	link: {
		textDecoration: 'none',
		color: '#000',
		'&:hover': {
			background: theme.palette.primary.main,
			color: '#fff',
			transition: 'all 0.3s ease-in-out',
		},
	},
	titleBoldFont13: {
		fontSize: '13px',
		fontWeight: 'bold',
	},
	titleFont11: {
		fontSize: '11px',
	},
	boxFlex100: {
		display: 'flex',
		width: '100%',
	},
}));

const InfoLink = ({ path, icon, title, subTitle }: IProps) => {
	const classes = useStyles();

	return (
		<Link to={path} className={classes.link}>
			<Box className={classes.boxFlex100}>
				<Box style={{ marginRight: '5px' }}>
					<img src={icon} alt={title} />
				</Box>
				<Box>
					<div className={classes.titleBoldFont13}>{title}</div>
					<div className={classes.titleFont11}>{subTitle}</div>
				</Box>
			</Box>
		</Link>
	);
};

export default InfoLink;
