var express = require('express');

const {
  User,
  Level
} = require('../../models');

const util = require('../../modules/util');
const statusCode = require('../../modules/statusCode');
const responseMessage = require('../../modules/responseMessage');

module.exports = {
  // userController 연결확인
  getCheckUser: async (req, res) => {
    res.send('으랏챠 user page 연결');
  },
  //user의 정보 가져오기
  getUserInformation: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: ['id', 'email', 'nickname']
      });
      console.log(users);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.NO_USER_ID, users));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.NO_USER_ID));
    }
  },
};