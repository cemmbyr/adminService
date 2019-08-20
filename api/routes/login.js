const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginControllers');

router.post('/',loginController.login_post_all);

router.get('/', loginController.renderIndex)

module.exports = router;