module.exports = (app) => {
    let fairytaleController = require('../controllers/fairytale.controller.js');

    app.post('/fairytale/generate', async (req, res) => {
        try {
            // Extract form data from request body
            const formData = req.body;

            // Pass the form data to the controller function
            const data = await fairytaleController.generateFairytale(formData);
            res.send(data);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
};
