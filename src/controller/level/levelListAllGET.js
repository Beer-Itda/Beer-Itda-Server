const express = require('express');
const Level = require('../../../models/level');
const router = express.Router();
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');
const util = require('../../../modules/util');

//레벨 관련 리스트 불러오기
module.exports = {

  getLevelListAll: async (req, res) => {
    try {
      const levels = await Level.findAll({});
      console.log(levels);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, levels));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR));
    }
  }
};