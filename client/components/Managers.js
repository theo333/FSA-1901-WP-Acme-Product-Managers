import React, { Component } from 'react';
import { connect } from 'react-redux';

import Manager from './Manager';

class Managers extends Component {
	findManagers = (users, products) => {
		return users.reduce((acc, user) => {
			products.forEach(product => {
				if (user.id === product.managerId) {
					acc.push(user);
				}
			});
			return acc;
		}, []);
	};

	render() {
		const { users, products } = this.props;
		const managers = this.findManagers(users, products);
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
