import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ location }) => {
	const { pathname } = location;
	const pages = [
		{ key: 1, url: '/', name: 'Home' },
		{ key: 2, url: '/products', name: 'Products' },
		{ key: 3, url: '/users', name: 'Managers' }
	];
	return (
		<ul className='nav nav-tabs'>
			{pages.map(page => {
				const { key, url, name } = page;
				return (
					<li key={key} className='nav-item'>
						<Link
							to={url}
							className={`nav-link${url === pathname ? ' active' : ''}`}
						>
							{name}
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

export default Nav;
