var express = require('express');

const {
  Beer
} = require('../../../models');

const selectService = require('../../service/selectService');

const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  // 좋아하는 스타일 beer 전체 불러오기(페이징 안됨) [전체보기 기준, id값 정렬할 것]
  getAllStyleBeer: async (req, res) => {
    const user_id = req.token_data.id;
    const cursor = req.body.cursor;
    if (!cursor) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_CURSOR));
    };

    try {
      //스타일 배열로 불러오기
      const value = 'style';
      const styleArray = await selectService.ChangeSelectArray({
        user_id,
        value
      });
      if (!styleArray) {
        return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, responseMessage.SELECT_INFO_FAIL));
      };

      const beers = await Beer.findAll({
        attributes: ['id', 'k_name', 'e_name', 'star_avg', 'thumbnail_image', 'style_id'],
        where: {
          style_id: {
            [Op.or]: styleArray
          }
        }
      });

      const result = {};
      result.style = styleArray;
      result.style_beers = beers;

      return res.status(statusCode.OK).send(util.success(responseMessage.BEER_STYLE_OK, result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
    }
  },
};