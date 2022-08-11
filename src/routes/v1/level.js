const express = require('express');
const router = express.Router();
const jwt_module = require('../../../modules/jwt');

const levelListAllGET = require('../../controller/level/levelListAllGET');

//등급 가이드 정보 불러오기
router.get('/', jwt_module.checkAuth, levelListAllGET.getLevelListAll);

module.exports = router;
