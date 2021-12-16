const express = require('express');
const router = express.Router();
const userSocialLoginPOST = require('../../controller/user/userSocialLoginPOST');
const userDetailGET = require('../../controller/user/userDetailGET');
const userNicknameChangePATCH = require('../../controller/user/userNicknameChangePATCH');
const renewalTokenPOST = require('../../controller/user/renewalTokenPOST');
const jwtModule = require('../../../modules/jwt');

//토큰 확인하여 유저 정보 출력
router.get('/info', jwtModule.checkAuth, userDetailGET.getOneUser);

//카카오 권한 인가 받기
router.get('/auth/kakao', userSocialLoginPOST.userAuthKakao);

//소셜 로그인
router.post('/login/:social', userSocialLoginPOST.userLoginSocial);

//애플 로그인

//refresh token 으로 access token 생성해주기
router.post('/token', renewalTokenPOST.renewalWithRefresh);

//로그아웃

//회원 탈퇴

//닉네임 설정
router.patch('/nickname', jwtModule.checkAuth, userNicknameChangePATCH.userNicknameChange);


module.exports = router;