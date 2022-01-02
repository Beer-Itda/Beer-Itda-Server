const express = require('express');
const {
  Beer
} = require('../../../models');
const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  /* 이런 맥주는 어떠세요? */
  getRandomBeer: async (req, res) => {

    try {
      const beers = await Beer.findAll({
        attributes: [
          'id', 'k_name', 'e_name', 'star_avg', 'thumbnail_image'
        ],
        order: [Sequelize.literal('RAND()')],
        limit: 10,
      });

      const result = {};
      result.beers = beers;

      return res.status(statusCode.OK).send(util.success(responseMessage.BEER_RANDOM_OK, result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
    }
  },
};