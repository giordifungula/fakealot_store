import React from 'react';
import { Link } from 'react-router-dom';
// @material-ui
import { makeStyles } from '@material-ui/core/styles';
import {
	SwipeableDrawer,
	List,
	Divider,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core';
import { GiHamburgerMenu } from 'react-icons/gi';
// @local
import logo from '../../../assets/logo.png';
import { categories } from '../../../Data/categories';

const useStyles = makeStyles({
	list: {
		width: '70vw',
	},
	fullList: {
		width: 'auto',
	},
	brandBurger: {
		fontSize: 25,
		marginRight: 20,
		'@media (min-width: 961px)': {
			display: 'none',
		},
	},
	brand: {
		padding: '20px 0 0 20px',
		marginBottom: 10,
	},
	logo: {
		height: '30px',
		'@media (max-width: 600px)': {
			height: '25px',
		},
	},
});

const Drawer = () => {
	const classes = useStyles();

	const [state, setState] = React.useState({
		left: false,
	});

	const toggleDrawer = (anchor: string, open: boolean) => (event: any) => {
		if (
			event &&
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const list = (anchor: string) => (
		<div
			className={classes.list}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<div className={classes.brand}>
				<Link to="/">
					<img className={classes.logo} src={logo} alt="brand-logo" />
				</Link>
			</div>
			<Divider />
			<List>
				{categories.map(({ icon, name, path }, index) => (
					<Link
						to={`/search/${path}`}
						key={index}
						style={{
							textDecoration: 'none',
							color: 'black',
						}}
					>
						<ListItem button style={{ paddingBottom: '0px' }}>
							<ListItemIcon style={{ minWidth: '35px' }}>
								<span
									style={{
										width: '20px',
										fontSize: '20px',
									}}
								>
									{icon}
								</span>
							</ListItemIcon>
							<ListItemText primary={name} />
						</ListItem>
					</Link>
				))}
			</List>
		</div>
	);

	return (
		<div>
			<div onClick={toggleDrawer('left', true)}>
				<GiHamburgerMenu
					color="black"
					className={classes.brandBurger}
				/>
			</div>
			<SwipeableDrawer
				anchor={'left'}
				open={state['left']}
				onClose={toggleDrawer('left', false)}
				onOpen={toggleDrawer('left', true)}
			>
				{list('left')}
			</SwipeableDrawer>
		</div>
	);
};

export default Drawer;
