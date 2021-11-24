const express = require('express');
const user = require('../../models/user');
const router = express.Router();
const userController = require('../controller/userController');
const userDetailGET = require('../controller/userDetailGET');

/* GET users listing. */
router.get('/check', userController.getCheckUser);

//router.get('/', userDetailGET.getAllUser);

//유저 상세 정보
router.get('/:id', userDetailGET.getOneUser);

//카카오 권한 인가 받기
router.get('/auth/kakao', userController.userAuthKakao);

//카카오계정으로 로그인
router.get('/login/:social', userController.userLoginSocial);

module.exports = router;