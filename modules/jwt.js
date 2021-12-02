const jwt = require("jsonwebtoken");
const tokenConfig = require('../config/token');

const {
  User
} = require("../models");

module.exports = {
  //토큰 인증하여 payload 출력
  checkAuth: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const tokenData = jwt.verify(token, tokenConfig.jwt.accessSecret);
      req.tokenData = tokenData
      next();
    } catch (error) {
      return res.json({
        message: "Auth Error"
      })
    }
  }
};