const express = require('express');
const app = express();
const path = require('path');

const { syncAndSeed, User, Product } = require('./db');

const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/app.js', (req, res, next) =>
	res.sendFile(path.join(__dirname, '../dist', 'main.js'))
);

app.get('/', (req, res, next) =>
	res.sendFile(path.join(__dirname, '../client', 'index.html'))
);

// api routes
app.get('/api/users', (req, res, next) => {
	User.findAll({ order: [['id', 'ASC']] })
		.then(users => res.send(users))
		.catch(next);
});

app.get('/api/products', (req, res, next) => {
	Product.findAll({ order: [['id', 'ASC']] })
		.then(products => res.send(products))
		.catch(next);
});

app.put('/api/products/:id', (req, res, next) => {
	Product.findByPk(req.params.id)
		.then(product => product.update(req.body))
		.then(updatedProduct => res.status(200).send(updatedProduct))
		.catch(next);
});

syncAndSeed();

app.listen(port, () => console.log(`listening on port ${port}`));
