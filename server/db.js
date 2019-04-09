const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL, { logging: false });

const User = conn.define('user', {
	name: Sequelize.STRING
});

const Product = conn.define('product', {
	name: Sequelize.STRING
});

Product.belongsTo(User, { as: 'manager' });
User.hasMany(Product);

// const users = ['moe', 'larry', 'curly'];
// const products = ['foo', 'bar', 'bazz'];

const syncAndSeed = () => {
	return (
		conn
			.sync({ force: true })
			.then(() => {
				return Promise.all([
					User.create({ name: 'moe' }),
					User.create({ name: 'larry' }),
					User.create({ name: 'curly' }),
				])
					.then((users) => {
						const toBeProducts = [
							{ name: 'bar', managerId: 1 },
							{ name: 'bazz', managerId: 2 },
							{ name: 'foo', managerId: 3 }
						];

						return Promise.all(users.map((user, i) => {
							return Product.create({ ...toBeProducts[i], managerId: user.id });
						}))
							.catch(e => {
								throw e;
							});
					});
			})
			// .then(() => {
			// 	return Promise.all([
			// 		User.create({ name: 'moe' }),
			// 		User.create({ name: 'larry' }),
			// 		User.create({ name: 'curly' }),
			// 		Product.create({ name: 'foo', managerId: 1 }),
			// 		Product.create({ name: 'bar', managerId: 2 }),
			// 		Product.create({ name: 'bazz', managerId: 3 })
			// 	]);
			// })
			// .then(() => {
			// 	return Promise.all([
			// 		users.map(user => User.create({ name: user })),
			// 		products.map(product => Product.create({ name: product }))
			// 	]);
			// })
			// .then(p => {
			// 	console.log(p);
			// Promise.all([
			// 	_products[0].update({ managerId: 1 }),
			// 	_products[1].update({ managerId: 2 })
			// ]);
			// })
			// .then(user => console.log(user.get()))
			.catch(ex => console.log(ex))
	);
};

module.exports = {
	User,
	Product,
	syncAndSeed
};
