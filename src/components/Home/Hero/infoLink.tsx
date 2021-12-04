import React from 'react';
// @material-ui
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';

interface IProps {
	path: string;
	icon: string;
	title: string;
	subTitle: string;
}

const InfoLink = ({ path, icon, title, subTitle }: IProps) => {
	return (
		<Link to={path} style={{ textDecoration: 'none' }}>
			<Box style={{ display: 'flex', width: '100%' }}>
				<Box style={{ marginRight: '5px' }}>
					<img src={icon} alt={title} />
				</Box>
				<Box>
					<div style={{ fontSize: '13px', fontWeight: 'bold' }}>
						{title}
					</div>
					<div style={{ fontSize: '11px' }}>{subTitle}</div>
				</Box>
			</Box>
		</Link>
	);
};

export default InfoLink;
