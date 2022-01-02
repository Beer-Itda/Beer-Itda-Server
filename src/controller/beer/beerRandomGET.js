const express = require('express');
const {
  Beer
} = require('../../../models');

const heartService = require('../../service/heartService');

const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  /* 이런 맥주는 어떠세요? */
  getRandomBeer: async (req, res) => {
    const user_id = req.token_data.id;

    try {
      const beers = await Beer.findAll({
        attributes: [
          'id', 'k_name', 'e_name', 'star_avg', 'thumbnail_image'
        ],
        order: [Sequelize.literal('RAND()')],
        limit: 10,
      });

      const beers_ids = beers.map(x => x.dataValues.id); //[ 2, 11, 43, 111, 141 ]

      var heart_list = []; //[ true, true, false, false, false ]
      for (var i = 0 in beers_ids) {
        const beer_id = beers_ids[i];
        const alreadyHeart = await heartService.HeartCheck({
          user_id,
          beer_id
        });
        if (alreadyHeart == 'Y') {
          heart_list.push(true);
        }
        if (alreadyHeart == 'N') {
          heart_list.push(false);
        }
      }

      function mergeObj(obj1, obj2) {
        const newObj = [];
        for (let i in obj1) {
          newObj[i] = obj1[i];
        }
        for (let i in obj2) {
          newObj[i].dataValues.heart = obj2[i];
        }
        return newObj;
      }
      const merge_style = mergeObj(beers, heart_list);

      const result = {};
      result.beers = merge_style;

      return res.status(statusCode.OK).send(util.success(responseMessage.BEER_RANDOM_OK, result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
    }
  },
};