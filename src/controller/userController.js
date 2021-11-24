const express = require('express');
const router = express.Router();
const winston = require('winston');
const logger = winston.createLogger();
const qs = require('qs');
const axios = require('axios');
const jwt = require('jsonwebtoken');


//계속되는 fetch import에 대한 문제로 인하여 검색하였더니 이런식으로 import 해야된다고 함
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
// import fetch from 'node-fetch';
// const fetch = require('node-fetch');
const cookieParser = require('cookie-parser');
// const jwt = require('../modules/jwt');

const {
  User,
  Level
} = require('../../models');

const tokenConfig = require('../../config/token');
const util = require('../../modules/util');
const statusCode = require('../../modules/statusCode');
const responseMessage = require('../../modules/responseMessage');

const kakaoAppInfo = {
  clientID: "ad045c61fe2f6609612eab4daaf5d54c",
  clientSecret: "Ldg6jTcHIJazwMDJmVzlLkZqlD5LGNiy",
  redirectUri: "http://localhost:6060/user/login/kakao"
};

// router.get(`/:coperation`, async (req, res) => {
//   const coperation = req.params.coperation;
//   const code = req.param('code');
//   const options = getOption(coperation, code);
//   const token = await getAccessToken(options);
//   const userInfo = await getUserInfo(options.userInfoUrl, token.access_token);

//   const loginDto = new LoginDto(userInfo);
//   const jwtToken = await jwt.sign(loginDto);

//   res.cookie('token', jwtToken.token);
//   res.redirect('http://localhost:3000/');
// });

module.exports = {
  // userController 연결확인
  getCheckUser: async (req, res) => {
    res.send('으랏챠 user page 연결');
  },

  //파라미터 id값의 user의 정보 가져오기
  getOneUser: async (req, res) => {
    const id = req.params.id;
    try {
      const users = await User.findOne({
        where: { 'id': id },
        attributes: ['id', 'email', 'nickname', 'review_count', 'level_id'],
      });
      //유저 정보 모두 불러왔는데 result로 묶어서 보내는 형태가 아니라서 users만 내보내겠습니다.
      //행여나 불필요한 정보는 제외하고 내보낼 수 있으니 우선은 주석처리 합니다.
      // const result = {};
      // result.email = users.email;
      // result.nickname = users.nickname;
      // result.review_count = users.review_count;
      // const level_id = users.level_id;

      if (!users) {
        console.log('존재하지 않는 아이디 입니다.');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
      }
      return res.status(statusCode.OK).send(util.success(responseMessage.USER_OK, users));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.NO_USER_ID));
    }
  },

  //카카오 사용자 인증 받기
  userAuthKakao: async (req, res) => {
    try {
      const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoAppInfo.clientID}&redirect_uri=${kakaoAppInfo.redirectUri}&response_type=code&scope=profile,account_email`;
      console.log(kakaoAuthUrl)
      res.redirect(kakaoAuthUrl);
    } catch (error) {
      console.log(error)
    }
  },

  //각 소셜에 맞추어 로그인 진행
  userLoginSocial: async (req, res) => {
    const social = req.params.social;
    if (!social)
      res.json({
        code: "NEED_SOCIAL_TYPE",
        message: "nedd social type"
      });
    switch (social) {
      case 'kakao':
        const userData = await kakaoLogin(req, res);
        const kakaoToken = await createToken(userData);
        res.json({ kakaoToken });
        break;

      case 'apple':
        break;
    }
  }
};

const kakaoLogin = async (req, res) => {
  let kakaoToken;
  let kakaoUser;
  try {
    //   return await fetch(options.url, {
    //     method: 'POST',
    //     headers: {
    //         'content-type':'application/x-www-form-urlencoded;charset=utf-8'
    //     },
    //     body: qs.stringify({
    //         grant_type: 'authorization_code',//특정 스트링
    //         client_id: options.clientID,
    //         client_secret: options.clientSecret,
    //         redirectUri: options.redirectUri,
    //         code: options.code,
    //     }),
    // }).then(res => res.json());


    kakaoToken = await axios({
      method: 'POST',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }, // npm install qs
      data: qs.stringify({
        grant_type: 'authorization_code', // 특정 스트링 
        client_id: kakaoAppInfo.clientID,
        client_secret: kakaoAppInfo.clientSecret,
        redirectUri: kakaoAppInfo.redirectUri,
        code: req.query.code,
      }) // 객체를 String으로 변환.
    });
  } catch (error) {
    console.log(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.NO_USER_ID));
  };

  try {
    kakaoUser = await axios({
      method: 'GET',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        Authorization: `Bearer ${kakaoToken.data.access_token}`
      }
    });

    //카카오 계정의 문제가 있을 경우
    if (!kakaoUser)
      res.json({
        code: responseMessage.NO_SOCIAL_INFO,
        message: "kakao info not found"
      });

    const userKakaoEmail = kakaoUser.data.kakao_account.email;
    const userKakaoId = userKakaoEmail.indexOf('@');

    //카카오 계정으로 DB 조회
    const beeritdaUser = await User.findOne({
      where: {
        email: userKakaoEmail
      }
    });

    //sequelize query처리하고 난 dataValues를 풀어보았다.
    // {
    //   id: 11,
    //   email: 'hello_kjh@naver.com',
    //   nickname: 'hello_kjh',
    //   review_count: 0,
    //   active: 'Y',
    //   path: 'kakao',
    //   createdAt: 2021-11-13T07:24:56.000Z,
    //   updatedAt: 2021-11-13T07:24:56.000Z,
    //   LevelId: null
    // }

    //DB에 없다면 회원가입 - DB에 저장 후 정보를 return
    if (!beeritdaUser) {
      const newBeeritdaUser = await User.create({
        email: userKakaoEmail,
        //우선은 닉네임을 유저 이메일에서 추출하여 넣어준다.
        nickname: userKakaoEmail.substr(0, userKakaoId),
        review_count: 0,
        active: 'Y',
        path: req.params.social,
        level_id: 1
      });
      return newBeeritdaUser.dataValues
    }
    //DB에 있다면 로그인 진행 - 기존 정보를 return
    return beeritdaUser.dataValues
  } catch (error) {
    console.log(error)
  }
};

//유저 데이터 이용한 토큰 생성
const createToken = async (userData) => {
  //accessToekn 생성
  let accessToken = await jwt.sign({ id: userData.id }, tokenConfig.jwt.accessSecret, {
    expiresIn: tokenConfig
      .jwt.accessExpiredIn
  });
  //refreshToken 생성
  let refreshToken = await jwt.sign({ id: userData.id }, tokenConfig.jwt.refreshSecret, { expiresIn: tokenConfig.jwt.refreshExpiredIn });

  return {
    accessToken: accessToken,
    refreshToken: refreshToken
  }

};