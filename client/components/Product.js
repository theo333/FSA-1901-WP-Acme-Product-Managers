import React, { Component } from 'react';
import { connect } from 'react-redux';

class Product extends Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		const { product } = this.props;
		// console.log('product: ' + JSON.stringify(product, null, 3));
		return <li className=''>{product.name}</li>;
	}
}

export default Product;
