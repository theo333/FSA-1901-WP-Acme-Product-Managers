import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchUsers, fetchProducts } from '../store';
import Nav from './Nav';
import Home from './Home';
import Products from './Products';
import Managers from './Managers';

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

		const openings = this.managerOpenings(products);
		return (
			<Router>
				<h1>Acme Product Managers</h1>
				<Route render={({ location }) => <Nav location={location} />} />
				<Switch>
					<Route exact path='/' render={() => <Home openings={openings} />} />
					<Route exact path='/products' component={Products} />
					<Route path='/products:id' component={Products} />
					<Route path='/users' component={Managers} />
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
