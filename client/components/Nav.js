import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import findManagers from '../helperFunctions';

const Nav = ({ location, users, products }) => {
	const { pathname } = location;
	const managersCount = findManagers(users, products).length;
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
							{key === 3 ? ` (${managersCount})` : ''}
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

const mapStateToProps = state => {
	return {
		users: state.users,
		products: state.products
	};
};

export default connect(mapStateToProps)(Nav);
