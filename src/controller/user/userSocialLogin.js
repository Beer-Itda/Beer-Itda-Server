const express = require('express');
const router = express.Router();
const winston = require('winston');
const logger = winston.createLogger();
const qs = require('qs');
const axios = require('axios');
const jwt = require('jsonwebtoken');

//계속되는 fetch import에 대한 문제로 인하여 검색하였더니 이런식으로 import 해야된다고 함
const fetch = (...args) => import('node-fetch').then(({
  default: fetch
}) => fetch(...args));

const {
  User,
  Level
} = require('../../../models');

const tokenConfig = require('../../../config/token');
const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');

const kakaoAppInfo = {
  clientID: "ad045c61fe2f6609612eab4daaf5d54c",
  clientSecret: "Ldg6jTcHIJazwMDJmVzlLkZqlD5LGNiy",
  redirectUri: "https://beeritda.com/api/v1/user/login/kakao"
};

module.exports = {
  //카카오 사용자 인증 받기
  userAuthKakao: async (req, res) => {
    try {
      const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoAppInfo.clientID}&redirect_uri=${kakaoAppInfo.redirectUri}&response_type=code&scope=profile,account_email`;

      res.redirect(kakaoAuthUrl);
    } catch (error) {
      console.log(error)
    }
  },

  //각 소셜에 맞추어 로그인 진행
  userLoginSocial: async (req, res) => {
    const social = req.params.social;
    const kakao_token = req.body.kakao_token;
    if (!social)
      res.json({
        code: "NEED_SOCIAL_TYPE",
        message: "nedd social type"
      });
    switch (social) {
      case 'kakao':
        const userData = await kakaoLogin(req, res, kakao_token);
        const beeritda_token = await createToken(userData);
        res.json({
          access_token: beeritda_token.accessToken,
          refresh_token: beeritda_token.refreshToken
        });
        break;

      case 'apple':
        break;
    }
  }
};

const kakaoLogin = async (req, res, kakao_token) => {
  let kakaoToken;
  let kakaoUser;
  // try {
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


  //   kakaoToken = await axios({
  //     method: 'POST',
  //     url: 'https://kauth.kakao.com/oauth/token',
  //     headers: {
  //       'content-type': 'application/x-www-form-urlencoded'
  //     }, // npm install qs
  //     data: qs.stringify({
  //       grant_type: 'authorization_code', // 특정 스트링 
  //       client_id: kakaoAppInfo.clientID,
  //       client_secret: kakaoAppInfo.clientSecret,
  //       redirectUri: kakaoAppInfo.redirectUri,
  //       code: req.query.code,
  //     }) // 객체를 String으로 변환.
  //   });
  // } catch (error) {
  //   console.log(error);
  //   return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.NO_USER_ID));
  // };

  try {
    kakaoUser = await axios({
      method: 'GET',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        Authorization: `Bearer ${kakao_token}`
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
  let accessToken = await jwt.sign({
    id: userData.id
  }, tokenConfig.jwt.accessSecret, {
    expiresIn: tokenConfig
      .jwt.accessExpiredIn
  });
  //refreshToken 생성
  let refreshToken = await jwt.sign({
    id: userData.id
  }, tokenConfig.jwt.refreshSecret, {
    expiresIn: tokenConfig.jwt.refreshExpiredIn
  });

  return {
    accessToken: accessToken,
    refreshToken: refreshToken
  }

};