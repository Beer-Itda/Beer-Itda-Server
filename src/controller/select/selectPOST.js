var express = require('express');

const {
  Select
} = require('../../../models');

const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');

module.exports = {
  /* 최초 스타일,향 선택하기 */
  postFirstSelect: async (req, res) => {
    const {
      user_id,
      style,
      aroma
    } = req.body;
    try {
      const select_user = await Select.create({
        id: user_id,
        style: style,
        aroma: aroma
      });
      const result = {};
      result.select_user = select_user;
      return res.status(statusCode.OK).send(util.success(responseMessage.SELECT_AROMA_OK, result));
    } catch (err) {
      console.log(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(responseMessage.INTERNAL_SERVER_ERROR));
    }
  },

  /* 연결확인 */
  getCheckSelect: async (req, res) => {
    res.send('으랏챠 user page 연결');
  },
}