const express = require('express');
const {
  Beer
} = require('../../../models');
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
  getTestBeer: async (req, res) => {
    const cursor = req.body.cursor;

    try {
      const result = await Beer.paginate({
        attributes: [
          'id', 'k_name', 'e_name'
        ],
        where: {
          k_name: {
            [Op.gt]: cursor
          }
        },
        limit: 10,
        after: cursor,
      });

      return res.status(statusCode.OK).send(util.success('페이지네이션 성공', result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
    }
  },

  getTestBeer1: async (req, res) => {
    const cursor = req.body.cursor;

    try {
      const beers = await Beer.findAll({
        attributes: [
          'id', 'k_name', 'e_name'
        ],
        where: {
          id: {
            [Op.gt]: cursor
          }
        },
        limit: 10,
      });

      const last_beer_id = await Beer.findAll({
        attributes: ['id'],
        where: {
          id: {
            [Op.gt]: cursor
          }
        },
        order: [
          [
            'id', 'DESC'
          ]
        ],
        limit: 11,
        after: beers.pageInfo.endCursor,
      });
      const next_cursor = last_beer_id.dataValues;

      const result = {};
      result.cursor = cursor;
      result.next_cursor = next_cursor;
      result.beers = beers;


      return res.status(statusCode.OK).send(util.success('페이지네이션 성공', result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
    }
  },


};