import React from 'react';

const Button = ({children, bgColor, color, padding, fontSize, fontWeight, className, type, width, onClick}) => {

	const btnStyle = {
		backgroundColor: bgColor || 'rgb(108, 99, 255)',
		padding,
		color: color || 'white',
		fontSize,
		fontWeight: fontWeight || '700',
		width: width || 'auto'
	};

	let class_name = `${className} btn`;

	return (
			<button type={type || 'submit'} className={class_name} style={btnStyle} onClick={onClick}>{children}</button>
		)
} ;

export default Button