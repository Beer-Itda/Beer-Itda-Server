var express = require('express');

const {
  Beer
} = require('../../../models');

const selectService = require('../../service/selectService');
const heartService = require('../../service/heartService');

const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//paigination을 위한 데코레이터
const withPagination = require('sequelize-cursor-pagination');
const options = {
  methodName: 'paginate',
  primaryKeyField: 'id',
};
withPagination(options)(Beer);

module.exports = {
  // 좋아하는 스타일 beer 전체 불러오기(페이징 안됨) [전체보기 기준, id값 정렬할 것]
  getAllStyleBeer: async (req, res) => {
    const user_id = req.token_data.id;
    const cursor = req.params.cursor;
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

      const beers = await Beer.paginate({
        attributes: ['id', 'k_name', 'e_name', 'star_avg', 'thumbnail_image', 'style_id'],
        where: {
          id: {
            [Op.gt]: cursor
          },
          style_id: {
            [Op.or]: styleArray
          }
        },
        order: [
          ['id', 'ASC']
        ],
        limit: 10,
        after: cursor,
      });

      var beers_ids = [];
      for (var i = 0 in beers.data) {
        beers_ids[i] = beers.data[i].id;
      }

      //console.log('-------------------------------\n', beers_ids); //[ 2, 11, 43, 111, 141 ]

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
      //console.log('-------------------------------\n', heart_list);

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
      const merge_style = mergeObj(beers.data, heart_list);

      const result = {};
      result.style = styleArray;
      result.page_info = beers.pageInfo;
      result.beers = merge_style;

      return res.status(statusCode.OK).send(util.success(responseMessage.BEER_STYLE_OK, result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
    }
  },
};