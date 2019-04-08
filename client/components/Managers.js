import React from 'react';
import { connect } from 'react-redux';

import Manager from './Manager';

// create findManagers(users, products)

const Managers = ({ managers }) => {
	// console.log('managers: ' + JSON.stringify(managers, null, 3));
	return (
		<ul className=''>
			{managers.map(manager => {
				return (
					<li key={manager.name}>
						<Manager name={manager.name} />
					</li>
				);
			})}
		</ul>
	);
};

const mapStateToProps = state => {
	return {
		managers: state.users
	};
};

export default connect(mapStateToProps)(Managers);
