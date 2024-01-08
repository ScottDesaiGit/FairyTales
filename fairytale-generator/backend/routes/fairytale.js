// const router = require('express').Router();
module.exports = (app) => {
	let fairytaleController = require('../controllers/fairytale.controller.js');



	app.post('/fairytale/generate', async (req, res) => {
		try {
			// Simulate an asynchronous operation, like fetching data from a database
			const data = await fairytaleController.generateFairytale();
			res.send(data);
		} catch (error) {
			// Handle errors that might occur during the asynchronous operation
			res.status(500).send(error.message);
		}
	});
}