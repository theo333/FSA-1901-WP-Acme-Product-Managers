const findManagers = (users, products) =>
	users.reduce((acc, user) =>
		acc.concat(products.filter(product =>
			user.id === product.managerId && !acc.includes(user)
		)),
	[]);

export default findManagers;
