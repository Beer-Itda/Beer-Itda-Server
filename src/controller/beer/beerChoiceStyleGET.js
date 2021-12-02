var express = require('express');

const {
  Beer,
  Style_Small,
  Country,
  Select
} = require('../../../models');

const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//const beerService = require("../service/beerService");

module.exports = {
  // 좋아하는 스타일 beer 전체 불러오기(페이징 안됨) [전체보기 기준, id값 정렬할 것]
  getAllStyleBeer: async (req, res) => {
    const user_id = req.body.user_id;
    const cursor = req.body.cursor;
    if (!user_id) return res.status(statusCode.BAD_REQUEST).send(util.fail(responseMessage.NO_USER_ID));
    if (!cursor) return res.status(statusCode.BAD_REQUEST).send(util.fail(responseMessage.NO_CURSOR));

    try {
      const userSelectStyle = await Select.findOne({
        attributes: ['style'],
        where: {
          id: user_id,
        }
      });

      const beers = await Beer.findAll({
        attributes: ['id', 'k_name', 'e_name', 'star_avg', 'thumbnail_image', 'style_id'],
        where: {
          style_id: {
            [Op.or]: [1, 2, 3]
          }
        }
      });

      const result = {};
      result.Stylebeers = beers;
      return res.status(statusCode.OK).send(util.success(responseMessage.BEER_OK, result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
    }
  },
};