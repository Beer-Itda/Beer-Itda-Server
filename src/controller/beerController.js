var express = require('express');

const {
  Beer
} = require('../../models');

const util = require('../../modules/util');
const statusCode = require('../../modules/statusCode');
const responseMessage = require('../../modules/responseMessage');

module.exports = {
  // beerController 연결확인
  getCheckBeer: async (req, res) => {
    res.send('으랏챠 beer page 연결');
  },
  // beer 전체 가져오기
  getAllBeer: async (req, res) => {
    try {
      const beers = await Beer.findAll({
        attributes: ['id', 'k_name', 'e_name', 'abv', 'thumbnail_image']
      });
      return res.status(statusCode.OK).send(util.success(responseMessageno.BEER_OK, beers));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
    }
  },
};

/*
  const result = {};
  result.id = beers.id;
  result.k_name = beers.k_name;
  console.log(result);
*/