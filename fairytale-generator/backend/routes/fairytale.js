const router = require('express').Router();
let fairytaleController = require('../controllers/fairytale.controller');


router.route('/').get((req, res) => {

});

router.route('/generate').post(fairytaleController.generate);

module.exports = router;