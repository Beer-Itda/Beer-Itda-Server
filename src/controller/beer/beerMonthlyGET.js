var express = require('express');
var dbConObj = require('../../../config/db_info');
var dbconn = dbConObj.init();

const {
  Beer,
  Style_Small,
  Aroma,
  Country,
  Select
} = require('../../../models');

const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');

//const beerService = require("../service/beerService");

module.exports = {
  // 이달의 beer 불러오기(1개)
  getMonthlyBeer: async (req, res) => {
    const id = req.params.id;
    try {
      //임시 monthlyBeer
      const monthlyBeer_id = 10;

      //가져온 Beer id로부터 맥주정보 불러오기
      const beers = await Beer.findOne({
        attributes: ['k_name', 'e_name', 'star_avg', 'thumbnail_image'],
        where: {
          id: monthlyBeer_id
        }
      });
      const result = {};
      result.beers = beers;
      return res.status(statusCode.OK).send(util.success(responseMessage.MONTHLY_BEER_OK, result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
    }
  },
};