import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { saveProductManager, fetchProducts } from '../store';

class Product extends Component {
	constructor(props) {
		super(props);
		this.state = this.stateFromProduct(this.props.product);
		console.log(this.state);
	}

	stateFromProduct = product => {
		const { id, name, managerId } = product;
		return {
			id: id ? id : '',
			name: name ? name : '',
			managerId: managerId ? managerId : ''
		};
	};

	// ??
	// componentDidUpdate(prevProps) {
	// 	if (this.props.product.managerId !== prevprops.product.managerId) {
	// 		this.setState(this.stateFromProduct(this.props.product));
	// 	}
	// }

	onChange = ev => {
		this.setState(
			{
				[ev.target.name]: ev.target.value
			}
			// () => console.log('state: ' + JSON.stringify(this.state, null, 3))
		);
	};

	// ??
	onSave = ev => {
		ev.preventDefault();
		const { product } = this.props;
		const { id } = product;
		const { name } = this.state;
		const managerId = this.state.managerId ? this.state.managerId : null;

		this.props.saveProductManager(id, { name, managerId })
	};

	render() {
		const { product, users } = this.props;
		const { onSave, onChange } = this;

		return (
			<li className='list-group'>
				<div>
					<h6>{product.name}</h6>
					<form onSubmit={onSave} className='form-group'>
						<label>Product Manager</label>
						<select
							name='managerId'
							value={this.state.managerId}
							onChange={onChange}
							className='form-control'
						>
							<option key='none' value=''>
								-- none --
							</option>
							{users.map(user => {
								const { id, name } = user;
								return (
									<option key={id} value={id}>
										{name}
									</option>
								);
							})}
						</select>
						<button
							className='btn btn-primary'
						>
							Save
						</button>
					</form>
				</div>
			</li>
		);
	}
}

const mapStateToProps = state => {
	return {
		users: state.users
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchProducts: () => dispatch(fetchProducts()),
		saveProductManager: (productId, updatedProduct) =>
			dispatch(saveProductManager(productId, updatedProduct))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Product);
