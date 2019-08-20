const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/registerAControllers');

//router.get('/',AdminController.admin_get_all);

router.get('/',AdminController.renderIndex);

router.post('/',AdminController.admin_post_all);

router.delete('/:adminId',AdminController.admin_delete_all);

module.exports = router;