import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchProducts } from '../store';
import Product from './Product';

class Products extends Component {
	constructor(props) {
		super(props);
	}

	// componentDidMount() {
	// 	this.props.fetchProducts();
	// }

	render() {
		const { products } = this.props;
		return (
			<ul className='list-group'>
				{products.map(product => {
					return <Product key={product.id} product={product} />;
				})}
			</ul>
		);
	}
}

const mapStateToProps = state => {
	return {
		products: state.products
	};
};
const mapDispatchToProps = dispatch => {
	return {
		fetchProducts: () => dispatch(fetchProducts())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Products);
