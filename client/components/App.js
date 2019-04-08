import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from './Nav';
import { fetchUsers, fetchProducts } from '../store';
import Managers from './Managers';
import Products from './Products';
import Product from './Product';

class App extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.fetchUsers();
		this.props.fetchProducts();
	}

	render() {
		return (
			<Router>
				<h1>Acme Product Managers</h1>
				<Route render={({ location }) => <Nav location={location} />} />
				<Switch>
					<Route exact path='/' render={() => <Home />} />
					<Route path='/users' render={() => <Managers />} />
					<Route exact path='/products' render={() => <Products />} />
					<Route path='/products:id' render={() => <Products />} />
				</Switch>
			</Router>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchUsers: () => dispatch(fetchUsers()),
		fetchProducts: () => dispatch(fetchProducts())
	};
};

export default connect(
	null,
	mapDispatchToProps
)(App);
