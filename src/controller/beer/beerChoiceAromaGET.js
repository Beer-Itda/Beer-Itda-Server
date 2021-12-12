var express = require('express');

const {
  Beer,
  Aroma,
  Select,
  User
} = require('../../../models');

const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  // 좋아하는 향 beer 전체 불러오기 [전체보기 기준, id값 정렬할 것]
  getAllAromaBeer: async (req, res) => {
    const cursor = req.body.cursor;
    if (!cursor) return res.status(statusCode.BAD_REQUEST).send(util.fail(responseMessage.NO_CURSOR));

    try {
      const beers = await Beer.findAll({
        attributes: ['id', 'k_name', 'e_name', 'star_avg', 'thumbnail_image', 'aroma_id_1', 'aroma_id_2'],
        where: {
          [Op.or]: [{
            aroma_id_1: {
              [Op.or]: [2, 3, 5, 6]
            },
            aroma_id_2: {
              [Op.or]: [2, 3, 5, 6]
            },
            /*
            aroma_id_3: {
              [Op.or]: [1, 2, 3, 4]
            },
            aroma_id_4: {
              [Op.or]: [1, 2, 3, 4]
            }
            */
          }]
        },
        order: [
          ['id', 'ASC']
        ]
      });

      const users = await User.findOne({
        attributes: [
          'id', 'nickname'
        ],
        where: {
          id: req.tokenData.id,
        },
      });

      const user = users.nickname;

      const result = {};
      result.Aromabeers = beers;


      return res.status(statusCode.OK).send(util.success(responseMessage.BEER_OK, {
        user,
        result
      }));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
    }
  },
};