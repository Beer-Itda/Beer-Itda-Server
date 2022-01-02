const express = require('express');
const heartAllGET = require('../../controller/heart/heartAllGET');
const heartPOST = require('../../controller/heart/heartPOST');
const router = express.Router();

const jwtModule = require('../../../modules/jwt');

/* GET users listing. */
router.get('/', jwtModule.checkAuth, heartAllGET.getAllHeart);
router.post('/', jwtModule.checkAuth, heartPOST.postHeart);

module.exports = router;