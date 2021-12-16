const express = require('express');
const {
  Aroma
} = require('../../../models');
const router = express.Router();
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');
const util = require('../../../modules/util');

module.exports = {
  /* 스타일 관련 리스트 전체 불러오기 */
  getAllAromaList: async (req, res) => {
    try {
      const aromaList = await Aroma.findAll({});

      const result = {};
      result.aromaList = aromaList;
      return res.status(statusCode.OK).send(util.success(responseMessage.AROMA_INFO_OK, result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.AROMA_INFO_FAIL));
    }
  }
};