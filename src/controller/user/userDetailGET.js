const express = require('express');

const {
  User,
  Level
} = require('../../../models');

const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');
const levelService = require("../../service/levelService");

module.exports = {
  //파라미터 id 값의 user 의 정보 가져오기
  getOneUser: async (req, res) => {
    //req.token_data 미들웨어에서 처리한 token verify 정보가 넘어온다.
    try {
      const user = await User.findOne({
        attributes: [
          'id', 'email', 'nickname', 'review_count', 'level_id'
        ],
        where: {
          id: req.token_data.id,
        },
        raw: true
      });

      if (!user.value < 0) {
        console.log('존재하지 않는 아이디 입니다.');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER_ID));
      }
      //유저 관련 리뷰와 레벨 데이터 출력
      const user_review_level_data = await levelService.calc_user_review_and_level(user.id);
      //데이터 바인딩
      const user_data = {
        'id': user.id,
        'email': user.email,
        'nickname': user.nickname,
        'review_level': user_review_level_data
      };
      return res.status(statusCode.OK).send(util.success(responseMessage.USER_OK, user_data));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.NO_USER_ID));
    }
  },
};