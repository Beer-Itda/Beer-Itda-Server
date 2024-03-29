const jwt = require("jsonwebtoken");
const token_config = require("../config/token");
const statusCode = require("../modules/statusCode");

const { User } = require("../models");

module.exports = {
  //토큰 인증하여 payload 출력
  checkAuth: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      req.token_data = jwt.verify(token, token_config.jwt.accessSecret);
      next();
    } catch (error) {
      console.log(error);
      return res.status(statusCode.UNAUTHORIZED).json({
        message: "Auth Error",
      });
    }
  },
  //유저 데이터 이용한 엑세스 토큰 생성
  create_access_token: async (user_data) => {
    //access_token 생성
    return await jwt.sign(
      {
        id: user_data.id,
      },
      token_config.jwt.accessSecret,
      {
        expiresIn: token_config.jwt.accessExpiredIn,
      }
    );
  },
  //유저 데이터 이용한 리프레시 토큰 생성
  create_refresh_token: async (user_data) => {
    //refresh_token 생성
    return await jwt.sign(
      {
        id: user_data.id,
      },
      token_config.jwt.refreshSecret,
      {
        expiresIn: token_config.jwt.refreshExpiredIn,
      }
    );
  },
};
