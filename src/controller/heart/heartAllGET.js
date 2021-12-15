const express = require('express');
const {
  Heart,
  Beer,
  User
} = require('../../../models');

const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');
const util = require('../../../modules/util');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  /* 스타일 관련 리스트 전체 불러오기 */
  getAllHeart: async (req, res) => {
    try {
      /* 찜한 맥주 모두 불러오기 */
      //1. Heart 테이블에서 token_data.id = user_id인 모든 beer_id찾기 (찜한 맥주)
      //2. 찜한 beer_id만 담긴 Array 만들기
      //3. Array의 값을 Op.or을 사용해 불러오기

      /* 찜한 맥주 모두 불러오기 */

      const heart = await Heart.findAll({
        attributes: ['beer_id'],
        where: {
          user_id: req.token_data.id,
        },
      });

      function GetheartList(element) {
        if (element.beer_id == true) {
          return true;
        }
      }

      const heart2 = heart.filter(GetheartList);
      console.dir(`---------------heart : ${heart2}`);


      const beers = await Beer.findAll({
        attributes: ['k_name', 'e_name', 'star_avg', 'thumbnail_image', 'brewery'],
        where: {
          id: {
            [Op.or]: [1, 2, 3]
          },
        }
      });

      const users = await User.findOne({
        attributes: [
          'id', 'nickname'
        ],
        where: {
          id: req.token_data.id,
        },
      });

      const result = {};
      result.user = users.nickname;

      result.beer = beers;
      result.HeartList1 = heart;
      return res.status(statusCode.OK).send(util.success(responseMessage.OK, result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FAIL));
    }
  }
};