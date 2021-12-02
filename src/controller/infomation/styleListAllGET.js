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
      const styleList = await Style_Big.findAll({
        include: [{
          model: Style_Mid,
          include: [{
            model: Style_Small,
          }],
        }],
      });

      return res.status(statusCode.OK).send(util.success(responseMessage.STYLE_INFO_OK, styleList));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR));
    }
  }
};