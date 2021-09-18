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
  getAllUser: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: ['id', 'email', 'nickname']
      });
      console.log(users);
      return res.status(statusCode.OK).send(util.success(responseMessage.USER_OK, users));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.NO_USER_ID));
    }
  },
  //파라미터 id값의 user의 정보 가져오기
  getOneUser: async (req, res) => {
    const {
      id
    } = req.params;
    try {
      const users = await User.findOne({
        where: {
          id: id,
        },
        attributes: ['id', 'email', 'nickname']
      });

      if (!user) {
        console.log('존재하지 않는 아이디 입니다.');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
      }
      return res.status(statusCode.OK).send(util.success(responseMessage.USER_OK, users));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.NO_USER_ID));
    }
  },
};