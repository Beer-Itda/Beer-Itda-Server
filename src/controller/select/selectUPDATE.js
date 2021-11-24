var express = require('express');

const {
  Select
} = require('../../../models');

const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');

module.exports = {
  /* 스타일 수정 */
  modifySelectStyle: async (req, res) => {
    const {
      userId,
      style
    } = req.body;
    try {
      await Select.update({
        style: style,
      }, {
        where: {
          userId: userId
        },
      });
      return res.status(statusCode.OK).send(util.success(responseMessage.MODIFY_STYLE_OK));
    } catch (err) {
      console.log(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(responseMessage.INTERNAL_SERVER_ERROR));
    }
  },


  /* 향 수정 */
  modifySelectAroma: async (req, res) => {
    const {
      user_id,
      aroma
    } = req.body;
    try {
      await Select.update({
        aroma: aroma,
      }, {
        where: {
          id: user_id
        },
      });
      return res.status(statusCode.OK).send(util.success(responseMessage.MODIFY_AROMA_OK));
    } catch (err) {
      console.log(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(responseMessage.INTERNAL_SERVER_ERROR));
    }
  },
}