const express = require('express');
const router = express.Router();
const winston = require('winston');
const logger = winston.createLogger();
const qs = require('qs');
const axios = require('axios');


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

const util = require('../../modules/util');
const statusCode = require('../../modules/statusCode');
const responseMessage = require('../../modules/responseMessage');

const kakaoAppInfo = {
  clientID: "ad045c61fe2f6609612eab4daaf5d54c",
  clientSecret: "Ldg6jTcHIJazwMDJmVzlLkZqlD5LGNiy",
  redirectUri: "http://localhost:6060/user/signup/kakao"
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

  userAuthKakao: async (req, res) => {
    try {
      const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoAppInfo.clientID}&redirect_uri=${kakaoAppInfo.redirectUri}&response_type=code&scope=profile,account_email`;
      console.log(kakaoAuthUrl)
      res.redirect(kakaoAuthUrl);
    } catch (error) {
      console.log(error)
    }
  },

  userSignupKakao: async (req, res) => {
    let token;
    try {
      // token = await fetch('https://kauth.kakao.com/oauth/token', {
      //   method: 'POST',
      //   headers: { 'content-type': 'application/x-www-form-urlencoded' },
      //   body: qs.stringify({
      //     grant_type: 'authorization_code',//특정 스트링
      //     client_id: kakaoAppInfo.clientID,
      //     client_secret: kakaoAppInfo.clientSecret,
      //     redirectUri: kakaoAppInfo.redirectUri,
      //     code: req.query.code,
      //   })
      // });
      token = await axios({
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
      })
      console.log(token);

    } catch (error) {
      console.log(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.NO_USER_ID));
    }
    let user;
    try {
      user = await axios({
        method: 'GET',
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: {
          Authorization: `Bearer ${token.data.access_token}`
        }
      })
      console.log(user);
      console.log(user.data.kakao_account.profile)
      req.session.kakao = user.data  // 세션 넣는 구문 밑에랑 동일함
      /*req.session = {
          ['kakao'] : user.data,
      }*/

      res.redirect('/');  // callback 갔다가 세션에 담고 다시 인덱스 페이지로 오게함
    } catch (error) {
      console.log(error)
    }
  }
};