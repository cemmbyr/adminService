const express = require('express');
const router = express.Router();
const UserControllers = require('../controllers/registerUControllers');

//router.get('/',UserControllers.user_get_all);

router.get('/',UserControllers.renderIndex);

router.post('/',UserControllers.user_post_all)

router.delete('/:userId',UserControllers.user_delete_all);

module.exports = router;