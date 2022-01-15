var express = require('express');

const {
  Beer,
} = require('../../../models');

const selectService = require('../../service/selectService');
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
  // 좋아하는 향 beer 전체 불러오기 [전체보기 기준, id값 정렬할 것]
  getAllAromaBeer: async (req, res) => {
    const user_id = req.token_data.id;
    const cursor = req.params.cursor;

    if (!cursor) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_CURSOR));
    };

    try {
      //향 배열로 불러오기
      const value = 'aroma';
      const aromaArray = await selectService.ChangeSelectArray({ user_id, value });
      if (!aromaArray) {
        return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, responseMessage.SELECT_INFO_FAIL));
      };

      const beers = await Beer.paginate({
        attributes: ['id', 'k_name', 'e_name', 'star_avg', 'thumbnail_image', 'aroma_id_1', 'aroma_id_2', 'aroma_id_3', 'aroma_id_4'],
        where: {
          id: {
            [Op.gt]: cursor
          },
          [Op.or]: [{
            aroma_id_1: {
              [Op.or]: aromaArray
            },
          }],
          [Op.or]: [{
            aroma_id_2: {
              [Op.or]: aromaArray
            }
          }],
          //여기서 왜 aroma_id_n을 동일하게 추가할수록 더 적은 맥주가 나오는지 모르겠다...아니 사실 알겠는데 어케해야할지 머르겟음
        },
        order: [
          ['id', 'ASC']
        ],
        limit: 10,
        after: cursor,
      });

      var beers_ids = [];   //[ 2, 11, 43, 111, 141 ]
      for (var i = 0 in beers.data) {
        beers_ids[i] = beers.data[i].id;
      }

      var heart_list = [];    //[ true, true, false, false, false ]
      for (var i = 0 in beers_ids) {
        const beer_id = beers_ids[i];
        const alreadyHeart = await heartService.HeartCheck({ user_id, beer_id });
        if (alreadyHeart == 'Y') { heart_list.push(true); }
        if (alreadyHeart == 'N') { heart_list.push(false); }
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
      const merge_aroma = mergeObj(beers.data, heart_list);

      const result = {};
      result.page_info = beers.pageInfo;
      result.beers = merge_aroma;

      return res.status(statusCode.OK).send(util.success(responseMessage.BEER_AROMA_OK, result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
    }
  },
};