const express = require('express');
const heartAllGET = require('../../controller/heart/heartAllGET');
const HeartPOST = require('../../controller/heart/HeartPOST');
const router = express.Router();

const jwtModule = require('../../../modules/jwt');

/* GET users listing. */
router.get('/', jwtModule.checkAuth, heartAllGET.getAllHeart);
router.post('/', jwtModule.checkAuth, HeartPOST.postHeart);

module.exports = router;