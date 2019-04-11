const findManagers = (users, products) => {
	return products.reduce((acc, product) => {
		return acc.concat(
			users.filter(user => {
				return user.id === product.managerId && !acc.includes(user);
			})
		);
	}, []);
};

export default findManagers;
