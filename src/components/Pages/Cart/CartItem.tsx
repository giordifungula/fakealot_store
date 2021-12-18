import React from 'react';
// @material ui
import {
	Typography,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
} from '@material-ui/core';

// @local
import { LineItem } from '@chec/commerce.js/types/line-item';
import useStyles from './styles';

interface IProps {
	item: LineItem;
	updateCartQty: (id: string, newQuantity: number) => void;
	removeFromCart: (id: string) => void;
}

const CartItem = ({ item, updateCartQty, removeFromCart }: IProps) => {
	const handleUpdateCartQty = (lineItemId: string, newQuantity: number) =>
		updateCartQty(lineItemId, newQuantity);

	const classes = useStyles();

	const handleRemoveFromCart = (lineItemId: string) =>
		removeFromCart(lineItemId);

	return (
		<Card className="cart-item">
			<CardMedia
				image={item.media.source}
				alt={item.name}
				width={500}
				height={500}
				component="img"
				className={classes.media}
				title={item.name}
			/>
			<CardContent className={classes.cardContent}>
				<Typography variant="h4">{item.name}</Typography>
				<Typography variant="h5">
					{item.price.formatted_with_symbol}
				</Typography>
			</CardContent>
			<CardActions className={classes.cardActions}>
				<div className={classes.buttons}>
					<Button
						type="button"
						size="small"
						onClick={() =>
							handleUpdateCartQty(item.id, item.quantity - 1)
						}
					>
						-
					</Button>
					<Typography>&nbsp;{item.quantity}&nbsp;</Typography>
					<Button
						type="button"
						size="small"
						onClick={() =>
							handleUpdateCartQty(item.id, item.quantity + 1)
						}
					>
						+
					</Button>
				</div>
				<Button
					variant="contained"
					type="button"
					color="secondary"
					onClick={() => handleRemoveFromCart(item.id)}
				>
					Remove
				</Button>
			</CardActions>
		</Card>
	);
};

export default CartItem;
