const express = require('express');

const {
  Heart,
} = require('../../../models');

const heartService = require('../../service/heartService');

const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');
const util = require('../../../modules/util');
const Sequelize = require('sequelize');

module.exports = {
  /* 맥주 찜하기 */
  postHeart: async (req, res) => {
    const {
      beer_id,
    } = req.body;

    const user_id = req.token_data.id;

    try {
      //1. Select 테이블에 user_id가 있는지 확인
      const alreadyHeart = await heartService.HeartCheck({
        user_id,
        beer_id,
      });
      if (alreadyHeart == 'Y') {
        //이미 select한적이 있으므로 update
        await Heart.destroy({
          where: {
            user_id: user_id,
            beer_id: beer_id
          },
        });
        rm = '찜 취소하기 성공했습니다';
      }
      if (alreadyHeart == 'N') {
        await Heart.create({
          user_id: user_id,
          beer_id: beer_id
        });
        rm = '찜하기 성공했습니다';
      }

      return res.status(statusCode.OK).send(util.success(rm));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FAIL));
    }
  }
};