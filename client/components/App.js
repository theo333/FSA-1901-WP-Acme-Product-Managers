import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from './Nav';
import { fetchUsers, fetchProducts } from '../store';
import Managers from './Managers';
import Products from './Products';
import Home from './Home';

class App extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.fetchUsers();
		this.props.fetchProducts();
	}

	managerOpenings = products => {
		const productsNoManagers = products.filter(product => !product.managerId);
		return productsNoManagers.length > 0;
	};

	render() {
		const { products } = this.props;

		//
		// const managerOpenings = products => {
		// 	const productsNoManagers = products.filter(product => !product.managerId);
		// 	return productsNoManagers.length > 0;
		// };
		const openings = this.managerOpenings(products);
		return (
			<Router>
				<h1>Acme Product Managers</h1>
				<Route render={({ location }) => <Nav location={location} />} />
				<Switch>
					<Route exact path='/' render={() => <Home openings={openings} />} />
					<Route path='/users' component={Managers} />
					<Route exact path='/products' render={() => <Products />} />
					<Route path='/products:id' render={() => <Products />} />
				</Switch>
			</Router>
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
		fetchUsers: () => dispatch(fetchUsers()),
		fetchProducts: () => dispatch(fetchProducts())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
