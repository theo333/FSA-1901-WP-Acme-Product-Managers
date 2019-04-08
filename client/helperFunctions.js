const findManagers = (users, products) => {
	return users.reduce((acc, user) => {
		products.forEach(product => {
			if (user.id === product.managerId && !acc.includes(user)) {
				acc.push(user);
			}
		});
		return acc;
	}, []);
};

export default findManagers;
