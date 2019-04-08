import React, { Component } from 'react';
import { connect } from 'react-redux';

import Manager from './Manager';
import findManagers from '../helperFunctions';

class Managers extends Component {
	render() {
		const { users, products } = this.props;
		const managers = findManagers(users, products);
		return (
			<ul className=''>
				{managers.map(manager => {
					const { id, name } = manager;
					return <Manager key={id} name={name} />;
				})}
			</ul>
		);
	}
}

const mapStateToProps = state => {
	return {
		users: state.users,
		products: state.products
	};
};

export default connect(mapStateToProps)(Managers);
