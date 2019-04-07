import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Nav from './Nav';

export default class App extends Component {
	render() {
		return (
			<Router>
				<h1>Acme Product Managers</h1>
				<Route render={({ location }) => <Nav location={location} />} />
			</Router>
		);
	}
}
