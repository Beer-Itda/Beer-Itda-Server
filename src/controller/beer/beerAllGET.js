var express = require('express');

const {
  Beer,
} = require('../../../models');

const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');

//const beerService = require("../service/beerService");

module.exports = {
  /* 전체 beer 불러오기 */
  getAllBeer: async (req, res) => {
    const cursor = req.body;

    try {
      const beers = await Beer.findAll({
        attributes: [
          'id', 'k_name', 'e_name', 'star_avg', 'thumbnail_image'
        ],
        limit: 10,
      });

      const result = {};
      result.beers = beers;
      result.cursor = cursor;
      return res.status(statusCode.OK).send(util.success(responseMessage.BEER_OK, result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
    }
  },
};