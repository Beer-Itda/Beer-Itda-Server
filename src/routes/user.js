const express = require('express');
const user = require('../../models/user');
const router = express.Router();
const userController = require('../controller/userController');

/* GET users listing. */
router.get('/check', userController.getCheckUser);

//router.get('/', userController.getAllUser);

//유저 상세 정보
router.get('/:id', userController.getOneUser);

//카카오 권한 인가 받기
router.get('/auth/kakao', userController.userAuthKakao);

//카카오계정으로 로그인
router.get('/signup/kakao', userController.userSignupKakao);

module.exports = router;