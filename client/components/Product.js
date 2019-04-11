import React, { Component } from 'react';
import { connect } from 'react-redux';

import { saveProductManager } from '../store';

class Product extends Component {
	constructor(props) {
		super(props);
		this.state = this.stateFromProduct(this.props.product);
	}

	stateFromProduct = product => {
		const { id, name, managerId } = product;
		return {
			id: id ? id : '',
			name: name ? name : '',
			managerId: managerId ? managerId : ''
		};
	};

	onChange = ev => {
		this.setState({
			[ev.target.name]: ev.target.value
		});
	};

	onSave = ev => {
		ev.preventDefault();
		const { product } = this.props;
		const { id } = product;
		const { name } = this.state;
		const managerId = this.state.managerId ? this.state.managerId : null;

		this.props.saveProductManager(id, { name, managerId });
	};

	render() {
		const { product, users } = this.props;
		const { onSave, onChange } = this;
		const { managerId } = this.props.product;

		return (
			<li className='list-group-item'>
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
					</form>
					<button
						className='btn btn-primary'
						disabled={
							this.props.product.managerId === this.state.managerId
								? true
								: false
						}
					>
						Save
					</button>
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
		saveProductManager: (productId, updatedProduct) =>
			dispatch(saveProductManager(productId, updatedProduct))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Product);
