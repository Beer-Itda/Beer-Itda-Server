var express = require('express');
var router = express.Router();
const userController = require('../controller/userController');

/* GET users listing. */
router.get('/suagongzu', userController.getCheckUser);

//router.get('/', userController.getAllUser);
router.get('/:id', userController.getOneUser);

module.exports = router;