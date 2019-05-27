import React from 'react';

const LogoText = ({mainColor, ioColor, fontSize}) => {

	const logoStyle = {
		margin: 0,
		color: mainColor,
		fontWeight: 800,
		fontSize
	}

	const spanStyle = {
		color: ioColor
	}
	return (
			<p style={logoStyle}>
				JobHuntr<span style={spanStyle}>.io</span>
			</p>
		)
};

export default LogoText;