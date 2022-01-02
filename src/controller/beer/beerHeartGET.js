var express = require('express');

const {
  Beer,
} = require('../../../models');

const heartService = require('../../service/heartService');

const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//paigination을 위한 데코레이터
const withPagination = require('../../../node_modules/sequelize-cursor-pagination/src/index');
const options = {
  methodName: 'paginate',
  primaryKeyField: 'id',
};
withPagination(options)(Beer);

module.exports = {
  // 찜한 맥주 전체 불러오기
  getAllHeartBeer: async (req, res) => {
    const user_id = req.token_data.id;
    const cursor = req.params.cursor;

    if (!cursor) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_CURSOR));
    };

    try {
      const heart_beer_ids = await heartService.ChangeHeartArray({
        user_id,
      });

      console.log(heart_beer_ids);

      const beers = await Beer.paginate({
        attributes: ['id', 'k_name', 'e_name', 'star_avg', 'thumbnail_image', 'aroma_id_1', 'aroma_id_2', 'aroma_id_3', 'aroma_id_4'],
        where: {
          [Op.and]: [{
            id: {
              [Op.gt]: cursor
            },
          }, {
            id: heart_beer_ids
          }]

        },
        order: [
          ['id', 'ASC']
        ],
        limit: 10,
        after: cursor
      });

      const heart_status = true; //하트의 상태는 무조건 true로 설정 (찜한 맥주 목록이니까..ㅎㅎ)

      function mergeObj(obj1, obj2) {
        const newObj = [];
        for (let i in obj1) {
          newObj[i] = obj1[i];
          newObj[i].dataValues.heart = obj2;
        }
        return newObj;
      }

      const beers_merge = mergeObj(beers.data, heart_status);

      //console.log('beers---------------------------', beers[1]);
      //console.log('beers.beers---------------------------', beers.beers[1]);
      //console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~');
      //console.log('beers.beers.dataValues---------------------------', beers.beers.dataValues);

      const result = {};
      result.page_info = beers.pageInfo;
      result.beers = beers_merge;

      return res.status(statusCode.OK).send(util.success(responseMessage.BEER_HEART_OK, result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
    }
  },

  getAllHeartBeer2: async (req, res) => {
    const user_id = req.token_data.id;
    const cursor = req.body.cursor;

    if (!cursor) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_CURSOR));
    };

    try {
      const heart_beer_ids = await heartService.ChangeHeartArray({
        user_id,
      });

      console.log(heart_beer_ids);

      const beers = await Beer.findAll({
        attributes: ['id', 'k_name', 'e_name', 'star_avg', 'thumbnail_image', 'aroma_id_1', 'aroma_id_2', 'aroma_id_3', 'aroma_id_4'],
        where: {
          id: heart_beer_ids
        },
        order: [
          ['id', 'ASC']
        ],
        limit: 10
      });

      const heart_status = true; //하트의 상태는 무조건 true로 설정 (찜한 맥주 목록이니까..ㅎㅎ)

      function mergeObj(obj1, obj2) {
        const newObj = [];
        for (let i in obj1) {
          newObj[i] = obj1[i];
          newObj[i].dataValues.heart = obj2;
        }
        return newObj;
      }

      const merge_heart = mergeObj(beers, heart_status);
      const next_cursor = 2;

      const result = {};
      result.heart_beers = merge_heart;
      result.next_cursor = next_cursor;

      return res.status(statusCode.OK).send(util.success(responseMessage.BEER_HEART_OK, result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
    }
  },
};