import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

// action types
const GET_USERS = 'GET_USERS';
const GET_PRODUCTS = 'GET_PRODUCTS';

// action creators
const getUsers = users => {
	return {
		type: GET_USERS,
		users
	};
};

const getProducts = products => {
	return {
		type: GET_PRODUCTS,
		products
	};
};

const fetchUsers = () => {
	return dispatch => {
		return axios
			.get('/api/users')
			.then(resp => resp.data)
			.then(users => {
				// console.log('users: ' + JSON.stringify(users, null, 3));
				const action = getUsers(users);
				dispatch(action);
			});
	};
};

const fetchProducts = () => {
	return dispatch => {
		axios
			.get('/api/products')
			.then(resp => resp.data)
			.then(products => {
				const action = getProducts(products);
				dispatch(action);
			});
	};
};

const saveProductManager = (productId, updatedProduct) => {
	return dispatch => {
		axios
			.put(`/api/products/${productId}`, updatedProduct)
			.then(() => dispatch(fetchProducts()));
	};
};

const initialState = {
	users: [],
	products: []
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USERS:
			return {
				...state,
				users: action.users
			};
		case GET_PRODUCTS:
			return {
				...state,
				products: action.products
			};
		default:
			return state;
	}
};

const store = createStore(reducer, applyMiddleware(thunk));

export { store, fetchUsers, fetchProducts, saveProductManager };
