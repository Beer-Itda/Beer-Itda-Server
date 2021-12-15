const express = require('express');
const heartAllGET = require('../../controller/heart/heartAllGET');
const router = express.Router();

const jwtModule = require('../../../modules/jwt');

/* GET users listing. */
router.get('/', jwtModule.checkAuth, heartAllGET.getAllHeart);

module.exports = router;