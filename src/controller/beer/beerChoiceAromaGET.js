var express = require('express');

const {
  Beer,
} = require('../../../models');

const selectService = require('../../service/selectService');

const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  // 좋아하는 향 beer 전체 불러오기 [전체보기 기준, id값 정렬할 것]
  getAllAromaBeer: async (req, res) => {
    const user_id = req.token_data.id;
    const cursor = req.body.cursor;

    if (!cursor) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_CURSOR));
    };

    try {
      //향 배열로 불러오기
      const value = 'aroma';
      const aromaArray = await selectService.ChangeSelectArray({
        user_id,
        value
      });
      if (!aromaArray) {
        return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, responseMessage.SELECT_INFO_FAIL));
      };

      const beers = await Beer.findAll({
        attributes: ['id', 'k_name', 'e_name', 'star_avg', 'thumbnail_image', 'aroma_id_1', 'aroma_id_2', 'aroma_id_3', 'aroma_id_4'],
        where: {
          [Op.or]: [{
            aroma_id_1: {
              [Op.or]: aromaArray
            },
          }],
          [Op.or]: [{
            aroma_id_2: {
              [Op.or]: aromaArray
            }
          }],
          //여기서 왜 aroma_id_n을 동일하게 추가할수록 더 적은 맥주가 나오는지 모르겠다...아니 사실 알겠는데 어케해야할지 머르겟음
        },
        order: [
          ['id', 'ASC']
        ],
        limit: 10
      });

      const next_cursor = 2;

      const result = {};
      result.next_cursor = next_cursor;
      result.aroma = aromaArray;
      result.aroma_beers = beers;

      return res.status(statusCode.OK).send(util.success(responseMessage.BEER_AROMA_OK, result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
    }
  },
};