const express = require('express');
const heartPOST = require('../../controller/heart/heartPOST');
const heartAllGET = require('../../controller/heart/heartAllGET');
const router = express.Router();

const jwtModule = require('../../../modules/jwt');

/* GET users listing. */
router.post('/', jwtModule.checkAuth, heartPOST.postHeart);
router.get('/', jwtModule.checkAuth, heartAllGET.getAllHeart);

module.exports = router;