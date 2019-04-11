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

const syncAndSeed = () => {
	return conn
		.sync({ force: true })
		.then(() => {
			return Promise.all([
				User.create({ name: 'moe' }),
				User.create({ name: 'larry' }),
				User.create({ name: 'curly' })
			]);
		})
		.then(users => {
			const toBeProducts = [
				{ name: 'bar', managerId: 1 },
				{ name: 'bazz', managerId: 2 },
				{ name: 'foo', managerId: 3 }
			];

			return Promise.all(
				users.map((user, i) => {
					return Product.create({ ...toBeProducts[i], managerId: user.id });
				})
			);
		})
		.catch(e => {
			throw e;
		});
};

module.exports = {
	User,
	Product,
	syncAndSeed
};
