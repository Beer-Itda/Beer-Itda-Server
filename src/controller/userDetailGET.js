var express = require('express');

const {
  User,
  Level
} = require('../../models');

const util = require('../../modules/util');
const statusCode = require('../../modules/statusCode');
const responseMessage = require('../../modules/responseMessage');

module.exports = {
  //파라미터 id값의 user의 정보 가져오기
  getOneUser: async (req, res) => {
    const id = req.params.id;
    try {
      const users = await User.findOne({
        attributes: [
          'id', 'email', 'nickname', 'review_count', 'level_id'
        ],
        where: {
          id: id,
        },
      });

      //유저 정보 모두 불러왔는데 result로 묶어서 보내는 형태가 아니라서 users만 내보내겠습니다.
      //행여나 불필요한 정보는 제외하고 내보낼 수 있으니 우선은 주석처리 합니다.
      //const result = {};
      //result.email = users.email;
      // result.nickname = users.nickname;
      // result.review_count = users.review_count;
      // const level_id = users.level_id;

      if (!users.value < 0) {
        console.log('존재하지 않는 아이디 입니다.');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER_ID));
      }
      return res.status(statusCode.OK).send(util.success(responseMessage.USER_OK, users));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.NO_USER_ID));
    }
  },
};