const express = require('express');
const selectGET = require('../../controller/select/selectGET');
const selectStylePOST = require('../../controller/select/selectStylePOST');
const selectAromaPOST = require('../../controller/select/selectAromaPOST');
const router = express.Router();

const jwtModule = require('../../../modules/jwt');

//선택한 스타일, 향 정보 불러오기
router.get('/', jwtModule.checkAuth, selectGET.getSelect);

//맥주 스타일 선택하기
router.post('/style', jwtModule.checkAuth, selectStylePOST.postStyle);

//맥주 향 선택하기
router.post('/aroma', jwtModule.checkAuth, selectAromaPOST.postAroma);

module.exports = router;