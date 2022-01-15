const express = require('express');
const {
  Heart,
  Beer,
} = require('../../../models');

const heartService = require('../../service/heartService');

const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');
const util = require('../../../modules/util');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


module.exports = {
  /* 찜한 맥주 리스트 전체 불러오기 */
  getAllHeart: async (req, res) => {
    const user_id = req.token_data.id;

    try {
      const heart = await Heart.findAll({
        attributes: ['beer_id'],
        where: {
          user_id: user_id,
        },
      });

      const heartArray = await heartService.ChangeHeartArray({ user_id });

      const beers = await Beer.findAll({
        attributes: ['id','k_name', 'e_name', 'star_avg', 'thumbnail_image', 'brewery'],
        where: {
          id: { 
            [Op.or]: heartArray
          },
        },
      });

      const result = {};
      result.beers = beers;  

      return res.status(statusCode.OK).send(util.success(responseMessage.BEER_HEART_OK, result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FAIL));
    }
  }
};