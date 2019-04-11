import React, { Component } from 'react';
import { connect } from 'react-redux';

import Product from './Product';

class Products extends Component {
	constructor(props) {
		super(props);
	}

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

export default connect(mapStateToProps)(Products);
