const express = require('express');
const {

  Level
} = require('../../../models');

const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');


module.exports = {
  /* 전체 레벨 리스트 불러오기 */
  getLevelListAll: async (req, res) => {
    try {
      const levels = await Level.findAll({
        attribute: ['id', 'level', 'level_count']
      });

      const result = {};
      result.levels = levels;
      return res.status(statusCode.OK).send(util.success(responseMessage.LEVEL_OK, result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.LEVEL_READ_ALL_FAIL));
    }
  }
};