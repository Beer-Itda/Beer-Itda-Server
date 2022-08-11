const express = require('express');
const heartPOST = require('../../controller/heart/heartPOST');
const router = express.Router();

const jwtModule = require('../../../modules/jwt');

//맥주 찜하기
router.post('/', jwtModule.checkAuth, heartPOST.postHeart);

module.exports = router;