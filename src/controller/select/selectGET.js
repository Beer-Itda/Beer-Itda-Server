var express = require('express');

const {
  Select,
  Aroma,
  Style,
  User
} = require('../../../models');

const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');

module.exports = {
  /* 기존에 선택한 Aroma 불러오기*/
  getSelectedAroma: async (req, res) => {
    try {
      const select = await Select.findAll({
        attributes: [
          'id', 'style', 'aroma', 'user_id'
        ],
        where: {
          user_id: 13,
        },
      });
      console.log('------------', req.token_data.id);
      const result = {};
      result.select_list = select;

      return res.status(statusCode.OK).send(util.success(responseMessage.BEER_OK, result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
    }
  },

  /* 기존에 선택한 Style 불러오기*/
  getSelectedStyle: async (req, res) => {
    res.send('기존에 선택한 Style 불러오기');
  },

}