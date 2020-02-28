import React from 'react';
import './Footer.css';

const Footer = () => {
	return (
		<footer>
			<p>
				CloudyBox by Adrienn Timko, Devina Paramita, Ju-I Kuo - EC Utbildning 2020 |{' '}
				<a href="https://www.freepik.com/free-photos-vectors/technology">
					Technology vector created by rawpixel.com - www.freepik.com
				</a>
			</p>
		</footer>
	);
};

const MemoFooter = React.memo(Footer);

export default MemoFooter;
