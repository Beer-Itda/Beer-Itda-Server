const express = require('express');
const user = require('../../../models/user');
const router = express.Router();
const userSocialLogin = require('../../controller/user/userSocialLogin');
const userDetailGET = require('../../controller/user/userDetailGET');
const jwtModule = require('../../../modules/jwt');

//router.get('/', userDetailGET.getAllUser);

//토큰 확인하여 유저 정보 출력
router.get('/info', jwtModule.checkAuth, userDetailGET.getOneUser);

//카카오 권한 인가 받기
router.get('/auth/kakao', userSocialLogin.userAuthKakao);

//카카오계정으로 로그인
router.get('/login/:social', userSocialLogin.userLoginSocial);

module.exports = router;