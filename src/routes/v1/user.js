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

//소셜 로그인
router.post('/login/:social', userSocialLogin.userLoginSocial);

//애플 로그인

//refresh token 으로 access token 생성해주기

//로그아웃

//회원 탈퇴

//닉네임 설정



module.exports = router;