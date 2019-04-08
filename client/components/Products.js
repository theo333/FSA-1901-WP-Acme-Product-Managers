import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchProducts } from '../store';
import Product from './Product';

class Products extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { products } = this.props;
		return (
			<ul className=''>
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

export default connect(mapStateToProps)(Products);
