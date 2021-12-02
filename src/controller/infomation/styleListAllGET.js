const express = require('express');
const {
  Style_Small,
  Style_Mid,
  Style_Big,
} = require('../../../models');
const router = express.Router();
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');
const util = require('../../../modules/util');

module.exports = {
  /* 스타일 관련 리스트 전체 불러오기 */
  getAllStyleList: async (req, res) => {
    try {
      const styleList = await Style_Small.findAll({});

      const result = {};
      result.styleList = styleList;
      return res.status(statusCode.OK).send(util.success(responseMessage.STYLE_INFO_OK, result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR));
    }
  }
};