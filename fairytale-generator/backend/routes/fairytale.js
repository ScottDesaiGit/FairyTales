module.exports = (app) => {
    let fairytaleController = require('../controllers/fairytale.controller.js');

    app.post('/fairytale/generate', async (req, res) => {
        try {
            const formData = req.body;
            const socketId = formData.socketId; // Extract the socketId
            await fairytaleController.generateFairytale(formData, socketId); // Pass socketId to the controller
    
            res.status(200).send("Fairytale generated");
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
};
